import Dock from "../(root)/components/dock/dock";
import SmallSearchBar from "../(root)/components/small-search-bar";

type PageProps = {
  searchParams: Promise<{
    text?: string;
  }>;
};
export default async function page({ searchParams }: PageProps) {
  const { text = "" } = await searchParams;
  return (
    <>
      <header className="w-full py-4 border-b">
        <div className="max-w-screen-2xl w-full mx-auto px-6 flex items-center justify-between">
          <SmallSearchBar defaultValue={text} />
          <div className="size-[46px] bg-secondary rounded-full border" />
        </div>
      </header>
      <div className="max-w-screen-2xl divide-x w-full mx-auto flex px-6">
        <div className="w-1/3"></div>
        <div className="w-2/3"></div>
      </div>
    </>
  );
}
