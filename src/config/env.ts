export const env = {
  appUrl:
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",

  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:9000/api/v1",
} as const;
