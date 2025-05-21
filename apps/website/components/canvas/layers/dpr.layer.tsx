"use client";

import { useEffect } from "react";
import { setDpr } from "../canvas.api";

export default function () {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateDPR = () => {
        setDpr(window.devicePixelRatio);
      };

      setDpr(window.devicePixelRatio);

      const mediaQuery = window.matchMedia(
        `(resolution: ${window.devicePixelRatio}dppx)`,
      );

      mediaQuery.addEventListener("change", updateDPR);

      return () => {
        mediaQuery.removeEventListener("change", updateDPR);
      };
    }
  }, []);
  return null;
}
