
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface ExclusionsTabProps {
  exclusions: string[];
  addExclusion: () => void;
  updateExclusion: (index: number, value: string) => void;
  removeExclusion: (index: number) => void;
}

const ExclusionsTab: React.FC<ExclusionsTabProps> = ({
  exclusions,
  addExclusion,
  updateExclusion,
  removeExclusion
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exclusions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Add items that are not included in the package</p>
          <Button 
            type="button" 
            onClick={addExclusion}
            variant="outline"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </Button>
        </div>
        
        {exclusions.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={item}
              onChange={(e) => updateExclusion(index, e.target.value)}
              placeholder="Enter exclusion item"
              className="flex-grow"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeExclusion(index)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
        
        {exclusions.length === 0 && (
          <div className="text-sm text-gray-500 py-2">
            No exclusions added. Click "Add Item" to add one.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExclusionsTab;
