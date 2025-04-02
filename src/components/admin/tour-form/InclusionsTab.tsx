
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface InclusionsTabProps {
  inclusions: string[];
  addInclusion: () => void;
  updateInclusion: (index: number, value: string) => void;
  removeInclusion: (index: number) => void;
}

const InclusionsTab: React.FC<InclusionsTabProps> = ({
  inclusions,
  addInclusion,
  updateInclusion,
  removeInclusion
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inclusions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Add items that are included in the package</p>
          <Button 
            type="button" 
            onClick={addInclusion}
            variant="outline"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </Button>
        </div>
        
        {inclusions.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={item}
              onChange={(e) => updateInclusion(index, e.target.value)}
              placeholder="Enter inclusion item"
              className="flex-grow"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeInclusion(index)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
        
        {inclusions.length === 0 && (
          <div className="text-sm text-gray-500 py-2">
            No inclusions added. Click "Add Item" to add one.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InclusionsTab;
