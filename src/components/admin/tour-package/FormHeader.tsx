
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';
import { CardTitle, CardDescription } from "@/components/ui/card";

interface FormHeaderProps {
  id: string | undefined;
  title: string | undefined;
  isSaving: boolean;
}

const FormHeader: React.FC<FormHeaderProps> = ({ id, title, isSaving }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <CardTitle>Tour Package Details</CardTitle>
        <CardDescription>Manage all aspects of this tour package</CardDescription>
      </div>
      <div className="flex gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate(`/admin/tour-packages/${id}/preview`)}
          disabled={isSaving}
        >
          Preview
        </Button>
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => navigate('/admin/tour-packages')}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button 
          className="bg-spiti-forest hover:bg-spiti-forest/90" 
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Package
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormHeader;
