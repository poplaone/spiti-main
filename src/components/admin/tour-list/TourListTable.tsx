
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
  display_order?: number;
  created_at: string;
  updated_at: string;
}

interface TourListTableProps {
  packages: TourPackage[];
  onToggleVisibility: (id: string, currentVisibility: boolean) => void;
  onConfirmDelete: (id: string) => void;
  deleteLoading: boolean;
  updatingVisibility: string | null;
  updatingOrder?: string | null;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
}

const TourListTable: React.FC<TourListTableProps> = ({
  packages,
  onToggleVisibility,
  onConfirmDelete,
  deleteLoading,
  updatingVisibility,
  updatingOrder,
  onMoveUp,
  onMoveDown,
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
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((pkg, index) => (
            <TourPackageItem
              key={pkg.id}
              pkg={pkg}
              index={index}
              onDelete={onConfirmDelete}
              onToggleVisibility={onToggleVisibility}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              deleteLoading={deleteLoading}
              updatingVisibility={updatingVisibility}
              updatingOrder={updatingOrder}
              isFirst={index === 0}
              isLast={index === packages.length - 1}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TourListTable;
