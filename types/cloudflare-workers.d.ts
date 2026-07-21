declare global {
  type D1Database = any;
  type Fetcher = any;
  type ScheduledController = any;
}

declare module "cloudflare:workers" {
  export const env: any;
}

export {};
