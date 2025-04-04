
export interface DepartureDateProps {
  id?: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  status: 'Available' | 'Limited' | 'Full';
}

export interface DepartureDatesTabProps {
  tourId: string | undefined;
  isFixedDeparture: boolean;
}
