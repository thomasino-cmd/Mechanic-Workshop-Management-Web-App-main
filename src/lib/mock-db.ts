import { Appointment, Client, Job, Vehicle } from './types';

export const clients: Client[] = [
  { id: 'c1', fullName: 'Marco Rossi', phoneNumber: '+39 333 111 2233' },
  { id: 'c2', fullName: 'Giulia Conti', phoneNumber: '+39 333 988 1122' },
  { id: 'c3', fullName: 'Luca Bianchi', phoneNumber: '+39 320 765 1234' },
  { id: 'c4', fullName: 'Serena Neri', phoneNumber: '+39 340 555 7788' },
  { id: 'c5', fullName: 'Paolo Verdi', phoneNumber: '+39 339 102 9384' }
];

export const vehicles: Vehicle[] = [
  { id: 'v1', clientId: 'c1', licensePlate: 'AB123CD', make: 'Fiat', model: 'Panda', year: 2020, blueprintShape: 'compact', color: '#2563eb' },
  { id: 'v2', clientId: 'c2', licensePlate: 'EF456GH', make: 'Alfa Romeo', model: 'Giulia', year: 2019, blueprintShape: 'sedan', color: '#dc2626' },
  { id: 'v3', clientId: 'c3', licensePlate: 'IJ789KL', make: 'Volkswagen', model: 'Passat', year: 2018, blueprintShape: 'wagon', color: '#0f766e' },
  { id: 'v4', clientId: 'c4', licensePlate: 'MN321OP', make: 'Jeep', model: 'Renegade', year: 2021, blueprintShape: 'suv', color: '#374151' },
  { id: 'v5', clientId: 'c5', licensePlate: 'QR654ST', make: 'Mercedes', model: 'Vito', year: 2017, blueprintShape: 'van', color: '#7c3aed' }
];

export const jobs: Job[] = [
  { id: 'j1', vehicleId: 'v1', date: '2025-01-10', kilometers: 26000, tags: ['Tagliando'], notes: 'Cambio olio e filtri', price: 190, isBilled: true },
  { id: 'j2', vehicleId: 'v1', date: '2025-09-10', kilometers: 39500, tags: ['Freni Ant.'], notes: 'Pastiglie anteriori', price: 240, isBilled: false },
  { id: 'j3', vehicleId: 'v2', date: '2025-05-18', kilometers: 71000, tags: ['Tagliando', 'Gomme'], notes: '4 pneumatici estivi', price: 620, isBilled: false },
  { id: 'j4', vehicleId: 'v2', date: '2024-04-18', kilometers: 54000, tags: ['Distribuzione'], notes: 'Cinghia completa', price: 920, isBilled: true },
  { id: 'j5', vehicleId: 'v3', date: '2025-02-11', kilometers: 124000, tags: ['Frizione'], notes: 'Kit frizione', price: 870, isBilled: false },
  { id: 'j6', vehicleId: 'v3', date: '2024-11-10', kilometers: 113000, tags: ['Tagliando'], notes: 'Tagliando standard', price: 210, isBilled: true },
  { id: 'j7', vehicleId: 'v4', date: '2025-08-10', kilometers: 43500, tags: ['Freni Ant.', 'Freni Post.'], notes: 'Dischi + pastiglie', price: 540, isBilled: false },
  { id: 'j8', vehicleId: 'v4', date: '2025-03-06', kilometers: 34000, tags: ['Tagliando'], notes: 'Tagliando annuale', price: 240, isBilled: true },
  { id: 'j9', vehicleId: 'v5', date: '2025-01-29', kilometers: 156000, tags: ['Distribuzione'], notes: 'Pompa acqua inclusa', price: 990, isBilled: false },
  { id: 'j10', vehicleId: 'v5', date: '2024-07-29', kilometers: 139000, tags: ['Tagliando', 'Gomme'], notes: 'Tagliando + convergenza', price: 420, isBilled: true }
];

export const appointments: Appointment[] = [
  { id: 'a1', date: '2026-02-26', time: '08:30', vehicleId: 'v1', jobDescription: 'Tagliando rapido', status: 'Pending' },
  { id: 'a2', date: '2026-02-26', time: '10:00', vehicleId: 'v2', jobDescription: 'Diagnosi rumore freni', status: 'Pending' },
  { id: 'a3', date: '2026-02-26', time: '11:15', vehicleId: 'v3', jobDescription: 'Controllo sospensioni', status: 'In_Workshop' },
  { id: 'a4', date: '2026-02-27', time: '09:00', vehicleId: 'v4', jobDescription: 'Sostituzione batteria', status: 'Pending' },
  { id: 'a5', date: '2026-02-28', time: '15:30', vehicleId: 'v5', jobDescription: 'Revisione completa', status: 'Pending' }
];
