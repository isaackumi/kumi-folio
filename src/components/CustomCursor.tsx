"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [cursorType, setCursorType] = useState<"default" | "hover" | "terminal">("default");

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, .cursor-pointer")) {
        setCursorType("hover");
      } else if (target.closest(".font-mono, .experience-card, #lab")) {
        setCursorType("terminal");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHoverStart);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHoverStart);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden lg:flex items-center justify-center"
    >
      <motion.div
        animate={{
          width: cursorType === "hover" ? 60 : cursorType === "terminal" ? 30 : 12,
          height: cursorType === "hover" ? 60 : cursorType === "terminal" ? 30 : 12,
          borderRadius: cursorType === "terminal" ? "4px" : "50%",
        }}
        className="border-2 border-white flex items-center justify-center"
      >
        {cursorType === "terminal" && (
          <span className="text-[10px] text-white font-mono font-bold">[ ]</span>
        )}
      </motion.div>
    </motion.div>
  );
};
