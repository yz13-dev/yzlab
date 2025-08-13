"use client";
import { acceptRequest, getRequests, rejectRequest } from "@yzlab/api";
import { GetRequests200Item } from "@yzlab/api/types";
import { Badge } from "@yzlab/ui/components/badge";
import { Button } from "@yzlab/ui/components/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@yzlab/ui/components/table";
import { CheckIcon, Loader2Icon, XIcon } from "lucide-react";
import { useState } from "react";


export default function ({ requests: defaultRequests = [] }: { requests?: GetRequests200Item[] }) {

  const [requests, setRequests] = useState<GetRequests200Item[]>(defaultRequests);
  const [loading, setLoading] = useState<boolean>(false);

  const accept = async (id: string) => {
    setLoading(true);
    try {
      await acceptRequest(id)
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      const response = await getRequests()

      const requests = response ?? [];

      setRequests(requests);
    }
  }
  const reject = async (id: string) => {
    setLoading(true);
    try {
      await rejectRequest(id)
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      const response = await getRequests()

      const requests = response ?? [];

      setRequests(requests);
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="md:table-cell hidden">Домен</TableHead>
          <TableHead>Ссылка</TableHead>
          <TableHead className="md:table-cell hidden">Название</TableHead>
          <TableHead className="lg:table-cell hidden">Описание</TableHead>
          <TableHead className="md:table-cell hidden">Почта</TableHead>
          <TableHead>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          requests.map(request => {
            const url = new URL(request.url);
            const domain = url.hostname;

            const title = request.name || "Не указано";
            const description = request.description || "Не указано";

            const email = request.email || "Не указано";

            return <TableRow key={request.id}>
              <TableCell className="md:table-cell hidden">{domain}</TableCell>
              <TableCell>{url.toString()}</TableCell>
              <TableCell className="md:table-cell hidden">{title}</TableCell>
              <TableCell className="lg:table-cell hidden">{description}</TableCell>
              <TableCell className="md:table-cell hidden">
                {
                  email &&
                  <Badge variant="secondary">{email}</Badge>
                }
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    disabled={loading}
                    variant="secondary"
                    size="sm"
                    className="text-xs h-6"
                    onClick={() => accept(String(request.id))}
                  >
                    {
                      loading
                        ? <Loader2Icon className="animate-spin" />
                        : <CheckIcon />
                    }
                    Принять
                  </Button>
                  <Button
                    disabled={loading}
                    variant="destructive"
                    className="size-6"
                    onClick={() => reject(String(request.id))}
                  >
                    {
                      loading
                        ? <Loader2Icon className="animate-spin" />
                        : <XIcon />
                    }
                    <span className="sr-only">Отклонить</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          })
        }
      </TableBody>
    </Table>
  )
}
