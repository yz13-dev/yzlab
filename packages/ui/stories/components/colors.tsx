"use client"
import * as React from "react"

export default function Colors() {
  return (
    <div className="w-[400px] flex flex-row gap-4 *:grid *:gap-2">
      <div className="w-full *:[&>span]:font-medium *:[&>span]:p-2">
        <div className="h-14 w-full bg-neutral-50">
          <span>Neutral-50</span>
        </div>
        <div className="h-14 w-full bg-neutral-100">
          <span>Neutral-100</span>
        </div>
        <div className="h-14 w-full bg-neutral-200">
          <span>Neutral-200</span>
        </div>
        <div className="h-14 w-full bg-neutral-300">
          <span>Neutral-300</span>
        </div>
        <div className="h-14 w-full bg-neutral-400">
          <span>Neutral-400</span>
        </div>
        <div className="h-14 w-full bg-neutral-500">
          <span>Neutral-500</span>
        </div>
        <div className="h-14 w-full bg-neutral-600">
          <span>Neutral-600</span>
        </div>
        <div className="h-14 w-full bg-neutral-700">
          <span>Neutral-700</span>
        </div>
        <div className="h-14 w-full bg-neutral-800">
          <span>Neutral-800</span>
        </div>
        <div className="h-14 w-full bg-neutral-900">
          <span>Neutral-900</span>
        </div>
      </div>
    </div>
  )
}
