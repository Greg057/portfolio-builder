import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6")}
      >
        <TooltipProvider delayDuration={0}>
            {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
