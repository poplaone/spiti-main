
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Edit, 
  Trash2, 
  Eye,
  Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TourPackageProps } from '@/components/TourPackage';

interface TourPackageListProps {
  packages: TourPackageProps[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

const TourPackageList: React.FC<TourPackageListProps> = ({ 
  packages, 
  isLoading,
  onDelete 
}) => {
  const navigate = useNavigate();

  // Format price as Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-spiti-forest" />
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Package Name</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="hidden md:table-cell">Duration</TableHead>
            <TableHead className="hidden md:table-cell">Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="h-10 w-14 object-cover rounded"
                    />
                    <span className="line-clamp-2">{pkg.title}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">
                    {pkg.transportType === 'bike' ? 'Bike Tour' : 
                     pkg.transportType === 'car' ? 'Car Tour' : 'Other'}
                  </Badge>
                  {pkg.isWomenOnly && (
                    <Badge variant="secondary" className="ml-2 bg-pink-100 text-pink-800">
                      Women Only
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {pkg.duration.nights} Nights / {pkg.duration.days} Days
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div>
                    <div className="text-sm font-semibold">₹{formatPrice(pkg.discountedPrice)}</div>
                    <div className="text-xs text-gray-500 line-through">₹{formatPrice(pkg.originalPrice)}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <a href={`/tour-detail/${pkg.id}`} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => navigate(`/admin/tour-packages/${pkg.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() => onDelete(pkg.id as string)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                No tour packages found matching your criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TourPackageList;
