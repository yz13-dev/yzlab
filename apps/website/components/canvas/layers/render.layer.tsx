"use client";
import useIsDarkMode from "@/hooks/use-dark-mode";
import logoDark from "@/public/logo-full-dark.png";
import logoLight from "@/public/logo-full-light.png";
import { useEffect } from "react";
import type { Props as CanvasProps } from "../canvas";
import { getSize, useCanvasState } from "../canvas.api";

type Props = {
  ref: CanvasProps["ref"];
};

const drawLogo = (ctx: CanvasRenderingContext2D, dark: boolean = false) => {
  const logo = dark ? logoDark : logoLight;
  const img = new Image();
  if (img) {
    img.src = logo.src;
    const height = 28;
    const width = height * 6.5625;
    img.onload = (event) => {
      ctx.drawImage(img, 16, 16, width, height);
    };
  }
};

const getStyle = (variable: string) => {
  const doc = document.documentElement;
  return window.getComputedStyle(doc).getPropertyValue(variable);
};
const preflight = (canvas: HTMLCanvasElement, dpr: number) => {
  const { height, width } = getSize();
  canvas.width = width * dpr;
  canvas.height = height * dpr;
};

const drawText = (ctx: CanvasRenderingContext2D) => {
  const foreground = getStyle("--foreground");
  const text = "Hello world";
  const height = 20;
  const font = `bold ${60}px Inter`;
  const fillStyle = foreground;
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.fillText(text, 100, 100 - height / 2);
};

const fillBackground = (ctx: CanvasRenderingContext2D) => {
  const backgroundColor = getStyle("--background");
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

export default function ({ ref }: Props) {
  const isDark = useIsDarkMode();
  const width = useCanvasState((state) => state.width);
  const height = useCanvasState((state) => state.height);
  const dpr = useCanvasState((state) => state.dpr);
  const getContext = () => {
    const current = ref.current;
    if (!current) return;
    return current.getContext("2d", {
      alpha: false,
      willReadFrequently: true,
      desynchronized: true,
    });
  };

  const drawRectangle = (ctx: CanvasRenderingContext2D) => {
    const foreground = getStyle("--foreground");
    const centerX = width / 2;
    const centerY = height / 2;
    const rectWidth = 50;
    const rectHeight = 50;
    ctx.fillStyle = foreground;
    ctx.fillRect(centerX - rectWidth / 2, centerY - rectHeight / 2, 50, 50);
  };

  useEffect(() => {
    const ctx = getContext();
    if (!ctx) return;

    preflight(ctx.canvas, window.devicePixelRatio);

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    fillBackground(ctx);
    ctx.restore();

    ctx.save();
    drawRectangle(ctx);
    ctx.restore();

    ctx.save();
    drawText(ctx);
    ctx.restore();

    ctx.save();
    drawLogo(ctx, isDark);
    ctx.restore();

    ctx.restore();
  }, [width, height, dpr, isDark]);

  return null;
}
