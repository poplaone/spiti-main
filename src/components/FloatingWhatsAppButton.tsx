import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Position {
  x: number;
  y: number;
}

const FloatingWhatsAppButton = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Position>({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const dragStartPosition = useRef<Position>({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  // Initialize position above footer
  useEffect(() => {
    if (buttonRef.current) {
      const viewportWidth = window.innerWidth;
      const initialX = viewportWidth - buttonRef.current.offsetWidth - 20;
      const initialY = window.innerHeight - 120; // Position above the footer
      
      setPosition({ x: initialX, y: initialY });
      setInitialPosition({ x: initialX, y: initialY });
    }
  }, []);

  // Handle mouse/touch down event
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    
    // Get client coordinates for either mouse or touch event
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    dragStartPosition.current = { 
      x: clientX - position.x, 
      y: clientY - position.y 
    };
  };

  // Handle mouse/touch move event
  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    
    // Get client coordinates for either mouse or touch event
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Calculate new position
    const newX = clientX - dragStartPosition.current.x;
    const newY = clientY - dragStartPosition.current.y;
    
    // Set boundaries to keep button within viewport
    const buttonWidth = buttonRef.current?.offsetWidth || 60;
    const buttonHeight = buttonRef.current?.offsetHeight || 60;
    
    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  // Handle mouse/touch up event
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Add and remove event listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDragMove(e);
    const handleTouchMove = (e: TouchEvent) => handleDragMove(e);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchEnd = () => handleDragEnd();

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi, I'm interested in your Spiti Valley tours. Can you provide more information?");
    window.open(`https://wa.me/918626888979?text=${message}`, '_blank');
  };

  return (
    <div 
      ref={buttonRef}
      className={`fixed z-50 ${isMobile ? '' : 'lg:block'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center w-14 h-14"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    </div>
  );
};

export default FloatingWhatsAppButton;
