export type Service = {
  id: string;
  therapistId: string;
  name: string;
  durationMins: number;
  price: number;
  description: string;
};

export type Therapist = {
  id: string;
  name: string;
  bio: string;
  skills: string[];
  location: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  travelRadiusKm: number;
  avatar: string;
};

export type Availability = {
  therapistId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
};

export type BookingRecord = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  therapistId: string;
  serviceId: string;
  datetime: string;
  address: string;
  totalAmount: number;
  platformFee: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
};

export const therapists: Therapist[] = [
  {
    id: "therapist-lena-hart",
    name: "Lena Hart",
    bio: "Mobile remedial therapist focused on prenatal care, recovery sessions, and premium in-home treatments.",
    skills: ["Relaxation", "Prenatal", "Remedial"],
    location: "Adelaide CBD",
    lat: -34.9285,
    lng: 138.6007,
    rating: 4.9,
    reviewCount: 124,
    isVerified: true,
    travelRadiusKm: 18,
    avatar: "LH"
  },
  {
    id: "therapist-marcus-lee",
    name: "Marcus Lee",
    bio: "Sports and trigger point specialist working with athletes and office workers across inner Adelaide.",
    skills: ["Sports", "Deep Tissue", "Trigger Point"],
    location: "North Adelaide",
    lat: -34.907,
    lng: 138.593,
    rating: 4.8,
    reviewCount: 98,
    isVerified: true,
    travelRadiusKm: 15,
    avatar: "ML"
  },
  {
    id: "therapist-sophia-ng",
    name: "Sophia Ng",
    bio: "Calm, restorative treatments with strong repeat-booking performance in relaxation and recovery packages.",
    skills: ["Relaxation", "Deep Tissue", "Hot Stone"],
    location: "Glenelg",
    lat: -34.9802,
    lng: 138.5146,
    rating: 4.7,
    reviewCount: 74,
    isVerified: true,
    travelRadiusKm: 12,
    avatar: "SN"
  }
];

export const services: Service[] = [
  {
    id: "service-lena-prenatal-60",
    therapistId: "therapist-lena-hart",
    name: "Prenatal Massage",
    durationMins: 60,
    price: 14500,
    description: "Supportive at-home prenatal treatment with safe positioning and recovery focus."
  },
  {
    id: "service-lena-remedial-90",
    therapistId: "therapist-lena-hart",
    name: "Remedial Massage",
    durationMins: 90,
    price: 18500,
    description: "Targeted remedial work for pain relief and mobility improvement."
  },
  {
    id: "service-marcus-sports-60",
    therapistId: "therapist-marcus-lee",
    name: "Sports Massage",
    durationMins: 60,
    price: 15000,
    description: "Sports-focused session for tightness, soreness, and post-training recovery."
  },
  {
    id: "service-marcus-deep-90",
    therapistId: "therapist-marcus-lee",
    name: "Deep Tissue Massage",
    durationMins: 90,
    price: 19000,
    description: "Higher-pressure treatment suited to chronic muscular tension."
  },
  {
    id: "service-sophia-relax-60",
    therapistId: "therapist-sophia-ng",
    name: "Relaxation Massage",
    durationMins: 60,
    price: 13500,
    description: "Gentle, restorative mobile massage designed for stress relief."
  }
];

export const weeklyAvailability: Availability[] = [
  { therapistId: "therapist-lena-hart", dayOfWeek: 1, startTime: "09:00", endTime: "17:00", isActive: true },
  { therapistId: "therapist-lena-hart", dayOfWeek: 3, startTime: "10:00", endTime: "18:00", isActive: true },
  { therapistId: "therapist-lena-hart", dayOfWeek: 5, startTime: "12:00", endTime: "20:00", isActive: true },
  { therapistId: "therapist-marcus-lee", dayOfWeek: 2, startTime: "08:00", endTime: "16:00", isActive: true },
  { therapistId: "therapist-marcus-lee", dayOfWeek: 4, startTime: "11:00", endTime: "20:00", isActive: true },
  { therapistId: "therapist-marcus-lee", dayOfWeek: 6, startTime: "09:00", endTime: "14:00", isActive: true },
  { therapistId: "therapist-sophia-ng", dayOfWeek: 1, startTime: "12:00", endTime: "19:00", isActive: true },
  { therapistId: "therapist-sophia-ng", dayOfWeek: 4, startTime: "09:00", endTime: "17:00", isActive: true },
  { therapistId: "therapist-sophia-ng", dayOfWeek: 0, startTime: "10:00", endTime: "15:00", isActive: true }
];

export const demoBookings: BookingRecord[] = [
  {
    id: "booking-demo-1",
    customerName: "Alicia Moran",
    customerPhone: "+61400111222",
    customerEmail: "alicia@example.com",
    therapistId: "therapist-lena-hart",
    serviceId: "service-lena-remedial-90",
    datetime: "2026-04-08T10:00:00.000Z",
    address: "12 Gouger St, Adelaide SA",
    totalAmount: 18500,
    platformFee: 2775,
    status: "CONFIRMED"
  },
  {
    id: "booking-demo-2",
    customerName: "Ben Carter",
    customerPhone: "+61400999888",
    therapistId: "therapist-marcus-lee",
    serviceId: "service-marcus-sports-60",
    datetime: "2026-04-09T07:30:00.000Z",
    address: "18 O'Connell St, North Adelaide SA",
    totalAmount: 15000,
    platformFee: 2250,
    status: "PENDING"
  }
];

export function getTherapistById(id: string) {
  return therapists.find((therapist) => therapist.id === id);
}

export function getServicesForTherapist(therapistId: string) {
  return services.filter((service) => service.therapistId === therapistId);
}

export function getServiceById(id: string) {
  return services.find((service) => service.id === id);
}

export function getAvailabilityForTherapist(therapistId: string) {
  return weeklyAvailability.filter((slot) => slot.therapistId === therapistId && slot.isActive);
}
