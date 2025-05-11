"use server";

import { auth } from "@/lib/auth";
import type { z } from "zod";
import { SignUpFormSchema } from "../schema/signup";
import { APIError } from "better-auth/api";

export const onSubmitSignUp = async (
  values: z.infer<typeof SignUpFormSchema>
) => {
  const validatedFields = SignUpFormSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };
  const { name, email, password } = validatedFields.data;

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        error: error.message,
      };
    }
  }
};
