export type Role = 'admin' | 'mechanic' | 'customer';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  created_at?: string;
}

export interface ServiceItem {
  id: number;
  name: string;
  description: string;
  price: string | number;
  duration_estimate: number;
  is_active: boolean;
}

export interface Vehicle {
  id: number;
  user_id: number;
  plate_number: string;
  brand: string;
  model: string;
  year?: number;
  color?: string;
  vin?: string;
}

export interface Reservation {
  id: number;
  user_id: number;
  vehicle_id: number;
  service_id: number;
  scheduled_at: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  service?: ServiceItem;
  vehicle?: Vehicle;
  user?: User;
}

export interface WorkOrder {
  id: number;
  reservation_id: number;
  mechanic_id: number;
  status: 'pending' | 'in_progress' | 'completed';
  started_at?: string;
  completed_at?: string;
  total_price?: number;
  mechanic?: User;
  reservation?: Reservation;
}
