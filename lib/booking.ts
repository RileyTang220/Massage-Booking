import { demoBookings, getServiceById, getTherapistById } from "@/lib/demo-data";

export function calculatePlatformFee(totalAmount: number) {
  return Math.round(totalAmount * 0.15);
}

export function createBookingPreview(input: {
  therapistId: string;
  serviceId: string;
  datetime: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: string;
}) {
  const therapist = getTherapistById(input.therapistId);
  const service = getServiceById(input.serviceId);

  if (!therapist || !service) {
    return null;
  }

  const platformFee = calculatePlatformFee(service.price);

  return {
    id: `preview-${input.therapistId}-${input.serviceId}`,
    therapist,
    service,
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    customerEmail: input.customerEmail,
    datetime: input.datetime,
    address: input.address,
    totalAmount: service.price,
    platformFee,
    therapistAmount: service.price - platformFee
  };
}

export function getBookingById(id: string) {
  const booking = demoBookings.find((item) => item.id === id);
  if (!booking) return null;

  return {
    ...booking,
    therapist: getTherapistById(booking.therapistId),
    service: getServiceById(booking.serviceId)
  };
}
