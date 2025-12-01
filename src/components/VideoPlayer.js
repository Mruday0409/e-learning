import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Play, Pause, RotateCcw, RotateCw, Maximize, Settings, Volume2, VolumeX 
} from 'lucide-react';
import './VideoPlayer.css';

const VideoPlayer = ({ src, onClose, title }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const hlsInstanceRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [quality, setQuality] = useState('Auto');
  const [hlsInstance, setHlsInstance] = useState(null);
  const [levels, setLevels] = useState([]);

  // Global error handler to suppress play() interruption errors
  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      if (event.reason && (
        (event.reason.message && event.reason.message.includes('play() request was interrupted')) ||
        event.reason.name === 'AbortError' ||
        event.reason.name === 'NotAllowedError'
      )) {
        // Suppress this specific error - it's harmless
        event.preventDefault();
        return;
      }
    };
    
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const video = videoRef.current;
    const hls = hlsInstanceRef.current;
    
    return () => {
      // Cleanup HLS instance
      if (hls) {
        try {
          hls.destroy();
        } catch (e) {
          console.warn('Error destroying HLS on unmount:', e);
        }
        hlsInstanceRef.current = null;
      }
      // Cleanup video
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, []);

  // HLS Integration
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let hls = null;
    let script = null;
    
    // Check if HLS.js is already loaded
    if (window.Hls && window.Hls.isSupported()) {
      hls = new window.Hls({
        enableWorker: true,
        lowLatencyMode: false,
      });
      
      hls.loadSource(src);
      hls.attachMedia(video);
      
      hls.on(window.Hls.Events.MANIFEST_PARSED, (event, data) => {
        setLevels(data.levels || []);
        if (videoRef.current) {
          setDuration(videoRef.current.duration);
        }
      });
      
      hls.on(window.Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('HLS error:', data);
        }
      });
      
      setHlsInstance(hls);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = src;
      video.load();
    } else {
      // Load HLS.js script
      script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
      script.async = true;
      
      script.onload = () => {
        if (window.Hls && window.Hls.isSupported() && videoRef.current) {
          const newHls = new window.Hls({
            enableWorker: true,
            lowLatencyMode: false,
          });
          
          newHls.loadSource(src);
          newHls.attachMedia(videoRef.current);
          
          newHls.on(window.Hls.Events.MANIFEST_PARSED, (event, data) => {
            setLevels(data.levels || []);
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
            }
          });
          
          newHls.on(window.Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              console.error('HLS error:', data);
            }
          });
          
          setHlsInstance(newHls);
          hlsInstanceRef.current = newHls;
        } else if (videoRef.current && videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          videoRef.current.src = src;
          videoRef.current.load();
        }
      };
      
      script.onerror = () => {
        console.error('Failed to load HLS.js');
        if (videoRef.current) {
          videoRef.current.src = src;
          videoRef.current.load();
        }
      };
      
      document.body.appendChild(script);
    }
    
    // Store hls instance in ref
    if (hls) {
      hlsInstanceRef.current = hls;
    }
    
    return () => {
      // Copy refs to variables for cleanup
      const videoElement = video;
      const hlsInstance = hlsInstanceRef.current;
      
      // Cleanup HLS instance from ref (most reliable)
      if (hlsInstance) {
        try {
          hlsInstance.destroy();
        } catch (e) {
          console.warn('Error destroying HLS instance from ref:', e);
        }
        hlsInstanceRef.current = null;
      }
      // Also cleanup local hls if it exists
      if (hls) {
        try {
          hls.destroy();
        } catch (e) {
          console.warn('Error destroying local HLS instance:', e);
        }
      }
      // Cleanup video element
      if (videoElement) {
        videoElement.pause();
        videoElement.removeAttribute('src');
        videoElement.load();
        // Reset video properties
        videoElement.currentTime = 0;
      }
      // Remove script if it was added
      if (script && document.body.contains(script)) {
        try {
          document.body.removeChild(script);
        } catch (e) {
          console.warn('Error removing script:', e);
        }
      }
      // Reset state
      setHlsInstance(null);
      setLevels([]);
      setProgress(0);
      setDuration(0);
      setCurrentTime(0);
      setIsPlaying(false);
      setQuality('Auto');
    };
  }, [src]);

  // Time Update Handler
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setCurrentTime(current);
      setDuration(dur);
      setProgress((current / dur) * 100);
    }
  };

  // Controls Logic - Fixed to prevent play() interruption error
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      // Use play() promise but handle errors gracefully
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully
            setIsPlaying(true);
          })
          .catch(error => {
            // Handle play() interruption or other errors
            if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
              console.log('Play error:', error);
            }
            setIsPlaying(false);
          });
      } else {
        setIsPlaying(true);
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (playerRef.current.requestFullscreen) {
          await playerRef.current.requestFullscreen();
        } else if (playerRef.current.webkitRequestFullscreen) {
          await playerRef.current.webkitRequestFullscreen();
        } else if (playerRef.current.msRequestFullscreen) {
          await playerRef.current.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen request failed:", err);
    }
  };

  const handleQualityChange = (index) => {
    const hls = hlsInstanceRef.current || hlsInstance;
    if (hls) {
      hls.currentLevel = index;
      setQuality(index === -1 ? 'Auto' : `${levels[index].height}p`);
      setShowQualityMenu(false);
    }
  };

  const formatTime = (time) => {
    if (!isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="video-player-overlay" onClick={onClose}>
      <div 
        ref={playerRef}
        className="video-player-container"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <video 
          ref={videoRef}
          className="video-element"
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Controls Overlay */}
        <div className={`video-controls-overlay ${showControls || !isPlaying ? '' : 'hidden'}`}>
          
          {/* Top Bar */}
          <div className="video-top-bar">
            <h3 className="video-title">{title || 'Video Lesson'}</h3>
            <button onClick={onClose} className="video-close-btn">
              <X size={20} />
            </button>
          </div>

          {/* Center Play Button (only when paused) */}
          {!isPlaying && (
            <div className="video-center-play">
              <button onClick={togglePlay} className="video-play-button-large">
                <Play size={40} fill="white" style={{ marginLeft: '4px' }} />
              </button>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="video-bottom-bar">
            
            {/* Progress Bar */}
            <div 
              className="video-progress-bar"
              onClick={(e) => {
                if (videoRef.current) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  videoRef.current.currentTime = pos * videoRef.current.duration;
                }
              }}
            >
              <div className="video-progress-fill" style={{ width: `${progress}%` }}>
                <div className="video-progress-thumb"></div>
              </div>
            </div>

            <div className="video-controls-row">
              
              {/* Left Controls */}
              <div className="video-controls-left">
                <button onClick={togglePlay} className="video-control-btn">
                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                </button>
                
                <div className="video-skip-buttons">
                  <button onClick={() => skip(-10)} className="video-skip-btn">
                    <RotateCcw size={20} />
                  </button>
                  <button onClick={() => skip(10)} className="video-skip-btn">
                    <RotateCw size={20} />
                  </button>
                </div>
                <div className="video-volume-control">
                  <button onClick={toggleMute} className="video-control-btn">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <div className="video-volume-slider-wrapper">
                    <input 
                      type="range" min="0" max="1" step="0.1" 
                      className="video-volume-slider"
                      onChange={(e) => {
                        if (videoRef.current) {
                          videoRef.current.volume = e.target.value;
                        }
                      }}
                    />
                  </div>
                </div>
                <span className="video-time-display">
                  {formatTime(currentTime)} / {formatTime(duration || 0)}
                </span>
              </div>

              {/* Right Controls */}
              <div className="video-controls-right">
                
                {/* Quality Selector */}
                <div className="video-quality-container">
                  <button 
                    onClick={() => setShowQualityMenu(!showQualityMenu)}
                    className="video-quality-btn"
                  >
                    <Settings size={14} />
                    {quality}
                  </button>
                  
                  {showQualityMenu && (
                    <div className="video-quality-menu">
                       <button 
                         onClick={() => handleQualityChange(-1)}
                         className={`video-quality-option ${quality === 'Auto' ? 'active' : ''}`}
                       >
                         Auto
                       </button>
                       {levels.map((level, idx) => (
                         <button 
                           key={idx}
                           onClick={() => handleQualityChange(idx)}
                           className={`video-quality-option ${quality === `${level.height}p` ? 'active' : ''}`}
                         >
                           {level.height}p
                         </button>
                       ))}
                       {levels.length === 0 && (
                         <div className="video-quality-empty">No levels found</div>
                       )}
                    </div>
                  )}
                </div>
                <button onClick={toggleFullscreen} className="video-control-btn">
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
