import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/router";

export const useSignOut = () => {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return signOut;
};
