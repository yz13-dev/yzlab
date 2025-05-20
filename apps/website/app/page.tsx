import { Logo } from "@/components/logo";

export default function page() {
  return (
    <div className="flex gap-8 flex-col items-center justify-center h-dvh">
      <Logo size={128} type="full" />
      <h1 className="text-2xl font-semibold">Скоро...</h1>
    </div>
  );
}
