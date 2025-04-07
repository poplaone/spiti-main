
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import NightStaysEditor from "../NightStaysEditor";
import InclusionsEditor from "../InclusionsEditor";

interface NightStay {
  id?: string;
  location: string;
  nights: number;
  order?: number;
}

interface Item {
  id?: string;
  description: string;
}

interface DetailsTabProps {
  nightStays: NightStay[];
  setNightStays: React.Dispatch<React.SetStateAction<NightStay[]>>;
  inclusions: Item[];
  setInclusions: React.Dispatch<React.SetStateAction<Item[]>>;
  exclusions: Item[];
  setExclusions: React.Dispatch<React.SetStateAction<Item[]>>;
}

const DetailsTab: React.FC<DetailsTabProps> = ({
  nightStays = [],
  setNightStays,
  inclusions = [],
  setInclusions,
  exclusions = [],
  setExclusions
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accommodation & Inclusions</CardTitle>
        <CardDescription>
          Add night stays, inclusions, and exclusions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Night Stays</h3>
            <NightStaysEditor
              nightStays={nightStays || []}
              setNightStays={setNightStays}
            />
          </div>
          
          <div className="pt-4 border-t space-y-4">
            <h3 className="text-lg font-medium">Inclusions & Exclusions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InclusionsEditor
                items={inclusions || []}
                setItems={setInclusions}
                title="Inclusions"
                placeholder="Add what's included in the package"
              />
              
              <InclusionsEditor
                items={exclusions || []}
                setItems={setExclusions}
                title="Exclusions"
                placeholder="Add what's not included in the package"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailsTab;
