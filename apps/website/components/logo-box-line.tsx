"use client"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

export default function () {

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const getLogoBoxParams = () => {
    const logoBox = document.getElementById("logo-box")
    if (!logoBox) return

    const left = logoBox.offsetLeft
    const top = logoBox.offsetTop

    const width = Math.abs(left)
    const height = logoBox.offsetHeight;

    setX(left)
    setY(top)

    setWidth(width)
    setHeight(height)
  }

  useEffect(() => {

    window.addEventListener("resize", getLogoBoxParams)
    getLogoBoxParams()
    return () => {
      window.removeEventListener("resize", getLogoBoxParams)
    }
  }, [])
  return <motion.div
    initial={{ opacity: 0, width: 0 }}
    animate={{ opacity: 1, width }}
    style={{
      left: `${0}px`,
      top: `${y}px`,
      height: `${height}px`,
      transformOrigin: "left top",
    }}
    className="bg-gradient-to-r from-transparent to-secondary absolute"
  />
}
