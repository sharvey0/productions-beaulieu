const requestsCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(id: string, maxRequests = 2, windowMs = 3600000) {
    const now = Date.now();
    const record = requestsCounts.get(id);

    if (!record || now > record.resetTime) {
        requestsCounts.set(id, {
            count: 1,
            resetTime: now + windowMs
        });

        return true;
    }

    if (record.count >= maxRequests) {
        return false;
    }

    record.count++;
    return true;
}

setInterval(() => {
    const now = Date.now();
    for (const [key, value] of requestsCounts.entries()) {
        if (now > value.resetTime) {
            requestsCounts.delete(key);
        }
    }
}, 3600000);