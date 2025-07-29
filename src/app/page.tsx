import SiteHeader from "@/components/site-header";
import { StatsTable } from "@/components/stats-table";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-8 md:px-8">
        <StatsTable />
      </main>
    </div>
  );
}
