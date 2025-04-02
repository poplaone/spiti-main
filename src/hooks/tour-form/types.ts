
import { TourPackageProps } from "@/components/TourPackage";

// Form action types
export type FormInputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type FormNumberChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TransportType = 'bike' | 'car' | 'premium' | 'innova';

// Tour form state interface
export interface TourFormState {
  formData: TourPackageProps;
  activeTab: string;
  isEditing: boolean;
}
