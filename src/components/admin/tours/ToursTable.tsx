
import React from 'react';
import { TourPackageProps } from "@/components/TourPackage";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

interface ToursTableProps {
  tours: TourPackageProps[];
  onDeleteClick: (index: number) => void;
  className?: string;
}

const ToursTable: React.FC<ToursTableProps> = ({ tours, onDeleteClick, className = "" }) => {
  // Function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <div className={`rounded-md border ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 text-center">ID</TableHead>
            <TableHead className="w-20">Image</TableHead>
            <TableHead className="min-w-[200px]">Title</TableHead>
            <TableHead className="w-32">Price</TableHead>
            <TableHead className="w-32">Type</TableHead>
            <TableHead className="w-24">Duration</TableHead>
            <TableHead className="w-24 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours.map((tour) => (
            <TableRow key={tour.index}>
              <TableCell className="font-medium text-center">{tour.index}</TableCell>
              <TableCell>
                <div className="h-12 w-16 overflow-hidden rounded-md">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{tour.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">
                  {tour.customUrl || `tour-${tour.index}`}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">₹{formatPrice(tour.discountedPrice)}</div>
                <div className="text-xs text-muted-foreground line-through">
                  ₹{formatPrice(tour.originalPrice)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="capitalize">
                    {tour.transportType}
                  </span>
                  {tour.isWomenOnly && (
                    <span className="ml-2 bg-pink-100 text-pink-800 text-xs px-2 py-0.5 rounded-full">
                      Women Only
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {tour.duration.days} days
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Link to={`/admin/tours/edit/${tour.index}`}>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDeleteClick(tour.index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ToursTable;
