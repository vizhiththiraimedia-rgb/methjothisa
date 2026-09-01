"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { useToast } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      await registerUser({ email: data.email, password: data.password, name: data.name });
      addToast({ title: "Account created!", description: "Welcome to Methjothisa", variant: "success" });
      router.push("/dashboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      setServerError(message);
      addToast({ title: "Registration Failed", description: message, variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-foreground flex items-center justify-center shadow-md">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </Link>
            <h1 className="text-3xl font-display font-bold text-primary">Create Account</h1>
            <p className="text-muted-foreground mt-2">Join Methjothisa and unlock your cosmic destiny</p>
          </div>
          <Card className="border-border shadow-xl">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Get started with your free account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input label="Full Name" {...register("name")} error={errors.name?.message} required />
                <Input label="Email" type="email" {...register("email")} error={errors.email?.message} required />
                <Input label="Password" type="password" {...register("password")} error={errors.password?.message} required />
                
                {serverError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm font-medium text-center">
                    {serverError}
                  </div>
                )}
                
                <Button type="submit" variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11" isLoading={isLoading}>Create Account</Button>
              </form>
              <div className="mt-6 text-center text-sm font-medium text-muted-foreground">
                Already have an account? <Link href="/login" className="text-primary hover:underline font-bold ml-1">Sign in</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


