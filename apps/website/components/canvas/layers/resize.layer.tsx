"use client";
import { useEffect } from "react";
import type { Props as CanvasProps } from "../canvas";
import { setSize } from "../canvas.api";

type Props = {
  ref: CanvasProps["ref"];
};

const handleResize = (ref: Props["ref"]) => {
  const current = ref?.current;
  if (!current) return;
  const parent = current.parentElement;
  if (!parent) return;
  const width = parent.clientWidth;
  const height = parent.clientHeight;
  current.width = width;
  current.height = height;
  setSize(width, height);
};

export default function ({ ref }: Props) {
  useEffect(() => {
    handleResize(ref);
  }, []);
  return null;
}
