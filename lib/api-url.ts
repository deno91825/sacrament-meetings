export function getApiBaseUrl() { return `${process.env.VERCEL ? "https" : "http"}://${process.env.VERCEL_URL ?? "localhost:3000"}`; }
