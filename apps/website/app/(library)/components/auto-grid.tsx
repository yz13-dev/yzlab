"use client"

import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { getRootLinksWithOgs } from "rest-api/links";
import type { DomainLinkWithBlur } from "rest-api/types/domains";
import { Button } from "ui/components/button";
import OgCard from "./og-card";
import SiteCard from "./site-card";

export default function ({ defaultLinks = [], type = "site" }: { defaultLinks?: DomainLinkWithBlur[], type: "og" | "site" }) {

  const [loading, setLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState(0)
  const [links, setLinks] = useState<DomainLinkWithBlur[]>(defaultLinks ?? [])

  const [end, setEnd] = useState<boolean>(false)

  const fetchExtraLinks = async () => {
    setLoading(true)
    try {
      const newOffset = offset + 16

      const { data } = await (type === "og" ? getRootLinksWithOgs(true, newOffset) : getRootLinksWithOgs(true, newOffset))

      const newLinks = data ?? []

      if (newLinks.length !== 0) {
        setLinks((prev) => [...prev, ...newLinks])
        setOffset(newOffset)
        if (newLinks.length < 15) {
          setEnd(true)
        }
      } else {
        setEnd(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {
        links.map(link => {
          const linkId = link.id;
          if (type === "site") return <SiteCard key={linkId} link={link} />
          return <OgCard key={linkId} link={link} />
        })
      }
      <div className="w-full col-span-full items-center justify-center flex">
        <Button variant="secondary" onClick={fetchExtraLinks} disabled={loading || end}>
          {loading && <Loader2Icon className="animate-spin" />}
          {
            end ?
              "Вы дошли до конца списка" :
              "Загрузить еще"
          }
        </Button>
      </div>
    </>
  )
}
