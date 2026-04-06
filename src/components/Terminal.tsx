"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const commands = [
  { input: "whoami", output: "isaac-kumi" },
  { input: "kubectl get roles", output: "SRE | DevOps Engineer | Fullstack Engineer | K8s Enthusiast" },
  { input: "uptime", output: "7+ years building, teaching, and shipping production systems" },
  { input: "ping opportunity", output: "🟢 Open to work — Response time: fast" },
];

export const Terminal = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedInput, setDisplayedInput] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (currentLine >= commands.length) {
      return;
    }

    const command = commands[currentLine];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= command.input.length) {
        setDisplayedInput(command.input.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowOutput(true), 200);
        setTimeout(() => {
          if (currentLine < commands.length - 1) {
            setCurrentLine(prev => prev + 1);
            setDisplayedInput("");
            setShowOutput(false);
          }
        }, 1500);
      }
    }, 60);

    return () => clearInterval(typeInterval);
  }, [currentLine]);

  return (
    <div className="w-full max-w-2xl bg-[#300a24] rounded-lg border border-white/10 shadow-2xl overflow-hidden font-mono text-sm md:text-base mb-8 lg:mb-0 transform transition-all hover:scale-[1.01]">
      {/* Terminal Header */}
      <div className="bg-[#3d0c2d] px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ef4444] shadow-inner" />
          <div className="w-3 h-3 rounded-full bg-[#fbbf24] shadow-inner" />
          <div className="w-3 h-3 rounded-full bg-[#22c55e] shadow-inner" />
        </div>
        <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
          isaac@ubuntu: ~
        </div>
        <div className="w-12" />
      </div>

      {/* Terminal Body */}
      <div className="p-6 min-h-[320px] bg-[#300a24]/90 backdrop-blur-sm">
        <div className="space-y-4">
          {commands.slice(0, currentLine).map((cmd, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-[#87ff00] shrink-0">➜</span>
                <span className="text-white font-bold">{cmd.input}</span>
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-accent-green/90 pl-6 border-l border-white/5 ml-1.5"
              >
                {cmd.output}
              </motion.div>
            </div>
          ))}

          {currentLine < commands.length && (
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-[#87ff00] shrink-0">➜</span>
                <span className="text-white font-bold">
                  {displayedInput}
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2.5 h-5 bg-accent-blue align-middle ml-1"
                  />
                </span>
              </div>
              {showOutput && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-accent-green/90 pl-6 border-l border-white/5 ml-1.5"
                >
                  {commands[currentLine].output}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
