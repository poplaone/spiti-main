
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
      <CardContent className="space-y-6">
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
        
        {/* New input fields for tour overview details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bestTime">Best Time</Label>
            <Input
              id="bestTime"
              name="bestTime"
              value={formData.bestTime || "June to September"}
              onChange={handleInputChange}
              placeholder="e.g., June to September"
            />
          </div>
          
          <div>
            <Label htmlFor="accommodationType">Accommodation Type</Label>
            <Input
              id="accommodationType"
              name="accommodationType"
              value={formData.accommodationType || "Hotels & Homestays"}
              onChange={handleInputChange}
              placeholder="e.g., Hotels & Homestays"
            />
          </div>
          
          <div>
            <Label htmlFor="groupSize">Group Size</Label>
            <Input
              id="groupSize"
              name="groupSize"
              value={formData.groupSize || "2-10 People"}
              onChange={handleInputChange}
              placeholder="e.g., 2-10 People"
            />
          </div>
          
          <div>
            <Label htmlFor="terrain">Terrain</Label>
            <Input
              id="terrain"
              name="terrain"
              value={formData.terrain || "Himalayan Mountain Passes"}
              onChange={handleInputChange}
              placeholder="e.g., Himalayan Mountain Passes"
            />
          </div>
          
          <div>
            <Label htmlFor="elevation">Elevation</Label>
            <Input
              id="elevation"
              name="elevation"
              value={formData.elevation || "2,000 - 4,550 meters"}
              onChange={handleInputChange}
              placeholder="e.g., 2,000 - 4,550 meters"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
