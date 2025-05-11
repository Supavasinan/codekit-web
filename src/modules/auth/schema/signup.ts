import { z } from "zod";

export const SignUpFormSchema = z.object({
  name: z.string().min(2, { message: "ชื่อผู้ใช้ต้องมากกว่า 2 ตัวอักษร" }),
  email: z.string().email({ message: "อีเมลของคุณไม่ถูกต้อง" }),
  password: z
    .string()
    .min(8, { message: "รหัสผ่านต้องมากกว่า 8 ตัวอักษร" }),
});
