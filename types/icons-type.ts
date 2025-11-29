import z from "zod";

export const iconStack = z.enum(["logo", "nextjs", "laptop", "sun", "moon"]);

export type IconStack = z.infer<typeof iconStack>;
