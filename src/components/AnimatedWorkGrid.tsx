"use client";

import { motion } from "framer-motion";
import React from "react";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

interface AnimatedWorkGridProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function AnimatedWorkGrid({ children, style }: AnimatedWorkGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      style={style}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
