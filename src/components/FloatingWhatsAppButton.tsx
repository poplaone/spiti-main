
import React, { useState, useEffect, useRef } from 'react';
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M13.613 3.89a10.088 10.088 0 00-4.252-.89C4.933 3 1.309 6.625 1.309 11.053c0 1.244.306 2.464.89 3.54L1 18l3.525-1.09c1.038.515 2.203.785 3.418.785h.003c5.43 0 9.853-4.423 9.853-9.852 0-2.646-1.03-5.127-2.898-6.994l-.288-.259z" fillRule="evenodd" clipRule="evenodd"/>
        </svg>
      </button>
    </div>
  );
};

export default FloatingWhatsAppButton;
