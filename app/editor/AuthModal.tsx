import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { signInAction, forgotPasswordAction } from "../actions";

export default function AuthModal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<"signIn" | "signUp" | "forgotPassword">("signIn");

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(!!user);
    };

    checkUser();
  }, []);

  if (isLoggedIn) return null;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {view === "signIn"
            ? "Sign In"
            : view === "signUp"
            ? "Sign Up"
            : "Reset Password"}
        </DialogTitle>
        <DialogDescription>
          {view === "signIn" && (
            <>
              Don’t have an account?{" "}
              <Button
                variant="link"
                className="text-foreground font-medium underline"
                onClick={() => setView("signUp")}
              >
                Sign up
              </Button>
              <br />
              Forgot your password?{" "}
              <Button
                variant="link"
                className="text-foreground font-medium underline"
                onClick={() => setView("forgotPassword")}
              >
                Reset it
              </Button>
            </>
          )}
          {view === "signUp" && (
            <>
              Already have an account?{" "}
              <Button
                variant="link"
                className="text-foreground font-medium underline"
                onClick={() => setView("signIn")}
              >
                Sign in
              </Button>
            </>
          )}
          {view === "forgotPassword" && (
            <>
              Remembered your password?{" "}
              <Button
                variant="link"
                className="text-foreground font-medium underline"
                onClick={() => setView("signIn")}
              >
                Sign in
              </Button>
            </>
          )}
        </DialogDescription>
      </DialogHeader>

      {view === "signIn" && (
        <form className="flex-1 flex flex-col min-w-64">
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
            <DialogFooter>
              <SubmitButton pendingText="Signing In..." formAction={signInAction}>
                Sign in
              </SubmitButton>
            </DialogFooter>
          </div>
        </form>
      )}

      {view === "signUp" && (
        <form className="flex-1 flex flex-col min-w-64">
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Create a password"
              required
            />
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              type="password"
              name="confirm-password"
              placeholder="Re-enter your password"
              required
            />
            <DialogFooter>
              <SubmitButton pendingText="Signing Up...">
                Sign up
              </SubmitButton>
            </DialogFooter>
          </div>
        </form>
      )}

      {view === "forgotPassword" && (
        <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <DialogFooter>
              <SubmitButton formAction={forgotPasswordAction}>
                Reset Password
              </SubmitButton>
            </DialogFooter>
          </div>
        </form>
      )}
    </DialogContent>
  );
}
