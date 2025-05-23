"use client";

import Canvas from "@/components/canvas";
import { RefObject, useRef } from "react";
import DprLayer from "./layers/dpr.layer";
import RenderLayer from "./layers/render.layer";
import ResizeLayer from "./layers/resize.layer";

export type Props = {
  ref: RefObject<HTMLCanvasElement | null>;
};

export default function () {
  const ref = useRef<HTMLCanvasElement>(null);
  return (
    <>
      <RenderLayer ref={ref} />
      <DprLayer />
      <ResizeLayer ref={ref} />
      <Canvas id="root-canvas" ref={ref} />
    </>
  );
}
