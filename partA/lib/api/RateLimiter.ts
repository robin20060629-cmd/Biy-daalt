
// Rate Limiter интерфейс.
// Системд хэт их хүсэлт ирэхээс хамгаална.

export interface RateLimiter {
    
    //   @param clientId Хэрэглэгчийн өгөгдөл
    //  @returns true бол зөвшөөрнө, false бол хязгаарлана
    isAllowed(clientId: string): boolean;
}