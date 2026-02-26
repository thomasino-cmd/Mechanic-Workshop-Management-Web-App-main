export type BlueprintShape = 'compact' | 'sedan' | 'wagon' | 'suv' | 'van' | 'sport';

export type Client = {
  id: string;
  fullName: string;
  phoneNumber: string;
};

export type Vehicle = {
  id: string;
  clientId: string;
  licensePlate?: string;
  make: string;
  model: string;
  year?: number;
  blueprintShape?: BlueprintShape;
  color?: string;
};

export type Job = {
  id: string;
  vehicleId: string;
  date: string;
  kilometers: number;
  tags: string[];
  notes: string;
  price: number;
  isBilled: boolean;
};

export type AppointmentStatus = 'Pending' | 'In_Workshop' | 'Completed';

export type Appointment = {
  id: string;
  date: string;
  time: string;
  vehicleId: string;
  jobDescription: string;
  status: AppointmentStatus;
};
