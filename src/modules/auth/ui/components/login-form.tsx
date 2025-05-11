"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createAuthClient } from "better-auth/client";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Icons } from "@/components/icons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { onSubmitLogin } from "../../actions/login";
import { LoginFormSchema } from "../../schema/login";
import { AuthWrapper } from "./auth-wrapper";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";

type FormValues = z.infer<typeof LoginFormSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await onSubmitLogin(values);

      if (response?.error) {
        setError(response.error);
        form.setError("root", {
          message: response.error,
        });
      } else {
        router.push(DEFAULT_LOGIN_REDIRECT);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const signinWithGoogle = async () => {
    const authClient = createAuthClient();

    void (await authClient.signIn.social({
      provider: "google",
    }));
  };

  return (
    <AuthWrapper
      headerLabel="ยินดีต้อนรับ"
      headerDescription="เข้าสู่ระบบ ZeroDay ทันที"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>อีเมล</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      type="email"
                      placeholder="codekit@zeroday.com"
                      disabled={isLoading}
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>รหัสผ่าน</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-muted-foreground underline-offset-2 hover:underline"
                  >
                    ลืมรหัสผ่าน?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      disabled={isLoading}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={togglePasswordVisibility}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "เข้าสู่ระบบ"
            )}
          </Button>
        </form>
      </Form>

      <div className="space-y-4 mt-6">
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative bg-background z-10 px-2 text-muted-foreground">
            หรือเข้าสู่ระบบด้วย
          </span>
        </div>
        <Button onClick={signinWithGoogle} variant="outline" className="w-full">
          <Icons.google />
          <span>Signup with Google</span>
          <span className="sr-only">เข้าสู่ระบบด้วย Google</span>
        </Button>
        <div className="text-center text-sm mt-2">
          ยังไม่มีบัญชี ?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            สมัครสมาชิก
          </Link>
        </div>
      </div>
    </AuthWrapper>
  );
};
