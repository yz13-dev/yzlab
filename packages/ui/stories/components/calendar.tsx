"use client";

import React from "react";
import { Calendar } from "../../src/components/ui/calendar";

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date[] | undefined>([]);
  return (
    <div className="w-80">
      <Calendar
        mode="multiple"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
}
