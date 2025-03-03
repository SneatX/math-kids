import React from 'react';
//import Image from 'next/image';

interface MascotProps {
  emotion: 'happy' | 'sad' | 'excited' | 'thinking';
  size: 'small' | 'medium' | 'large';
  className?: string;
}

function Mascot({ emotion, size, className = '' }: MascotProps) {

  const dimensions = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  const getEmotionImage = () => {
    switch (emotion) {
      case 'happy':
        return 'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80';
      case 'sad':
        return 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80';
      case 'excited':
        return 'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80';
      case 'thinking':
        return 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80';
      default:
        return 'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80';
    }
  };

  return (
    <div className={`${dimensions[size]} ${className} relative`}>
      <img 
        src={getEmotionImage()} 
        alt={`Mascot feeling ${emotion}`}
        className="rounded-full object-cover w-full h-full border-4 border-indigo-300"
      />
      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 border-2 border-indigo-300">
        {emotion === 'happy' && <span className="text-xl">😊</span>}
        {emotion === 'sad' && <span className="text-xl">😢</span>}
        {emotion === 'excited' && <span className="text-xl">🤩</span>}
        {emotion === 'thinking' && <span className="text-xl">🤔</span>}
      </div>
    </div>
  );
};

export default Mascot;