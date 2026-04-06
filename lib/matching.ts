import { getServicesForTherapist, therapists, type Therapist } from "@/lib/demo-data";

export type MatchRequest = {
  serviceType: string;
  datetime: string;
  address: string;
  budget?: number;
  lat?: number;
  lng?: number;
};

export type MatchResult = {
  therapist: Therapist;
  distanceKm: number;
  score: number;
  matchedServiceNames: string[];
};

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const earthRadiusKm = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

function normalizeBudgetScore(price: number, budget?: number) {
  if (!budget) return 1;
  if (price <= budget) return 1;
  return Math.max(0.1, budget / price);
}

export function rankTherapists(input: MatchRequest): MatchResult[] {
  const targetLat = input.lat ?? -34.9285;
  const targetLng = input.lng ?? 138.6007;
  const requestedService = input.serviceType.toLowerCase();

  return therapists
    .filter((therapist) => therapist.isVerified)
    .map((therapist) => {
      const distanceKm = haversineKm(targetLat, targetLng, therapist.lat, therapist.lng);
      const therapistServices = getServicesForTherapist(therapist.id);
      const matchedServices = therapistServices.filter((service) =>
        `${service.name} ${service.description} ${therapist.skills.join(" ")}`.toLowerCase().includes(requestedService)
      );
      const cheapestService = therapistServices.reduce((lowest, current) =>
        current.price < lowest.price ? current : lowest
      );
      const skillScore = matchedServices.length > 0 ? 1 : 0.55;
      const ratingScore = therapist.rating / 5;
      const reviewScore = Math.min(1, therapist.reviewCount / 100);
      const distanceScore = Math.max(0.05, 1 - distanceKm / therapist.travelRadiusKm);
      const budgetScore = normalizeBudgetScore(cheapestService.price, input.budget);
      const score =
        distanceScore * 0.4 +
        ratingScore * 0.25 +
        reviewScore * 0.15 +
        skillScore * 0.15 +
        budgetScore * 0.05;

      return {
        therapist,
        distanceKm,
        score,
        matchedServiceNames: (matchedServices.length > 0 ? matchedServices : therapistServices).map(
          (service) => service.name
        )
      };
    })
    .filter((result) => result.distanceKm <= result.therapist.travelRadiusKm)
    .sort((left, right) => right.score - left.score)
    .slice(0, 10);
}
