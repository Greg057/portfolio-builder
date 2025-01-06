import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

// Fetch portfolio data based on the slug
export default async function PortfolioPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Fetch portfolio data
  const portfolio = await fetchPortfolioBySlug(slug);

  if (!portfolio) {
    return notFound(); // Handle 404 if the portfolio doesn't exist
  }

  return (
    <div>
      <h1>Portfolio for {portfolio.ownerName}</h1>
      {/* Render portfolio data */}
    </div>
  );
}

async function fetchPortfolioBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("portfolio_data")
    .select("user_id, primary_color, secondary_color")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  // Fetch user information
  const { data: userInfo, error: userError } = await supabase
    .from("personal_info")
    .select("full_name")
    .eq("user_id", data.user_id)
    .single();

  if (userError || !userInfo) return null;

  return {
    ...data,
    ownerName: userInfo.full_name,
  };
}
