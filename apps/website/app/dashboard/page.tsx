import { Logo } from "@/components/logo";

export default function page() {
  return (
    <>
      <div className="p-2 w-full h-fit">
        <div className="w-full h-full flex bg-secondary/60 items-center justify-between rounded-xl border p-2">
          <div className="h-full p-2 rounded-xl bg-secondary border flex items-center justify-center">
            <Logo size={22} type="full" />
          </div>
          <div className="size-10 rounded-full border bg-secondary"></div>
        </div>
      </div>
    </>
  );
}
