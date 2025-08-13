"use client"
import { getOgs, getSites } from "@yzlab/api";
import { GetOgs200Item, SitesItem } from "@yzlab/api/types";
import { Button } from "@yzlab/ui/components/button";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import OgCard from "./og-card";
import SiteCard from "./site-card";

export default function ({ defaultLinks = [], type = "site" }: { defaultLinks?: (SitesItem | GetOgs200Item)[], type: "og" | "site" }) {

  const [loading, setLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState(0)
  const [links, setLinks] = useState<(SitesItem | GetOgs200Item)[]>(defaultLinks ?? [])

  const [end, setEnd] = useState<boolean>(false)

  const fetchExtraLinks = async () => {
    setLoading(true)
    try {
      const newOffset = offset + 16;


      const data = await (type === "og"
        ? getSites({ blur: "true", offset: String(newOffset) })
        : getOgs({ blur: "true", offset: String(newOffset) })
      )

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
        links.map((link, index) => {
          const linkId = link.id;
          const key = `${linkId}-${index}`
          if (type === "site") return <SiteCard key={key} link={link} />
          return <OgCard key={key} link={link} />
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
