
import React from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DepartureDateProps } from './types';

interface DepartureDatesListProps {
  dates: DepartureDateProps[];
  loading: boolean;
  onUpdateStatus: (id: string, status: 'Available' | 'Limited' | 'Full') => void;
  onDeleteDate: (id: string) => void;
}

const DepartureDatesList: React.FC<DepartureDatesListProps> = ({ 
  dates, 
  loading, 
  onUpdateStatus, 
  onDeleteDate 
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin h-6 w-6 border-2 border-current border-t-transparent rounded-full mr-2"></div>
        <span>Loading dates...</span>
      </div>
    );
  }
  
  if (dates.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No departure dates have been added. Add your first departure date above.
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dates.map((date) => (
          <TableRow key={date.id}>
            <TableCell>
              {format(date.startDate, 'dd MMM yyyy')}
            </TableCell>
            <TableCell>
              {format(date.endDate, 'dd MMM yyyy')}
            </TableCell>
            <TableCell>
              <Select 
                value={date.status} 
                onValueChange={(value: 'Available' | 'Limited' | 'Full') => 
                  date.id && onUpdateStatus(date.id, value)
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Limited">Limited</SelectItem>
                  <SelectItem value="Full">Full</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => date.id && onDeleteDate(date.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DepartureDatesList;
