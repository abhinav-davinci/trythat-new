import { TopNav } from "../_components/TopNav";
import { MyInterestsBody, type TabKey } from "./MyInterestsBody";

export default async function MyInterestsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const initialTab: TabKey =
    params.tab === "contacted" ? "contacted" : "favourite";

  return (
    <div className="min-h-screen w-full bg-white text-[#0b1856]">
      <TopNav active="my-interests" />
      <MyInterestsBody initialTab={initialTab} />
    </div>
  );
}
