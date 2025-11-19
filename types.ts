export interface User {
  name: string;
  email: string;
  points: number;
  wasteDivertedKg: number;
  bottlesRecycled: number;
}

export interface RewardItem {
  id: string;
  name: string;
  cost: number;
  image: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AuthState {
  IDLE,
  LOGIN,
  SIGNUP
}
