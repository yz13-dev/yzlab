import Header from "@/components/header";
import { getRequests } from "rest-api/requests";
import List from "./components/list";

export default async function () {

  const { data } = await getRequests();

  const requests = data ?? [];

  return (
    <>
      <Header />
      <div className="w-full max-w-screen-2xl px-6 py-12 flex mx-auto justify-center flex-col gap-10">
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-4xl font-semibold">
            Запросы
          </h1>
          <p className="text-lg text-muted-foreground">
            Проверьте, стоит ли добавить сайт в индекс.
          </p>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="bg-card border rounded-lg overflow-hidden">
          <List requests={requests} />
        </div>
      </div>
    </>
  )
}
