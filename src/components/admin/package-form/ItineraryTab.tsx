
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import ItineraryEditor from "../ItineraryEditor";

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
          Add day-by-day itinerary details
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
