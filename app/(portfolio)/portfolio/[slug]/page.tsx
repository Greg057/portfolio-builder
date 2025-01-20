import { createClient } from "@/utils/supabase/client";
import PortfolioDisplay from "./PortfolioDisplay";

export default async function Portfolio({
  params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug

    const supabase = createClient();
    const { data, error } = await supabase
        .from("portfolio_data")
        .select("user_id")
        .eq("slug", slug)
        .single();

    if (error || !data) return null;

    const userId = data.user_id

    return (
        <PortfolioDisplay userId={userId} />
    );
}


