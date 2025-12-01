import React, { useState } from 'react';
import { X, ChevronRight, ArrowLeft } from 'lucide-react';
import './PopupCard.css';

const PopupCard = ({
  onClose,
  onBack,
  title,
  icon,
  iconColor = '#7C3AED',
  badge,
  children,
  showCTA = false,
  ctaText = 'Continue',
  onCTAClick,
  showConfirm = false,
  confirmText = 'Great choice! 🎉',
  isLoading = false,
  loadingText = 'Loading...',
  customContent,
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [uniqueId] = useState(() => `popup-${Math.random().toString(36).substr(2, 9)}`);

  // Check if this is Subject Selection for compact styling
  const isCompact = title === 'Subject Selection';
  
  return (
    <div className="popup-card-overlay" onClick={onClose} data-popup-id={uniqueId}>
      <div className="popup-card-container" onClick={(e) => e.stopPropagation()} data-compact={isCompact}>
        
        {/* Background decorative elements - always present */}
        <div className="popup-card-bg-wrapper">
          <div className="popup-card-bg">
            <div className="popup-card-shape popup-card-shape-1"></div>
            <div className="popup-card-shape popup-card-shape-2"></div>
            <div className="popup-card-shape popup-card-shape-3"></div>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="popup-card-wrapper">
          
          {/* Shadow Layer */}
          <div className="popup-card-shadow"></div>
          
          {/* Actual Card */}
          <div className="popup-card">
            
            {/* Close Button */}
            <button 
              className="popup-card-close-btn"
              onClick={onClose}
              type="button"
            >
              ×
            </button>

            {/* Back Button */}
            {onBack && (
              <button 
                className="popup-card-back-btn"
                onClick={onBack}
                type="button"
              >
                <ArrowLeft size={20} strokeWidth={3} />
              </button>
            )}

            {/* Header Section */}
            <div className="popup-card-header">
              
              {/* Badge Sticker - Right Side */}
              {badge && (
                <div className="popup-card-badge">
                  <span>{badge}</span>
                </div>
              )}
              
              {/* Icon Box */}
              {icon && (
                <div className="popup-card-icon-wrapper">
                  <div className="popup-card-icon-shadow"></div>
                  <div 
                    className="popup-card-icon-box"
                    style={{ backgroundColor: iconColor }}
                  >
                    {typeof icon === 'string' ? icon : icon}
                  </div>
                </div>
              )}
              {title && (
                <>
                  <h2 className="popup-card-title">{title}</h2>
                  <div className="popup-card-title-line"></div>
                </>
              )}
            </div>

            {/* Content Area */}
            <div className="popup-card-content">
              {customContent || children}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="popup-card-loading">
                <p className="popup-card-loading-text">{loadingText}</p>
                <div className="popup-card-spinner"></div>
              </div>
            )}

            {/* Confirm Section */}
            {showConfirm && !isLoading && (
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">{confirmText}</p>
              </div>
            )}

            {/* CTA Button */}
            {showCTA && !isLoading && (
              <button 
                className="popup-card-cta-wrapper"
                onClick={onCTAClick}
                type="button"
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">{ctaText}</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Radio Option Component
export const RadioOption = ({ 
  value, 
  checked, 
  onChange, 
  label, 
  emoji, 
  icon,
  hovered,
  onMouseEnter,
  onMouseLeave 
}) => {
  return (
    <label
      className="popup-card-radio-option"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        type="radio"
        className="popup-card-radio-input"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <div className={`popup-card-radio-shadow ${hovered ? 'hovered' : ''}`}></div>
      <div className={`popup-card-radio-content ${hovered ? 'hovered' : ''} ${checked ? 'selected' : ''}`}>
        <div className="popup-card-radio-left">
          {icon && <span className="popup-card-radio-icon">{icon}</span>}
          <span className="popup-card-radio-label">{label}</span>
        </div>
        {emoji && <span className="popup-card-radio-emoji">{emoji}</span>}
      </div>
    </label>
  );
};

// Item Option Component (for clickable items like in Video Lessons)
export const ItemOption = ({ 
  label, 
  icon, 
  iconBgClass,
  hovered,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  return (
    <button
      className="popup-card-item-btn"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      type="button"
    >
      <div className={`popup-card-item-shadow ${hovered ? 'hovered' : ''}`}></div>
      <div className={`popup-card-item-content ${hovered ? 'hovered' : ''}`}>
        <div className="popup-card-item-left">
          <div className={`popup-card-item-icon-box ${iconBgClass || ''}`}>
            {typeof icon === 'string' ? icon : icon}
          </div>
          <span className="popup-card-item-label">{label}</span>
        </div>
        <ChevronRight 
          size={24} 
          strokeWidth={3} 
          className={`popup-card-item-chevron ${hovered ? 'hovered' : ''}`} 
        />
      </div>
    </button>
  );
};

export default PopupCard;
