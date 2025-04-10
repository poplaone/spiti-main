
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpFromLine, 
  ArrowDownToLine, 
  Eye, 
  EyeOff, 
  Pencil, 
  Trash2,
  Car,
  Bike
} from 'lucide-react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TourPackageItemProps {
  pkg: {
    id: string;
    title: string;
    image: string;
    original_price: number;
    discounted_price: number;
    transport_type: string;
    is_visible: boolean;
    display_order?: number;
  };
  index: number;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string, currentVisibility: boolean) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  deleteLoading: boolean;
  updatingVisibility: string | null;
  updatingOrder?: string | null;
  isFirst: boolean;
  isLast: boolean;
}

const TourPackageItem: React.FC<TourPackageItemProps> = ({
  pkg,
  index,
  onDelete,
  onToggleVisibility,
  onMoveUp,
  onMoveDown,
  deleteLoading,
  updatingVisibility,
  updatingOrder,
  isFirst,
  isLast
}) => {
  // Format price with commas for thousands
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN');
  };
  
  const isProcessing = deleteLoading || updatingVisibility === pkg.id || updatingOrder === pkg.id;
  
  return (
    <TableRow key={pkg.id}>
      <TableCell>
        <div className="w-12 h-12 rounded overflow-hidden">
          <img 
            src={pkg.image} 
            alt={pkg.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </TableCell>
      
      <TableCell>
        <div className="font-medium line-clamp-2">{pkg.title}</div>
      </TableCell>
      
      <TableCell>
        <div className="flex flex-col">
          <span className="text-gray-700">₹{formatPrice(pkg.discounted_price)}</span>
          <span className="text-xs text-gray-500 line-through">₹{formatPrice(pkg.original_price)}</span>
        </div>
      </TableCell>
      
      <TableCell>
        {pkg.transport_type === 'car' ? (
          <Car className="h-5 w-5 text-blue-500" />
        ) : pkg.transport_type === 'bike' ? (
          <Bike className="h-5 w-5 text-orange-500" />
        ) : (
          pkg.transport_type
        )}
      </TableCell>
      
      <TableCell>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          pkg.is_visible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {pkg.is_visible ? 'Active' : 'Hidden'}
        </span>
      </TableCell>
      
      <TableCell>
        <Switch
          checked={pkg.is_visible}
          disabled={isProcessing}
          onCheckedChange={() => onToggleVisibility(pkg.id, pkg.is_visible)}
        />
      </TableCell>
      
      <TableCell>
        <div className="flex flex-col items-center space-y-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={isFirst || isProcessing}
            onClick={() => onMoveUp && onMoveUp(index)}
            className="h-7 w-7"
          >
            <ArrowUpFromLine className="h-4 w-4" />
          </Button>
          <span className="text-xs font-medium">{pkg.display_order || index + 1}</span>
          <Button
            variant="ghost"
            size="icon"
            disabled={isLast || isProcessing}
            onClick={() => onMoveDown && onMoveDown(index)}
            className="h-7 w-7"
          >
            <ArrowDownToLine className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
      
      <TableCell className="text-right">
        <div className="flex justify-end space-x-2">
          <Link to={`/admin/edit-package/${pkg.id}`}>
            <Button variant="outline" size="sm" disabled={isProcessing}>
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" disabled={isProcessing} className="border-red-200 hover:bg-red-50 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete "{pkg.title}" and all associated data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(pkg.id)} className="bg-red-500 hover:bg-red-600">
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TourPackageItem;
