
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface Item {
  id?: string;
  description: string;
}

interface InclusionsEditorProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  title: string;
  placeholder: string;
}

const InclusionsEditor: React.FC<InclusionsEditorProps> = ({ 
  items, 
  setItems,
  title,
  placeholder 
}) => {
  const addItem = () => {
    setItems([...items, { description: '' }]);
  };

  const updateItem = (index: number, description: string) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], description };
    setItems(updatedItems);
  };

  const removeItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm">{title}</h4>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            placeholder={placeholder}
            value={item.description}
            onChange={(e) => updateItem(index, e.target.value)}
            className="flex-grow"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeItem(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        onClick={addItem}
        size="sm"
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add {title.slice(0, -1)}
      </Button>
    </div>
  );
};

export default InclusionsEditor;
