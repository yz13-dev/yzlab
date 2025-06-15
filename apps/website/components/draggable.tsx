"use client";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
  children?: React.ReactNode;
}
export default function ({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const [left, setLeft] = useState<number>(0);

  const calc = () => {
    const div = ref.current;
    if (!div) return;

    const clientWidth = div.clientWidth;
    const scollWidth = div.scrollWidth;

    const width = clientWidth - scollWidth;

    setLeft(width);
  }

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      calc();
    });

    observer.observe(parent);

    return () => {
      observer.disconnect()
    }
  }, [])
  useEffect(() => {
    calc()
  }, [])
  return (
    <div
      ref={parentRef}
      className={className}
    >
      <motion.div
        ref={ref}
        dragConstraints={{ right: 0, left }}
        drag="x"
      >
        {children}
      </motion.div>
    </div>
  )
}
