
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, List } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TextFormattingToolbarProps {
  index: number;
  applyFormatting: (index: number, format: string) => void;
  addBulletPoint: (index: number) => void;
}

const TextFormattingToolbar: React.FC<TextFormattingToolbarProps> = ({
  index,
  applyFormatting,
  addBulletPoint
}) => {
  return (
    <div className="mb-2 flex space-x-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              title="Bold (Ctrl+B)"
              onClick={() => applyFormatting(index, 'bold')}
            >
              <Bold className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bold (Ctrl+B)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              title="Italic (Ctrl+I)"
              onClick={() => applyFormatting(index, 'italic')}
            >
              <Italic className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Italic (Ctrl+I)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              title="Underline (Ctrl+U)"
              onClick={() => applyFormatting(index, 'underline')}
            >
              <Underline className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Underline (Ctrl+U)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              title="Add Bullet Point (Ctrl+L)"
              onClick={() => addBulletPoint(index)}
            >
              <List className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add Bullet Point (Ctrl+L)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TextFormattingToolbar;
