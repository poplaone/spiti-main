
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SeedOriginalToursButton from '@/components/admin/SeedOriginalToursButton';

const TourListHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Tour Packages</h1>
      <div className="flex gap-2">
        <SeedOriginalToursButton />
        <Button asChild className="bg-spiti-forest hover:bg-spiti-forest/90">
          <Link to="/admin/tour-packages/create">
            <Plus className="w-4 h-4 mr-2" />
            Add New Package
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TourListHeader;
