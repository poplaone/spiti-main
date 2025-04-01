
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFilter: string | null;
  onFilterSelect: (filter: string | null) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedFilter,
  onFilterSelect
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search packages..."
          className="pl-10"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex w-full md:w-auto justify-between">
            <Filter className="mr-2 h-4 w-4" />
            {selectedFilter ? `Filter: ${selectedFilter}` : 'Filter'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onFilterSelect(null)}>
            All Types
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterSelect('bike')}>
            Bike Tours
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterSelect('car')}>
            Car Tours
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchAndFilter;
