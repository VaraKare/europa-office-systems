/**
 * Best-effort, in-memory sliding-window rate limiter.
 * On serverless hosts each instance has its own memory, so this slows casual abuse but is
 * not a hard guarantee. For stronger protection, add a shared store (e.g. Upstash Redis)
 * or a bot challenge such as Cloudflare Turnstile.
 */
const hits = new Map<string, number[]>()

export function rateLimit(key: string, limit = 8, windowMs = 10 * 60 * 1000, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return { allowed: false, retryAfterSec: Math.ceil((windowMs - (now - recent[0])) / 1000) }
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k)
  }
  return { allowed: true, retryAfterSec: 0 }
}
