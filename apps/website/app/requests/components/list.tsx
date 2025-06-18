"use client";
import { CheckIcon, Loader2Icon, XIcon } from "lucide-react";
import { useState } from "react";
import { acceptRequest, getRequests, rejectRequest } from "rest-api/requests";
import type { Requests } from "rest-api/types/requests";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "ui/components/table";


export default function ({ requests: defaultRequests = [] }: { requests?: Requests[] }) {

  const [requests, setRequests] = useState<Requests[]>(defaultRequests);
  const [loading, setLoading] = useState<boolean>(false);

  const accept = async (id: string) => {
    setLoading(true);
    try {
      await acceptRequest(id)
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      const { data: newRequests } = await getRequests()
      setRequests(newRequests ?? []);
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
      const { data: newRequests } = await getRequests()
      setRequests(newRequests ?? []);
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
