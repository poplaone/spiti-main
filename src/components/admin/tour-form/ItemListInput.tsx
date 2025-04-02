
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface ItemListInputProps {
  label: string;
  items: string[];
  setItems: (items: string[]) => void;
  placeholder?: string;
}

const ItemListInput = ({ label, items, setItems, placeholder = "Add new item" }: ItemListInputProps) => {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button 
          type="button" 
          variant="outline"
          onClick={handleAddItem}
          className="flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add {label}
        </Button>
      </div>
      
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No {label.toLowerCase()} added yet.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="flex items-center justify-between border rounded-md p-3">
              <span>{item}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleRemoveItem(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ItemListInput;
