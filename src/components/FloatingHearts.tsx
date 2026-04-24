import { motion } from "framer-motion";

const EMOJI = ["💖", "🌸", "✨", "🎀", "🌷", "💕", "🦋", "🧁"];

export function FloatingHearts({ count = 14 }: { count?: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 97) % 100;
        const delay = (i * 0.6) % 4;
        const duration = 8 + (i % 5);
        const size = 18 + ((i * 7) % 22);
        const emoji = EMOJI[i % EMOJI.length];
        return (
          <motion.span
            key={i}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-15vh", opacity: [0, 1, 1, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
            className="absolute select-none"
            style={{ left: `${left}%`, fontSize: size }}
          >
            {emoji}
          </motion.span>
        );
      })}
    </div>
  );
}
