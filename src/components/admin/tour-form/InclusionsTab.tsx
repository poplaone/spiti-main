
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TourPackageProps } from "@/components/TourPackage";
import ItemListInput from "./ItemListInput";

interface InclusionsTabProps {
  formData: TourPackageProps;
  setFormData: React.Dispatch<React.SetStateAction<TourPackageProps>>;
}

const InclusionsTab = ({ formData, setFormData }: InclusionsTabProps) => {
  // Handle inclusions update
  const handleInclusionsUpdate = (inclusions: string[]) => {
    setFormData({
      ...formData,
      inclusions
    });
  };

  // Handle exclusions update
  const handleExclusionsUpdate = (exclusions: string[]) => {
    setFormData({
      ...formData,
      exclusions: exclusions
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inclusions & Exclusions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Inclusions</h3>
            <p className="text-sm text-gray-500">List all items included in the package price</p>
            
            <ItemListInput
              label="Inclusion"
              items={formData.inclusions}
              setItems={handleInclusionsUpdate}
              placeholder="e.g., Hotel accommodations, All meals"
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Exclusions</h3>
            <p className="text-sm text-gray-500">List all items not included in the package price</p>
            
            <ItemListInput
              label="Exclusion"
              items={formData.exclusions || []}
              setItems={handleExclusionsUpdate}
              placeholder="e.g., Flight tickets, Personal expenses"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InclusionsTab;
