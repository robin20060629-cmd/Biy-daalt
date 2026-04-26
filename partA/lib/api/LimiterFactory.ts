import { RateLimiter } from "./RateLimiter";
import { FixedWindowLimiter } from "../impl/FixedWindowLimiter";


//  Factory паттерн ашиглан хэрэгжүүлэлтийг нуух

export class LimiterFactory {
    public static createFixedWindow(limit: number): RateLimiter {
        return new FixedWindowLimiter(limit);
    }
}