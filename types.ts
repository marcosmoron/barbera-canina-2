export interface DogProfile {
  photo: string | null;
  name: string;
  ownerName: string;
  phone: string;
  breed: string;
  weight: string;
  age: string;
  hairType: string;
  tags: string[];
  service: string;
  days: string[];
  times: string[];
  notes: string;
}

export type ViewState = 'welcome' | 'form' | 'card';

export interface ServiceOption {
  id: string;
  icon: 'droplets' | 'scissors' | 'award' | 'heart';
  label: string;
}
