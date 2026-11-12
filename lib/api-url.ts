export function getApiBaseUrl() {
  const host = process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL ?? "localhost:3000";
  return `${process.env.VERCEL ? "https" : "http"}://${host}`;
}
