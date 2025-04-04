
import { useState, useCallback } from 'react';

interface UseVisibleRangeProps {
  totalItems: number;
  initialVisible: { start: number; end: number };
}

export function useVisibleRange({ totalItems, initialVisible }: UseVisibleRangeProps) {
  const [visibleRange, setVisibleRange] = useState(initialVisible);
  
  // Update visible range based on scroll direction
  const updateVisibleRange = useCallback((direction: 'left' | 'right') => {
    if (direction === 'right') {
      const lastVisible = visibleRange.end;
      const newEnd = Math.min(totalItems - 1, lastVisible + 2);
      if (newEnd > lastVisible) {
        setVisibleRange(prev => ({...prev, end: newEnd}));
      }
    } else if (direction === 'left') {
      const firstVisible = visibleRange.start;
      const newStart = Math.max(0, firstVisible - 2);
      if (newStart < firstVisible) {
        setVisibleRange(prev => ({...prev, start: newStart}));
      }
    }
  }, [visibleRange, totalItems]);
  
  // Check if an image should be rendered based on visible range
  const isItemVisible = useCallback((index: number) => {
    // Always render the first image or images in the visible range
    return index === 0 || (index >= visibleRange.start && index <= visibleRange.end);
  }, [visibleRange]);

  return {
    visibleRange,
    updateVisibleRange,
    isItemVisible,
    setVisibleRange
  };
}
