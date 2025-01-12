"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function AuthModal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const redirectToSignIn = () => {
    window.location.href = "/sign-in"
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Sign In to Save</DialogTitle>
        <DialogDescription>
          You need to sign in in order to save your portfolio.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={redirectToSignIn}>Continue</Button>
      </DialogFooter>
    </DialogContent>
  );
}
