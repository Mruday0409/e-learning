import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Play, Pause, RotateCcw, RotateCw, Maximize, Settings, Volume2, VolumeX, Loader2, ChevronLeft, ArrowLeft
} from 'lucide-react';
import './VideoPlayer.css';

const VideoPlayer = ({ src, onClose, title, chapters = [], onBack }) => {
  console.log('🎬 VideoPlayer component rendering');
  console.log('🎬 Props received:', { src, title, hasOnClose: !!onClose, hasOnBack: !!onBack, chaptersCount: chapters.length });

  const videoSrc = src || "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";

  

  const videoRef = useRef(null);

  const playerRef = useRef(null);

  const hlsInstanceRef = useRef(null);

  

  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState(0);

  const [duration, setDuration] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);

  const [isMuted, setIsMuted] = useState(false);

  const [volume, setVolume] = useState(1);

  const [showControls, setShowControls] = useState(true);

  const [showQualityMenu, setShowQualityMenu] = useState(false);

  const [quality, setQuality] = useState('Auto');

  const [levels, setLevels] = useState([]);

  const [isBuffering, setIsBuffering] = useState(true);

  const [hasActuallyStartedPlaying, setHasActuallyStartedPlaying] = useState(false);

  const hasStartedPlayingRef = useRef(false);

  const isMountedRef = useRef(true);

  const controlTimeout = useRef(null);

  // Process quality levels: remove duplicates, sort
  const getProcessedLevels = () => {
    if (!levels || levels.length === 0) return [];
    
    // Create a map to remove duplicates by height
    const uniqueLevels = new Map();
    levels.forEach((level, index) => {
      const height = level.height || 0;
      // Show all valid heights (greater than 0)
      if (height > 0) {
        // If we already have this height, keep the one with higher bitrate
        if (!uniqueLevels.has(height)) {
          uniqueLevels.set(height, { ...level, originalIndex: index });
        } else {
          const existing = uniqueLevels.get(height);
          const existingBitrate = existing.bitrate || 0;
          const currentBitrate = level.bitrate || 0;
          if (currentBitrate > existingBitrate) {
            uniqueLevels.set(height, { ...level, originalIndex: index });
          }
        }
      }
    });
    
    // Convert to array and sort by height (highest first)
    const result = Array.from(uniqueLevels.values())
      .sort((a, b) => (b.height || 0) - (a.height || 0));
    
    return result;
  };

  // Format quality label
  const formatQualityLabel = (height) => {
    if (height >= 2160) return '4K';
    if (height >= 1440) return '1440p';
    if (height >= 1080) return '1080p HD';
    if (height >= 720) return '720p HD';
    if (height >= 480) return '480p SD';
    return `${height}p`;
  };

  // --- INITIALIZATION ---

  useEffect(() => {
    console.log('🔄 VideoPlayer useEffect running - videoSrc:', videoSrc);
    
    // Mark component as mounted
    isMountedRef.current = true;
    
    // Prevent body scroll when video player is open
    document.body.style.overflow = 'hidden';

    // Reset ALL state when component mounts or source changes
    setHasActuallyStartedPlaying(false);
    hasStartedPlayingRef.current = false;
    setIsPlaying(false);
    setIsBuffering(true);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setLevels([]);
    setQuality('Auto');
    setShowControls(true);
    setShowQualityMenu(false);

    let hls;

    const initPlayer = () => {
      console.log('🎥 Initializing video player with source:', videoSrc);

      if (videoRef.current) {
        // Clean up any existing HLS instance first
        if (hlsInstanceRef.current) {
          console.log('🧹 Cleaning up existing HLS instance');
          try {
            hlsInstanceRef.current.destroy();
            hlsInstanceRef.current.detachMedia();
          } catch (e) {
            console.warn('Error cleaning up existing HLS:', e);
          }
          hlsInstanceRef.current = null;
        }

        // Reset video element
        const video = videoRef.current;
        video.pause();
        video.currentTime = 0;
        video.src = '';
        video.load();

        if (window.Hls && window.Hls.isSupported()) {
          console.log('✅ HLS.js is supported, creating new HLS instance');
          hls = new window.Hls();

          hls.loadSource(videoSrc);

          hls.attachMedia(videoRef.current);

          hls.on(window.Hls.Events.MANIFEST_PARSED, (event, data) => {
            // Only update if component is still mounted
            if (!isMountedRef.current) {
              console.log('⚠️ Component unmounted, ignoring manifest parsed');
              return;
            }
            console.log('✅ HLS manifest parsed, levels:', data.levels?.length || 0);
            const parsedLevels = data.levels || [];
            setLevels(parsedLevels);
            setIsBuffering(false);
          });

          hls.on(window.Hls.Events.ERROR, (event, data) => {
            console.error('❌ HLS Error:', data);
            if (data.fatal) {
              console.error('❌ Fatal HLS error, attempting recovery');
            }
          });

          hlsInstanceRef.current = hls;

        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          console.log('✅ Native HLS support detected (Safari)');
          videoRef.current.src = videoSrc;
          videoRef.current.load();
          setIsBuffering(false);
        } else {
          console.error('❌ HLS not supported and native HLS not available');
        }

      }

    };

    if (!window.Hls) {

      const script = document.createElement('script');

      script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';

      script.async = true;

      script.onload = initPlayer;

      document.body.appendChild(script);

    } else {

      initPlayer();

    }

    return () => { 
      // Mark component as unmounted
      isMountedRef.current = false;
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Cleanup HLS instance
      if (hls) {
        try {
          hls.destroy();
          hls.detachMedia();
        } catch (e) {
          console.warn('Error destroying HLS in cleanup:', e);
        }
      }
      // Also cleanup from ref
      if (hlsInstanceRef.current) {
        try {
          hlsInstanceRef.current.destroy();
          hlsInstanceRef.current.detachMedia();
        } catch (e) {
          console.warn('Error destroying HLS ref in cleanup:', e);
        }
        hlsInstanceRef.current = null;
      }
      // Stop video completely if it hasn't started playing
      if (videoRef.current && !hasStartedPlayingRef.current) {
        try {
          videoRef.current.pause();
          videoRef.current.src = '';
          videoRef.current.srcObject = null;
          videoRef.current.load();
          videoRef.current.currentTime = 0;
        } catch (e) {
          console.warn('Error stopping video in cleanup:', e);
        }
      }
    };

  }, [videoSrc]);

  // --- TIMEOUT LOGIC ---

  const resetControlTimeout = () => {

    if (controlTimeout.current) clearTimeout(controlTimeout.current);

    if (isPlaying) {

      controlTimeout.current = setTimeout(() => {

        setShowControls(false);

        setShowQualityMenu(false);

      }, 3000);

    }

  };

  // --- INTERACTION HANDLERS ---

  const handleScreenClick = (e) => {

    // If clicking a button or input, let that event handle itself

    if (e.target.closest('button') || e.target.closest('input')) return;

    

    // Toggle Logic

    setShowControls(prev => {

      const newState = !prev;

      if (newState) {

        // Showing controls -> start hide timer

        resetControlTimeout();

      } else {

        // Hiding controls -> clear timer

        if (controlTimeout.current) clearTimeout(controlTimeout.current);

        setShowQualityMenu(false);

      }

      return newState;

    });

  };

  const handleInteraction = () => {

    if (!showControls) setShowControls(true);

    resetControlTimeout();

  };

  // --- MEDIA ACTIONS ---

  const togglePlay = () => {

    if (videoRef.current.paused) {

      videoRef.current.play().then(() => setIsPlaying(true)).catch(console.log);

      resetControlTimeout();

    } else {

      videoRef.current.pause();

      setIsPlaying(false);

      // Keep controls visible when paused

      setShowControls(true); 

      if (controlTimeout.current) clearTimeout(controlTimeout.current);

    }

  };

  const handleTimeUpdate = () => {

    setCurrentTime(videoRef.current.currentTime);

    setDuration(videoRef.current.duration);

    if (videoRef.current.duration) {

      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);

    }

  };

  const handleSeek = (e) => {

    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const pos = x / rect.width;

    videoRef.current.currentTime = pos * duration;

    handleInteraction();

  };

  const skip = (val) => {

    videoRef.current.currentTime += val;

    handleInteraction();

  };

  const changeQuality = (originalIndex) => {

    if (hlsInstanceRef.current) {

      if (originalIndex === -1) {

        hlsInstanceRef.current.currentLevel = -1;

        setQuality('Auto');

      } else {

        hlsInstanceRef.current.currentLevel = originalIndex;

        const level = levels[originalIndex];

        setQuality(formatQualityLabel(level.height));

      }

      setShowQualityMenu(false);

    }

  };

  const toggleFullscreen = () => {

    if (!document.fullscreenElement) {

      playerRef.current.requestFullscreen().catch(console.log);

    } else {

      document.exitFullscreen();

    }

  };

  const formatTime = (time) => {

    if (!isFinite(time)) return '0:00';

    const m = Math.floor(time / 60);

    const s = Math.floor(time % 60);

    return `${m}:${s < 10 ? '0' : ''}${s}`;

  };

  // Handle close - stop video completely if it hasn't actually started playing
  const handleClose = () => {
    console.log('🔴 handleClose called in VideoPlayer');
    // Mark as unmounted immediately to prevent any callbacks
    isMountedRef.current = false;
    
    // ALWAYS destroy HLS instance first to stop loading/streaming
    if (hlsInstanceRef.current) {
      try {
        // Stop all HLS operations
        hlsInstanceRef.current.stopLoad();
        hlsInstanceRef.current.destroy();
        hlsInstanceRef.current.detachMedia();
      } catch (e) {
        console.warn('Error destroying HLS:', e);
      }
      hlsInstanceRef.current = null;
    }
    
    // Stop video element completely
    if (videoRef.current) {
      try {
        // Pause immediately
        videoRef.current.pause();
        // Remove all sources
        const video = videoRef.current;
        video.src = '';
        video.srcObject = null;
        video.removeAttribute('src');
        // Stop loading
        video.load();
        // Reset all properties
        video.currentTime = 0;
        video.muted = true;
        video.volume = 0;
      } catch (e) {
        console.warn('Error stopping video:', e);
      }
    }
    
    // Reset state
    setHasActuallyStartedPlaying(false);
    hasStartedPlayingRef.current = false;
    setIsPlaying(false);
    setIsBuffering(false);
    
    // Call the onClose callback to unmount the component
    if (onClose) {
      onClose();
    }
  };

  // Generate chapters list if not provided
  const defaultChapters = chapters.length > 0 ? chapters : [
    { id: 1, title: 'Introduction', time: '0:00' },
    { id: 2, title: 'Chapter 1: Basics', time: '5:30' },
    { id: 3, title: 'Chapter 2: Advanced', time: '12:45' },
    { id: 4, title: 'Chapter 3: Practice', time: '20:10' },
    { id: 5, title: 'Summary', time: '28:00' },
  ];

  // Debug: Log when component renders
  useEffect(() => {
    console.log('✅ VideoPlayer component MOUNTED');
    console.log('✅ VideoPlayer state:', {
      isPlaying,
      isBuffering,
      showControls,
      hasActuallyStartedPlaying: hasStartedPlayingRef.current
    });
    return () => {
      console.log('❌ VideoPlayer component UNMOUNTING');
    };
  }, []);
  
  // Debug: Log when key states change
  useEffect(() => {
    console.log('🔄 VideoPlayer state updated:', {
      isPlaying,
      isBuffering,
      showControls,
      quality,
      levelsCount: levels.length
    });
  }, [isPlaying, isBuffering, showControls, quality, levels.length]);

  return (

    <div className="video-player-overlay">

      <div 
        className="video-player-wrapper"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Back Button */}
        {(onBack || onClose) && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              console.log('🔙 Back button clicked');
              if (onBack) {
                console.log('🔙 Calling onBack prop');
                onBack();
              } else {
                console.log('🔙 Calling handleClose (no onBack prop)');
                handleClose();
              }
            }} 
            className="video-back-btn"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        )}

        <div className="video-player-layout">
          
          {/* Left Side - Video Player */}
          <div className="video-player-main">
            <div 

              ref={playerRef}

              className="video-player-container"

              onClick={(e) => {
                e.stopPropagation();
                handleScreenClick(e);
              }}

              onMouseMove={handleInteraction}

            >

              <video 

                ref={videoRef}

                className="video-element"

                onTimeUpdate={handleTimeUpdate}

                onEnded={() => setIsPlaying(false)}

                onWaiting={() => setIsBuffering(true)}

                onPlaying={() => {
                  // Only update if component is still mounted
                  if (!isMountedRef.current) return;
                  setIsBuffering(false);
                  setHasActuallyStartedPlaying(true);
                  hasStartedPlayingRef.current = true;
                }}

              />

              {isBuffering && (

                <div className="video-loader">

                  <Loader2 size={40} color="#fff" className="spin" />

                </div>

              )}

              <div className={`video-controls-overlay ${showControls ? '' : 'hidden'}`}>

                

                {/* Top Bar */}

                <div className="video-top-bar">

                  <h3 className="video-title">{title || 'Tears of Steel'}</h3>

                  {onClose && (

                    <button onClick={handleClose} className="video-icon-btn">

                      <X size={20} />

                    </button>

                  )}

                </div>

          {/* CENTER CONTROLS - Appears when controls are visible */}

          {showControls && (

            <div className="video-center-play">

              <button onClick={togglePlay} className="video-play-button-large">

                {isPlaying ? (

                  <Pause size={40} fill="white" stroke="white" />

                ) : (

                  <Play size={40} fill="white" stroke="white" style={{ marginLeft: '4px' }} />

                )}

              </button>

            </div>

          )}

          {/* Bottom Controls */}

          <div className="video-bottom-bar" onClick={(e) => e.stopPropagation()}>

            

            <div className="video-progress-container" onClick={handleSeek}>

              <div className="video-progress-fill" style={{ width: `${progress}%` }}>

                <div className="video-progress-thumb"></div>

              </div>

            </div>

            <div className="video-controls-row">

              <div className="video-controls-left">

                <button onClick={togglePlay} className="video-control-btn">

                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}

                </button>

                

                <div className="video-volume-control">

                  <button onClick={() => {

                    const newMuted = !isMuted;

                    setIsMuted(newMuted);

                    videoRef.current.muted = newMuted;

                  }} className="video-control-btn">

                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}

                  </button>

                  <div className="video-volume-slider-wrapper">

                    <input 

                      type="range" min="0" max="1" step="0.1" value={volume}

                      className="video-volume-slider"

                      onChange={(e) => {

                        const val = parseFloat(e.target.value);

                        setVolume(val);

                        videoRef.current.volume = val;

                        setIsMuted(val === 0);

                      }}

                    />

                  </div>

                </div>

                <span className="video-time-display">{formatTime(currentTime)} / {formatTime(duration)}</span>

              </div>

              <div className="video-controls-right">

                <div className="video-quality-container">

                  <button 

                    onClick={(e) => { e.stopPropagation(); setShowQualityMenu(!showQualityMenu); }}

                    className="video-quality-btn"

                  >

                    <Settings size={14} style={{ marginRight: 6 }} />

                    {quality}

                  </button>

                  {showQualityMenu && (

                    <div className="video-quality-menu">

                      <button 

                        onClick={() => changeQuality(-1)} 

                        className={`video-quality-option ${quality === 'Auto' ? 'active' : ''}`}

                      >

                        Auto

                      </button>

                      {getProcessedLevels().length > 0 ? (
                        getProcessedLevels().map((level) => {
                          const qualityLabel = formatQualityLabel(level.height);
                          const isActive = quality === qualityLabel || 
                            (quality.includes('Auto') === false && 
                             levels[level.originalIndex] && 
                             quality.includes(String(level.height)));

                          return (
                            <button 
                              key={`${level.height}-${level.originalIndex}`} 
                              onClick={() => changeQuality(level.originalIndex)} 
                              className={`video-quality-option ${isActive ? 'active' : ''}`}
                            >
                              {qualityLabel}
                            </button>
                          );
                        })
                      ) : (
                        // Fallback: show all levels if processing returns empty
                        levels.map((level, idx) => {
                          const qualityLabel = formatQualityLabel(level.height);
                          const isActive = quality === qualityLabel || 
                            (quality.includes('Auto') === false && 
                             quality.includes(String(level.height)));

                          return (
                            <button 
                              key={`${level.height}-${idx}`} 
                              onClick={() => changeQuality(idx)} 
                              className={`video-quality-option ${isActive ? 'active' : ''}`}
                            >
                              {qualityLabel}
                            </button>
                          );
                        })
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

      {/* Right Side - Chapters List */}
      <div className="video-chapters-sidebar">
        <div className="video-chapters-header">
          <h4>Chapters</h4>
        </div>
        <div className="video-chapters-list">
          {defaultChapters.map((chapter) => (
            <button
              key={chapter.id}
              className="video-chapter-item"
              onClick={() => {
                // Parse time and seek to that position
                const timeParts = chapter.time.split(':');
                const minutes = parseInt(timeParts[0]) || 0;
                const seconds = parseInt(timeParts[1]) || 0;
                const timeInSeconds = minutes * 60 + seconds;
                if (videoRef.current) {
                  videoRef.current.currentTime = timeInSeconds;
                  handleInteraction();
                }
              }}
            >
              <div className="video-chapter-number">{chapter.id}</div>
              <div className="video-chapter-content">
                <div className="video-chapter-title">{chapter.title}</div>
                <div className="video-chapter-time">{chapter.time}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

        </div>

      </div>

    </div>

  );

};

export default VideoPlayer;
