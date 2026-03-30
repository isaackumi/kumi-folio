"use client";

import { motion } from "framer-motion";

export const BackgroundGlobe = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] dark:opacity-[0.16] pointer-events-none overflow-hidden">
      {/* Primary globe — slow clockwise */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute w-[900px] h-[900px]"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-accent-blue">
          {/* Latitude lines */}
          {[...Array(9)].map((_, i) => (
            <ellipse
              key={`lat-${i}`}
              cx="100" cy="100"
              rx="90" ry={10 + i * 12}
              fill="none" stroke="currentColor" strokeWidth="0.4"
            />
          ))}
          {/* Longitude lines */}
          {[...Array(9)].map((_, i) => (
            <ellipse
              key={`lng-${i}`}
              cx="100" cy="100"
              rx={10 + i * 12} ry="90"
              fill="none" stroke="currentColor" strokeWidth="0.4"
            />
          ))}
          {/* Outer dashed ring */}
          <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 5" />
        </svg>
      </motion.div>

      {/* Secondary tilted ring — counter-clockwise, accent-green tint */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px]"
        style={{ transform: "rotateX(55deg)" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-accent-green">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 8" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.35" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 6" />
          {/* Cardinal tick marks */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 100 + 88 * Math.cos(rad);
            const y1 = 100 + 88 * Math.sin(rad);
            const x2 = 100 + 94 * Math.cos(rad);
            const y2 = 100 + 94 * Math.sin(rad);
            return (
              <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.8" />
            );
          })}
        </svg>
      </motion.div>

      {/* Inner pulsing dot-ring */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px]"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-accent-blue">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 4" />
          <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  );
};
