
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TourPackageProps } from "@/components/TourPackage";
import { FormInputChangeEvent } from "@/hooks/tour-form/types";

interface InclusionsTabProps {
  formData: TourPackageProps;
  setFormData: React.Dispatch<React.SetStateAction<TourPackageProps>>;
}

const InclusionsTab = ({ formData, setFormData }: InclusionsTabProps) => {
  const handleTextareaChange = (e: FormInputChangeEvent, field: 'inclusions' | 'exclusions') => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value.split('\n').filter(item => item.trim() !== "")
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inclusions & Exclusions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="inclusions">Inclusions (one per line)</Label>
          <Textarea
            id="inclusions"
            value={formData.inclusions.join("\n")}
            onChange={(e) => handleTextareaChange(e, 'inclusions')}
            placeholder="Enter inclusions (one per line)"
            className="min-h-32"
            rows={8}
          />
          <p className="text-sm text-gray-500 mt-1">
            List all items included in the package price
          </p>
        </div>
        
        <div>
          <Label htmlFor="exclusions">Exclusions (one per line)</Label>
          <Textarea
            id="exclusions"
            value={(formData.exclusions || []).join("\n")}
            onChange={(e) => handleTextareaChange(e, 'exclusions')}
            placeholder="Enter exclusions (one per line)"
            className="min-h-32"
            rows={8}
          />
          <p className="text-sm text-gray-500 mt-1">
            List all items not included in the package price
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InclusionsTab;
