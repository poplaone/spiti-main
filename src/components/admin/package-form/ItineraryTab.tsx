
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import ItineraryEditor from "../itinerary-editor";

interface ItineraryDay {
  id?: string;
  day_number: number;
  title: string;
  description: string;
}

interface ItineraryTabProps {
  itineraryDays: ItineraryDay[];
  setItineraryDays: React.Dispatch<React.SetStateAction<ItineraryDay[]>>;
}

const ItineraryTab: React.FC<ItineraryTabProps> = ({
  itineraryDays,
  setItineraryDays
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tour Itinerary</CardTitle>
        <CardDescription>
          Add day-by-day itinerary details with formatted text and bullet points.
          <div className="mt-2 text-xs bg-amber-50 border border-amber-200 p-2 rounded">
            <p className="font-medium text-amber-800 mb-1">Formatting Tips:</p>
            <ul className="list-disc ml-4 text-amber-700 space-y-1">
              <li>Select text and use formatting buttons (B, I, U) or keyboard shortcuts</li>
              <li>Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline</li>
              <li>Add bullet points with the list icon or Ctrl+L</li>
              <li>Or start a line with "• " (bullet + space)</li>
              <li>Each bullet point should be on its own line</li>
              <li>Line breaks will be preserved in the published view</li>
            </ul>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ItineraryEditor
          itineraryDays={itineraryDays}
          setItineraryDays={setItineraryDays}
        />
      </CardContent>
    </Card>
  );
};

export default ItineraryTab;
