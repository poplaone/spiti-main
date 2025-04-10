
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye, EyeOff, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

interface TourPackageProps {
  pkg: {
    id: string;
    title: string;
    image: string;
    original_price: number;
    discounted_price: number;
    transport_type: string;
    is_visible: boolean;
    display_order?: number | null;
  };
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string, currentVisibility: boolean) => void;
  deleteLoading: boolean;
  updatingVisibility: string | null;
  onMovePackage?: (id: string, direction: 'up' | 'down') => void;
}

const TourPackageItem: React.FC<TourPackageProps> = ({
  pkg,
  onDelete,
  onToggleVisibility,
  deleteLoading,
  updatingVisibility,
  onMovePackage
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  
  return (
    <>
      <TableRow>
        <TableCell>
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-10 h-10 rounded object-cover"
          />
        </TableCell>
        <TableCell className="font-medium">{pkg.title}</TableCell>
        <TableCell>₹{pkg.discounted_price.toLocaleString('en-IN')}</TableCell>
        <TableCell>
          <Badge variant="outline" className="capitalize">
            {pkg.transport_type}
          </Badge>
        </TableCell>
        <TableCell>
          <Badge className={pkg.is_visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {pkg.is_visible ? 'Published' : 'Hidden'}
          </Badge>
        </TableCell>
        <TableCell>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleVisibility(pkg.id, pkg.is_visible)}
            disabled={updatingVisibility === pkg.id}
            className={pkg.is_visible ? 'text-red-500' : 'text-green-500'}
          >
            {updatingVisibility === pkg.id ? (
              <span className="flex items-center">
                <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            ) : pkg.is_visible ? (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                Hide
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Show
              </>
            )}
          </Button>
        </TableCell>
        {onMovePackage && (
          <TableCell className="text-center">
            <div className="flex justify-center space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onMovePackage(pkg.id, 'up')}
                className="px-1 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onMovePackage(pkg.id, 'down')}
                className="px-1 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {pkg.display_order !== null && pkg.display_order !== undefined 
                ? `Order: ${pkg.display_order}` 
                : 'No order set'}
            </div>
          </TableCell>
        )}
        <TableCell className="text-right">
          <div className="flex justify-end space-x-1">
            <Link to={`/admin/tour-packages/edit/${pkg.id}`}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDeleteDialog(true)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the tour package "{pkg.title}" and all associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                onDelete(pkg.id);
                setShowDeleteDialog(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TourPackageItem;
