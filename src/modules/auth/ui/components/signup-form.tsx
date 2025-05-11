"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckIcon,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { createAuthClient } from "better-auth/client";
import { onSubmitSignUp } from "../../actions/signup";
import { SignUpFormSchema } from "../../schema/signup";
import { AuthWrapper } from "./auth-wrapper";

const formSchema = SignUpFormSchema;
type FormValues = z.infer<typeof formSchema>;

export const SignupForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const strengthRequirementsMet = strength.every((req) => req.met);
    if (!strengthRequirementsMet) {
      setError("Password does not meet strength requirements.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await onSubmitSignUp(values);

      if (response?.error) {
        setError(response.error);
        form.setError("root", {
          message: response.error,
        });
      } else {
        form.reset();
        router.push(DEFAULT_LOGIN_REDIRECT);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const signinWithGoogle = async () => {
    try {
      const authClient = createAuthClient();
      await authClient.signIn.social({
        provider: "google",
      });
    } catch {
      setError("Google sign-in failed. Please try again.");
    }
  };

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "อย่างน้อย 8 ตัวอักษร" },
      { regex: /[0-9]/, text: "อย่างน้อย 1 ตัวเลข" },
      { regex: /[a-z]/, text: "ตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว" },
      { regex: /[A-Z]/, text: "ตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const password = form.watch("password");
  const strength = useMemo(() => checkStrength(password), [password]);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <AuthWrapper
      headerLabel="สร้างบัญชีใหม่"
      headerDescription="สร้างบัญชีของคุณเพื่อเข้าสู่ ZeroDay"
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อผู้ใช้งาน</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      placeholder="Codekit Competition"
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
                <FormLabel>รหัสผ่าน</FormLabel>
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
          <div
            className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full"
            role="progressbar"
            aria-valuenow={strengthScore}
            aria-valuemin={0}
            aria-valuemax={4}
            aria-label="Password strength"
          >
            <div
              className={`h-full ${getStrengthColor(
                strengthScore
              )} transition-all duration-500 ease-out`}
              style={{ width: `${(strengthScore / 4) * 100}%` }}
            ></div>
          </div>
          <ul className="space-y-1.5" aria-label="Password requirements">
            {strength.map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                {req.met ? (
                  <CheckIcon
                    size={16}
                    className="text-emerald-500"
                    aria-hidden="true"
                  />
                ) : (
                  <XIcon
                    size={16}
                    className="text-muted-foreground/80"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`text-xs ${
                    req.met ? "text-emerald-600" : "text-muted-foreground"
                  }`}
                >
                  {req.text}
                  <span className="sr-only">
                    {req.met ? " - Requirement met" : " - Requirement not met"}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "สร้างบัญชี"
            )}
          </Button>
        </form>
      </Form>

      <div className="space-y-4 mt-6">
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative bg-background z-10 px-2 text-muted-foreground">
            หรือดำเนินการต่อด้วย
          </span>
        </div>
        {/* <Button onClick={signinWithGoogle} variant="outline" className="w-full">
          <Icons.google />
          <span>เข้าสู่ระบบด้วย Google</span>
          <span className="sr-only">Signup with Google</span>
        </Button> */}
        <div className="text-center text-sm mt-2">
          มีบัญชีอยู่แล้ว ?{" "}
          <Link href="/login" className="text-primary hover:underline">
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </AuthWrapper>
  );
};
