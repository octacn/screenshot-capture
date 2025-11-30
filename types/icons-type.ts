import z from "zod";

export const iconStack = z.enum([
  "logo",
  "nextjs",
  "laptop",
  "sun",
  "moon",
  "github",
  "linkedin",
  "twitter",
  "instagram",
]);

export type IconStack = z.infer<typeof iconStack>;
