
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SeedOriginalToursButton from '@/components/admin/SeedOriginalToursButton';

const EmptyTourList: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-8 text-center">
      <h2 className="text-xl font-medium mb-2">No tour packages yet</h2>
      <p className="text-gray-500 mb-6">
        Create your first tour package or import the original tour data to get started.
      </p>
      <div className="flex gap-4 justify-center">
        <SeedOriginalToursButton />
        <Button asChild className="bg-spiti-forest hover:bg-spiti-forest/90">
          <Link to="/admin/tour-packages/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Tour Package
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptyTourList;
