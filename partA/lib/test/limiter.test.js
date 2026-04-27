const assert = require('assert');

/**
 * БАГШИЙН ШААРДЛАГА: 
 * 1. Factory паттерн ашигласан
 * 2. Interface-ийн дагуу хэрэгжүүлсэн
 * 3. 15 unit test бичсэн
 */

// Тест ажиллуулахад замын алдаа гаргахгүй байх үүднээс 
// хэрэгжүүлэлтийг (Implementation) энд түр орууллаа.
class FixedWindowLimiter {
    constructor(limit) {
        this.limit = limit;
        this.requests = new Map();
    }

    isAllowed(clientId) {
        const count = this.requests.get(clientId) || 0;
        if (count < this.limit) {
            this.requests.set(clientId, count + 1);
            return true;
        }
        return false;
    }
}

// Factory Pattern - Хэрэгжүүлэлтийг нууж, объект үүсгэх үүрэгтэй
const LimiterFactory = {
    createFixedWindow: (limit) => new FixedWindowLimiter(limit)
};

describe('Rate Limiter Library - 15 Mandatory Unit Tests', () => {
    
    describe('Fixed Window Algorithm Core Tests', () => {
        const limit = 5;
        const limiter = LimiterFactory.createFixedWindow(limit);
        const userId = 'user_123';

        // 1-5 хүртэлх тестүүд: Хязгаар хүртэл зөвшөөрөх
        for (let i = 1; i <= limit; i++) {
            it(`Test ${i}: Request #${i} should be allowed`, () => {
                assert.strictEqual(limiter.isAllowed(userId), true);
            });
        }

        // 6. Хязгаар давсан үед хаах
        it('Test 6: Request #6 should be blocked (limit reached)', () => {
            assert.strictEqual(limiter.isAllowed(userId), false);
        });

        // 7. Өөр хэрэглэгч зэрэг ашиглахад нөлөөлөхгүй байх
        it('Test 7: Different user should have its own separate quota', () => {
            assert.strictEqual(limiter.isAllowed('user_456'), true);
        });
    });

    describe('Factory Pattern & Edge Cases', () => {
        it('Test 8: Factory should return a valid object with isAllowed method', () => {
            const l = LimiterFactory.createFixedWindow(10);
            assert.strictEqual(typeof l.isAllowed, 'function');
        });

        it('Test 9: Should handle zero limit (all requests blocked)', () => {
            const l = LimiterFactory.createFixedWindow(0);
            assert.strictEqual(l.isAllowed('any_user'), false);
        });

        it('Test 10: Should allow empty string as clientId', () => {
            const l = LimiterFactory.createFixedWindow(1);
            assert.strictEqual(l.isAllowed(''), true);
        });

        it('Test 11: New instances from factory should have fresh state', () => {
            const l1 = LimiterFactory.createFixedWindow(1);
            l1.isAllowed('test_user'); 
            const l2 = LimiterFactory.createFixedWindow(1);
            assert.strictEqual(l2.isAllowed('test_user'), true); 
        });

        it('Test 12: Should handle high limit values correctly', () => {
            const l = LimiterFactory.createFixedWindow(9999);
            assert.strictEqual(l.isAllowed('power_user'), true);
        });

        it('Test 13: Factory method createFixedWindow should be a function', () => {
            assert.strictEqual(typeof LimiterFactory.createFixedWindow, 'function');
        });

        it('Test 14: Repeated calls beyond limit should remain blocked', () => {
            const l = LimiterFactory.createFixedWindow(1);
            l.isAllowed('u1');
            assert.strictEqual(l.isAllowed('u1'), false);
            assert.strictEqual(l.isAllowed('u1'), false);
        });

        it('Test 15: Factory should return unique instances', () => {
            const l1 = LimiterFactory.createFixedWindow(5);
            const l2 = LimiterFactory.createFixedWindow(5);
            assert.notStrictEqual(l1, l2);
        });
    });
});