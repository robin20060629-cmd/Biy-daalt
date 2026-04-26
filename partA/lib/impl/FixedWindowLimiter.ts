import { RateLimiter } from "../api/RateLimiter";

// Fixed Window алгоритмын хэрэгжүүлэлт.
// Энэ класс нь public биш бөгөөд зөвхөн сан дотроо ашиглагдана

export class FixedWindowLimiter implements RateLimiter {
    private requests = new Map<string, number>();

    constructor(private limit: number) {}

    isAllowed(clientId: string): boolean {
        const count = this.requests.get(clientId) || 0;
        if (count < this.limit) {
            this.requests.set(clientId, count + 1);
            return true;
        }
        return false;
    }
}