
import { TourPackageProps } from "@/components/TourPackage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash, Calendar, Settings, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface ToursTableProps {
  tours: TourPackageProps[];
  onDeleteClick: (index: number) => void;
}

const ToursTable = ({ tours, onDeleteClick }: ToursTableProps) => {
  return (
    <div className="bg-white rounded-md shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Tour Package</th>
              <th className="text-left p-4">Duration</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Features</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-16 rounded overflow-hidden">
                      <img 
                        src={tour.image} 
                        alt={tour.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{tour.title}</div>
                      <div className="text-sm text-gray-500">
                        {tour.transportType === 'bike' ? 'Bike Tour' : 
                         tour.transportType === 'car' ? 'Car Tour' : 
                         tour.transportType === 'innova' ? 'Innova Tour' : 'Tour'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  {tour.duration.nights} Nights / {tour.duration.days} Days
                </td>
                <td className="p-4">
                  <div className="font-medium">₹{tour.discountedPrice.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 line-through">₹{tour.originalPrice.toLocaleString()}</div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {tour.hasFixedDepartures !== false && (
                      <Badge variant="outline" className="flex items-center bg-green-50">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span className="text-xs">Fixed Departures</span>
                      </Badge>
                    )}
                    {tour.isCustomizable !== false && (
                      <Badge variant="outline" className="flex items-center bg-blue-50">
                        <Settings className="h-3 w-3 mr-1" />
                        <span className="text-xs">Customizable</span>
                      </Badge>
                    )}
                    {tour.isWomenOnly && (
                      <Badge variant="outline" className="flex items-center bg-pink-50">
                        <Users className="h-3 w-3 mr-1" />
                        <span className="text-xs">Women Only</span>
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/admin/tours/edit/${index}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onDeleteClick(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {tours.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No tour packages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToursTable;
