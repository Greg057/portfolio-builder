import PortfolioDisplay from "./PortfolioDisplay";

export default async function Portfolio({
  params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug

    return (
        <PortfolioDisplay slug={slug} />
    );
}


