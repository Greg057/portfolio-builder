"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { RocketIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DeployButton() {
  const [slug, setSlug] = useState("john-doe");
  const [error, setError] = useState("");
  const [isDeployed, setIsDeployed] = useState(false);
  const [existingSlug, setExistingSlug] = useState("");
  const slugRegex = /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;

  useEffect(() => {
    const checkDeploymentStatus = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("portfolio_data")
          .select("slug, is_deployed")
          .eq("user_id", user.id)
          .single();

        if (!error && data?.is_deployed) {
          setIsDeployed(true);
          setExistingSlug(data.slug);
        }
      }
    };

    checkDeploymentStatus();
  }, []);

  const handleSlugValidation = () => {
    if (!slug) {
      setError("Slug cannot be empty.");
      return false;
    }

    if (!slugRegex.test(slug)) {
      setError(
        "Invalid slug format. Use only letters, numbers, and dashes (e.g., my-portfolio)."
      );
      return false;
    }

    if (slug.length > 50) {
      setError("Slug is too long. Maximum 50 characters.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSlugSubmit = async () => {
    if (!handleSlugValidation()) return;

    const supabase = createClient();

    // Check slug availability
    const { data, error } = await supabase
      .from("portfolio_data")
      .select("slug")
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") {
      setError("An error occurred while checking slug availability.");
      return;
    }

    if (data) {
      setError("Slug is already in use. Please choose another one.");
      return;
    }

    await deployPortfolio(slug); // Proceed with deployment
  };

  const deployPortfolio = async (slug: string) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to deploy your portfolio.");
      return;
    }

    const { error } = await supabase
      .from("portfolio_data")
      .update({ is_deployed: true, slug, deployed_at: new Date().toISOString() })
      .eq("user_id", user.id);

    if (error) {
      setError("Failed to deploy portfolio.");
    } else {
      console.log("Portfolio deployed successfully!");
      window.open(`/portfolio/${slug}`, "_blank");
    }
  };

  const handleButtonClick = () => {
    if (isDeployed) {
      window.open(`/portfolio/${existingSlug}`, "_blank");
    }
  };

  return (
    <>
      {isDeployed ? (
        <Button onClick={handleButtonClick}>
          <RocketIcon className="w-4 h-4 mr-2" />
          Deploy
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <RocketIcon className="w-4 h-4 mr-2" />
              Deploy
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Choose your Portfolio Name</DialogTitle>
              <DialogDescription>
                Input your desired portfolio name. No spaces.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="col-span-3"
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <DialogFooter>
              <Button onClick={handleSlugSubmit}>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
