import React, { useState } from 'react';
import { Video, Star, Layers, FileText, Crown } from 'lucide-react';
import PopupCard, { ItemOption } from './PopupCard';

const VideoLessonsPopup = ({ onClose, onItemSelect, onUnlockAccess }) => {
  const [hovered, setHovered] = useState(null);

  const items = [
    { id: 1, label: 'Key Points', icon: Star, bgClass: 'key-points' },
    { id: 2, label: 'Flashcards', icon: Layers, bgClass: 'flashcards' },
    { id: 3, label: 'Summaries', icon: FileText, bgClass: 'summaries' },
  ];

  const handleItemClick = (item) => {
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  const handleUnlockAccess = () => {
    if (onUnlockAccess) {
      onUnlockAccess();
    }
  };

  return (
    <PopupCard
      onClose={onClose}
      title="Video Lessons"
      icon={<Video size={36} color="white" strokeWidth={3} />}
      iconColor="#7C3AED"
      badge="Premium"
      showCTA={true}
      ctaText="Unlock Access"
      onCTAClick={handleUnlockAccess}
    >
      <div className="popup-card-items">
        {items.map((item) => (
          <ItemOption
            key={item.id}
            label={item.label}
            icon={<item.icon size={24} className="text-black" strokeWidth={2.5} />}
            iconBgClass={item.bgClass}
            hovered={hovered === item.id}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    </PopupCard>
  );
};

export default VideoLessonsPopup;
