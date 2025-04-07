
import { useEffect } from 'react';
import { ItineraryDay } from "../package-form/types";

type UpdateDayFunction = (index: number, field: keyof ItineraryDay, value: string | number) => void;

export const useTextFormatting = (updateDay: UpdateDayFunction, itineraryDays: ItineraryDay[]) => {
  // Handle text formatting
  const applyFormatting = (index: number, format: string) => {
    const textArea = document.getElementById(`day-${index}-description`) as HTMLTextAreaElement;
    if (!textArea) return;

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = textArea.value.substring(start, end);
    
    if (selectedText.length === 0) return;
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `<b>${selectedText}</b>`;
        break;
      case 'italic':
        formattedText = `<i>${selectedText}</i>`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'bullet':
        // Check if already in a list item
        if (selectedText.trim().startsWith('• ')) {
          formattedText = selectedText;
        } else {
          formattedText = `• ${selectedText}`;
        }
        break;
      default:
        formattedText = selectedText;
    }
    
    const newValue = textArea.value.substring(0, start) + formattedText + textArea.value.substring(end);
    updateDay(index, 'description', newValue);
    
    // Set cursor position after the operation
    setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  // Add a bullet point at the current cursor position or start of line
  const addBulletPoint = (index: number) => {
    const textArea = document.getElementById(`day-${index}-description`) as HTMLTextAreaElement;
    if (!textArea) return;
    
    const cursorPos = textArea.selectionStart;
    const text = textArea.value;
    
    // Find the start of the current line
    let lineStart = cursorPos;
    while (lineStart > 0 && text[lineStart - 1] !== '\n') {
      lineStart--;
    }
    
    // Check if line already has a bullet point
    if (text.substring(lineStart, lineStart + 2) === '• ') {
      return;
    }
    
    // Insert bullet point at the beginning of the line
    const newText = text.substring(0, lineStart) + '• ' + text.substring(lineStart);
    updateDay(index, 'description', newText);
    
    // Set cursor position after the bullet point
    setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(lineStart + 2, lineStart + 2);
    }, 0);
  };

  // Keyboard shortcuts for formatting
  useEffect(() => {
    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      if (!event.target || !(event.target as HTMLElement).id) return;
      
      const targetId = (event.target as HTMLElement).id;
      if (!targetId.includes('day-') || !targetId.includes('-description')) return;
      
      const index = parseInt(targetId.split('-')[1]);
      
      // Check if Ctrl or Command key is pressed
      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'b') {
          event.preventDefault();
          applyFormatting(index, 'bold');
        } else if (event.key === 'i') {
          event.preventDefault();
          applyFormatting(index, 'italic');
        } else if (event.key === 'u') {
          event.preventDefault();
          applyFormatting(index, 'underline');
        } else if (event.key === 'l') {
          event.preventDefault();
          addBulletPoint(index);
        }
      }
    };

    document.addEventListener('keydown', handleKeyboardShortcut);
    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcut);
    };
  }, [itineraryDays]);

  return { applyFormatting, addBulletPoint };
};

export default useTextFormatting;
