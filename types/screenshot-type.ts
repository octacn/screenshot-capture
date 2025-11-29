import z from "zod";

export const imageType = z.enum(["png", "jpeg", "webp"]).default("png");

export const theme = z.enum(["light", "dark"]).default("dark");

export const ScreenshotSchema = z.object({
  url: z.string().url(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  imageType: imageType.optional(),
  theme: theme,
});

export const ScreenshotResponseSchema = z.object({
  image: z.instanceof(Buffer),
});

export type ScreenshotResponse = z.infer<typeof ScreenshotResponseSchema>;
export type ScreenshotSchema = z.infer<typeof ScreenshotSchema>;
export type ImageType = z.infer<typeof imageType>;
export type Theme = z.infer<typeof theme>;
