import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTools, FaRocket, FaCogs, FaHourglassHalf } from "react-icons/fa";

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 80); // typing speed
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <h2 className="text-2xl md:text-4xl font-semibold text-[#C45D16]">
      {displayedText}
      <span className="animate-pulse">|</span>
    </h2>
  );
}

export default function ComingSoonSection() {
  const icons = [FaTools, FaRocket, FaCogs, FaHourglassHalf];
  const [currentIcon, setCurrentIcon] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [icons.length]);

  const IconComponent = icons[currentIcon];

  return (
    <section className="w-full py-[8em] md:py-[10em] bg-[rgba(196,93,22,0.08)] text-center relative overflow-hidden">
      <div className="max-w-[60em] mx-auto px-[2em] relative z-10">
        <TypewriterText text="More Information on this Page Coming Soon..." />

        <div className="mt-[3em] h-[5em] flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIcon}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="text-[5em] text-[#E6731F]"
            >
              <IconComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating background glows */}
      <motion.div
        className="absolute top-[5%] left-[10%] w-[20em] h-[20em] bg-[#E6731F]/10 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] right-[10%] w-[22em] h-[22em] bg-[#5B933C]/10 rounded-full blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
