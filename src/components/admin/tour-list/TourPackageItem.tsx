
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Eye, EyeOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface TourPackage {
  id: string;
  title: string;
  image: string;
  original_price: number;
  discounted_price: number;
  discount: number;
  transport_type: string;
  is_women_only: boolean;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

interface TourPackageItemProps {
  pkg: TourPackage;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string, currentVisibility: boolean) => void;
  deleteLoading: boolean;
  updatingVisibility: string | null;
}

const TourPackageItem: React.FC<TourPackageItemProps> = ({
  pkg,
  onDelete,
  onToggleVisibility,
  deleteLoading,
  updatingVisibility,
}) => {
  // Track if the delete dialog is open
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  // Function to handle delete confirmation
  const handleDeleteConfirm = () => {
    onDelete(pkg.id);
    setDeleteDialogOpen(false);
  };

  return (
    <TableRow key={pkg.id} className={!pkg.is_visible ? "opacity-60" : ""}>
      <TableCell>
        <div className="w-12 h-12 rounded overflow-hidden">
          <img 
            src={pkg.image} 
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
        </div>
      </TableCell>
      <TableCell className="font-medium">{pkg.title}</TableCell>
      <TableCell>
        <div className="text-sm">
          <div className="font-semibold">₹{pkg.discounted_price.toLocaleString('en-IN')}</div>
          <div className="text-xs text-gray-500 line-through">₹{pkg.original_price.toLocaleString('en-IN')}</div>
        </div>
      </TableCell>
      <TableCell className="capitalize">{pkg.transport_type}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
          Active
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleVisibility(pkg.id, pkg.is_visible)}
            disabled={updatingVisibility === pkg.id}
            className="text-gray-600 hover:text-gray-900"
          >
            {updatingVisibility === pkg.id ? (
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
            ) : pkg.is_visible ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </Button>
          <span className="ml-2 text-sm">
            {pkg.is_visible ? 'Visible' : 'Hidden'}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            asChild
          >
            <Link to={`/admin/tour-packages/edit/${pkg.id}`}>
              <Edit className="w-4 h-4" />
            </Link>
          </Button>
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-600 hover:text-red-800 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Tour Package</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete "{pkg.title}"? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  variant="destructive"
                  onClick={handleDeleteConfirm}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TourPackageItem;
