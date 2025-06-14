"use client";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
  children?: React.ReactNode;
}
export default function ({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [left, setLeft] = useState<number>(0);

  useEffect(() => {
    const div = ref.current;
    if (!div) return;

    const clientWidth = div.clientWidth;
    const scollWidth = div.scrollWidth;

    const width = clientWidth - scollWidth;

    setLeft(width);

  }, [])
  return (
    <div
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
