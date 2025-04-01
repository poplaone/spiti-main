
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TourPackageProps } from "@/components/TourPackage";

interface OverviewTabProps {
  formData: TourPackageProps;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const OverviewTab = ({ formData, handleInputChange }: OverviewTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tour Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="overview">Overview</Label>
          <Textarea
            id="overview"
            name="overview"
            value={formData.overview || ""}
            onChange={handleInputChange}
            placeholder="Enter detailed package overview"
            className="min-h-32"
          />
          <p className="text-sm text-gray-500 mt-2">
            Provide a comprehensive description of the tour experience
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
