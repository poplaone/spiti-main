
import { TourPackageProps } from "@/components/TourPackage";
import { TourTransportType } from "@/data/types/tourTypes";

// Form action types
export type FormInputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type FormNumberChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TransportType = TourTransportType; // Using the central type definition

// Tour form state interface
export interface TourFormState {
  formData: TourPackageProps;
  activeTab: string;
  isEditing: boolean;
}
