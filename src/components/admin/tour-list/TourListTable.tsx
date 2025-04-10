
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import TourPackageItem from './TourPackageItem';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  display_order?: number | null;
  created_at: string;
  updated_at: string;
}

interface TourListTableProps {
  packages: TourPackage[];
  onToggleVisibility: (id: string, currentVisibility: boolean) => void;
  onConfirmDelete: (id: string) => void;
  deleteLoading: boolean;
  updatingVisibility: string | null;
  onMovePackage?: (id: string, direction: 'up' | 'down') => void;
}

const TourListTable: React.FC<TourListTableProps> = ({
  packages,
  onToggleVisibility,
  onConfirmDelete,
  deleteLoading,
  updatingVisibility,
  onMovePackage
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Transport</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Visibility</TableHead>
            {onMovePackage && (
              <TableHead className="text-center">Order</TableHead>
            )}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((pkg) => (
            <TourPackageItem
              key={pkg.id}
              pkg={pkg}
              onDelete={onConfirmDelete}
              onToggleVisibility={onToggleVisibility}
              deleteLoading={deleteLoading}
              updatingVisibility={updatingVisibility}
              onMovePackage={onMovePackage}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TourListTable;
