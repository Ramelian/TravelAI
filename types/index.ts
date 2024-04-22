declare type Role = "function" | "system" | "user" | "assistant";

declare interface Query {
  role: Role;
  content: string | null;
}

declare interface Tour {
  city: string;
  country: string;
  title: string;
  description: string;
  stops: string[];
}

declare interface tour {
  tour: mbTour | null;
}

declare interface mbTour {
  _id: string;
  city: string;
  country: string;
  title: string;
  description: string;
  currency: string;
  stops: string[];
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

declare interface shortInfo {
  image: string;
  temperature: string;
  time: string;
}