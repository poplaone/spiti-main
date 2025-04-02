
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, CalendarIcon } from "lucide-react";
import { DepartureDate } from '@/components/TourPackage';
import DatePickerInput from '@/components/form/DatePickerInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DepartureDatesTabProps {
  departureDates: DepartureDate[];
  addDepartureDate: () => void;
  updateDepartureDate: (index: number, field: keyof DepartureDate, value: any) => void;
  removeDepartureDate: (index: number) => void;
}

const DepartureDatesTab: React.FC<DepartureDatesTabProps> = ({
  departureDates,
  addDepartureDate,
  updateDepartureDate,
  removeDepartureDate,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Departure Dates</h2>
        <Button onClick={addDepartureDate} type="button">
          <Plus className="h-4 w-4 mr-2" />
          Add Date
        </Button>
      </div>

      {departureDates.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            No departure dates added yet. Click the "Add Date" button to add one.
          </CardContent>
        </Card>
      )}

      {departureDates.map((date, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">
                Departure #{index + 1}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeDepartureDate(index)}
                type="button"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`departure-start-${index}`}>Start Date</Label>
                <DatePickerInput
                  date={date.startDate ? new Date(date.startDate) : undefined}
                  setDate={(newDate) => updateDepartureDate(index, 'startDate', newDate)}
                  icon={CalendarIcon}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`departure-end-${index}`}>End Date</Label>
                <DatePickerInput
                  date={date.endDate ? new Date(date.endDate) : undefined}
                  setDate={(newDate) => updateDepartureDate(index, 'endDate', newDate)}
                  icon={CalendarIcon}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`departure-status-${index}`}>Status</Label>
              <Select
                value={date.status || "Available"}
                onValueChange={(value) => updateDepartureDate(index, 'status', value)}
              >
                <SelectTrigger id={`departure-status-${index}`}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Limited">Limited</SelectItem>
                  <SelectItem value="Full">Full</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DepartureDatesTab;
