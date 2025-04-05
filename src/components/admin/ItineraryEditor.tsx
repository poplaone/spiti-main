
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Bold, Italic, Underline, List } from "lucide-react";

interface ItineraryDay {
  id?: string;
  day_number: number;
  title: string;
  description: string;
}

interface ItineraryEditorProps {
  itineraryDays: ItineraryDay[];
  setItineraryDays: React.Dispatch<React.SetStateAction<ItineraryDay[]>>;
}

const ItineraryEditor: React.FC<ItineraryEditorProps> = ({ 
  itineraryDays, 
  setItineraryDays 
}) => {
  const addDay = () => {
    const nextDayNumber = itineraryDays.length > 0
      ? Math.max(...itineraryDays.map(day => day.day_number)) + 1
      : 1;
    
    setItineraryDays([
      ...itineraryDays, 
      { 
        day_number: nextDayNumber, 
        title: '', 
        description: '' 
      }
    ]);
  };

  const updateDay = (index: number, field: keyof ItineraryDay, value: string | number) => {
    const updatedDays = [...itineraryDays];
    updatedDays[index] = { 
      ...updatedDays[index], 
      [field]: field === 'day_number' ? parseInt(value.toString()) : value 
    };
    setItineraryDays(updatedDays);
  };

  const removeDay = (index: number) => {
    const updatedDays = [...itineraryDays];
    updatedDays.splice(index, 1);
    
    // Re-number days to ensure sequential numbering
    const renumberedDays = updatedDays.map((day, idx) => ({
      ...day,
      day_number: idx + 1
    }));
    
    setItineraryDays(renumberedDays);
  };

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

  // Sort days by day_number
  const sortedDays = [...itineraryDays].sort((a, b) => a.day_number - b.day_number);

  return (
    <div className="space-y-6">
      {sortedDays.map((day, index) => (
        <Card key={index} className="relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => removeDay(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">Day</label>
                <div className="flex items-center justify-center h-10 bg-spiti-forest text-white rounded-md">
                  {day.day_number}
                </div>
              </div>
              
              <div className="col-span-10">
                <label className="text-sm font-medium mb-1 block">Day Title</label>
                <Input
                  placeholder="Day title (e.g., Shimla to Kalpa - Mountain Journey)"
                  value={day.title}
                  onChange={(e) => updateDay(index, 'title', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <div className="mb-2 flex space-x-1">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  title="Bold"
                  onClick={() => applyFormatting(index, 'bold')}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  title="Italic"
                  onClick={() => applyFormatting(index, 'italic')}
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  title="Underline"
                  onClick={() => applyFormatting(index, 'underline')}
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  title="Add Bullet Point"
                  onClick={() => addBulletPoint(index)}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                id={`day-${index}-description`}
                placeholder="Describe the day's activities and experiences. Use formatting buttons for rich text. Add bullet points with the list button."
                value={day.description}
                onChange={(e) => updateDay(index, 'description', e.target.value)}
                rows={6}
                className="font-mono text-sm"
              />
              <div className="mt-2 text-xs text-gray-500">
                Tip: Select text and use formatting buttons, or start a line with "• " for bullet points.
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button
        type="button"
        variant="outline"
        onClick={addDay}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Day {itineraryDays.length + 1}
      </Button>
    </div>
  );
};

export default ItineraryEditor;

