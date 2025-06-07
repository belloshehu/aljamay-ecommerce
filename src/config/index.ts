export const NEXT_PUBLIC_PROD_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PROD_BASE_URL
    : "http://localhost:3000";
