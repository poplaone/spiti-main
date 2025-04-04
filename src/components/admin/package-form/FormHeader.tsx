
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FormHeaderProps {
  isEditing: boolean;
  isLoading: boolean;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  isEditing,
  isLoading
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        {isEditing ? 'Edit Tour Package' : 'Create New Tour Package'}
      </h1>
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate('/admin/tour-packages')}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-spiti-forest hover:bg-spiti-forest/90"
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              {isEditing ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>{isEditing ? 'Update Package' : 'Create Package'}</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormHeader;
