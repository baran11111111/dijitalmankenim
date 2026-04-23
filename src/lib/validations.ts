import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Gecerli bir e-posta adresi girin"),
  password: z.string().min(6, "Sifre en az 6 karakter olmali"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Ad en az 2 karakter olmali"),
    email: z.string().email("Gecerli bir e-posta adresi girin"),
    password: z.string().min(6, "Sifre en az 6 karakter olmali"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((v) => v, "Kullanim sartlarini kabul etmelisiniz"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Sifreler eslesmedi",
    path: ["confirmPassword"],
  });

export const generateSchema = z.object({
  templateId: z.string().min(1, "Sablon secmelisiniz"),
  type: z.enum(["PHOTO", "VIDEO"]),
  category: z.enum(["tops", "bottoms", "one-pieces"]).default("tops"),
  inputImageUrl: z.string().min(1, "Gorsel yuklemelisiniz"), // Base64 desteklemesi icin
});

export const templateSchema = z.object({
  name: z.string().min(1, "Sablon adi gerekli"),
  description: z.string().optional(),
  category: z.string().min(1, "Kategori secin"),
  gender: z.string().min(1, "Cinsiyet secin"),
  pose: z.string().optional(),
  thumbnailUrl: z.string().url(),
  fullImageUrl: z.string().url(),
  videoUrl: z.string().url().optional().or(z.literal("")),
  isVideo: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  active: z.boolean().default(true),
});

export const tokenPurchaseSchema = z.object({
  packageId: z.string().min(1, "Paket secmelisiniz"),
  currency: z.enum(["try", "usd"]).default("try"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type GenerateInput = z.infer<typeof generateSchema>;
export type TemplateInput = z.infer<typeof templateSchema>;
export type TokenPurchaseInput = z.infer<typeof tokenPurchaseSchema>;
