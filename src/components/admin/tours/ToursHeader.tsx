
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface ToursHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ToursHeader = ({ searchTerm, setSearchTerm }: ToursHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <h1 className="text-2xl font-bold">Tour Packages</h1>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full sm:w-[250px]"
          />
        </div>
        
        <Button asChild className="bg-spiti-forest hover:bg-spiti-forest/90">
          <Link to="/admin/tours/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Package
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ToursHeader;
