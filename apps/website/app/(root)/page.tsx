import Header from "@/components/header";
import { Logo } from "@/components/logo";
import { Button } from "ui/components/button";
import { Input } from "ui/components/input";

const isDev = process.env.NODE_ENV === "development";

export default function () {
  if (!isDev) return null;

  return (
    <>
      <Header />

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <div className="border w-full rounded-lg flex flex-col gap-8 items-center justify-center h-96">
          <div className="flex flex-col gap-4">
            <h3 className="text-4xl font-semibold max-w-xl text-center">
              Множество сайтов, ресурсов собранны в одном месте.
            </h3>
            <p className="text-lg text-muted-foreground text-center">
              Сайты, ресуры. Еженедельные обновления.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="user@example.com" />
            <Button variant="default">Подписаться</Button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <div className="w-full py-4 space-y-4 *:px-4 h-fit border outline-8 outline-offset-0 outline-secondary/60 rounded-lg">
          <h3 className="text-2xl font-medium">Секция</h3>
          <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

          </div>
        </div>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <div className="w-full py-4 space-y-4 *:px-4 h-fit border rounded-lg">
          <h3 className="text-2xl font-medium">Секция</h3>
          <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <div className="w-full py-4 space-y-4 *:px-4 h-fit border outline-8 outline-offset-0 outline-secondary/60 rounded-lg">
          <h3 className="text-2xl font-medium">Секция</h3>
          <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="aspect-[640/400] w-full rounded-md border" />
              <div className="flex items-center justify-between">
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="h-5 w-16 rounded-full bg-secondary" />
                </div>
                <div className="w-fit items-center flex gap-2">
                  <div className="size-5 rounded-full bg-secondary" />
                  <div className="size-5 rounded-full bg-secondary" />
                </div>
              </div>
              <div className="h-4 w-1/2 rounded-full bg-secondary" />
            </div>

          </div>
        </div>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <div className="w-full py-4 space-y-4 *:px-4 h-fit border rounded-lg">
          <h3 className="text-2xl font-medium">Секция</h3>
          <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="w-full h-full items-center flex gap-2">
              <div className="size-11 shrink-0 rounded-sm bg-secondary" />
              <div className="w-full h-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="h-5 w-16 rounded-full bg-secondary" />
                  </div>
                  <div className="w-fit items-center flex gap-2">
                    <div className="size-5 rounded-full bg-secondary" />
                    <div className="size-5 rounded-full bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-1/2 rounded-full bg-secondary" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <footer className="w-full max-w-screen-2xl mx-auto">
        <div className="w-full grid md:grid-cols-3 grid-cols-2 *:p-6">
          <div className="w-full h-full">
            <div className="flex flex-col gap-3">
              <Logo size={28} type="full" />
              <span className="text-lg text-muted-foreground">
                Множество сайтов, ресурсов собранны в одном месте.
              </span>
            </div>
          </div>
          <div className="w-full h-full col-span-2">
            <div className="w-full lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid gap-3 *:h-80">
              <div className="w-full h-full bg-secondary" />
              <div className="w-full h-full bg-secondary" />
              <div className="w-full h-full bg-secondary" />
              <div className="w-full h-full bg-secondary" />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
