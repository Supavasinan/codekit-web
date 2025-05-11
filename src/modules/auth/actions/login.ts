"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import type { z } from "zod";
import { LoginFormSchema } from "../schema/login";
import { isUserEmailExists } from "../utils/user";

export const onSubmitLogin = async (
  values: z.infer<typeof LoginFormSchema>
) => {
  const validatedFields = LoginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const isUserExists = await isUserEmailExists(email);

  if (!isUserExists) {
    return { error: "Invalid email or password. Please try again." };
  }

  try {
    await auth.api.signInEmail({
      body: {
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
