import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FloatingHearts } from "@/components/FloatingHearts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Roopa 🎂" },
      { name: "description", content: "A tiny cute surprise just for Roopa." },
    ],
  }),
  component: Index,
});

function fireConfetti() {
  const colors = ["#ff77a9", "#c084fc", "#ffd166", "#fb7185", "#a78bfa"];
  const end = Date.now() + 1800;
  (function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0 }, colors });
    confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({ particleCount: 140, spread: 100, startVelocity: 45, origin: { y: 0.6 }, colors });
}

function Index() {
  const [opened, setOpened] = useState(false);
  const [dodge, setDodge] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setOpened(true);
    fireConfetti();
    setTimeout(fireConfetti, 700);
  };

  // Playful: button slightly dodges first hover, then settles
  const handleHover = () => {
    if (dodge < 2 && !opened) setDodge((d) => d + 1);
  };

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-12">
      <FloatingHearts count={opened ? 22 : 12} />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 text-center max-w-xl"
          >
            <motion.div
              animate={{ rotate: [0, -6, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              🎁
            </motion.div>
            <p className="font-display text-3xl md:text-4xl text-primary-glow mb-3">
              psst… Roopa
            </p>
            <p className="text-muted-foreground text-base md:text-lg mb-10">
              oru chinna surprise un kaagathaan kaathukittu irukku ✨
            </p>

            <motion.button
              ref={btnRef}
              onClick={handleClick}
              onMouseEnter={handleHover}
              animate={{ x: dodge === 1 ? 60 : dodge === 2 ? -50 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="font-display text-2xl md:text-3xl px-10 py-5 rounded-full text-primary-foreground shadow-[var(--shadow-glow)] animate-wiggle"
              style={{ backgroundImage: "var(--gradient-cute)" }}
            >
              onum illaa kela poru 👀
            </motion.button>

            <p className="mt-6 text-xs text-muted-foreground/70">
              click pannu
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.45 }}
            className="relative z-10 text-center max-w-2xl"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-7xl md:text-8xl mb-6"
            >
              🎂🎈🎉
            </motion.div>

            <motion.h1
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              className="font-display text-6xl md:text-8xl leading-none mb-4 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, oklch(0.85 0.16 350), oklch(0.88 0.15 90), oklch(0.78 0.18 0), oklch(0.85 0.16 350))",
                backgroundSize: "300% 100%",
              }}
            >
              Happy Birthday,
            </motion.h1>

            <motion.h2
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", bounce: 0.6 }}
              className="font-display text-7xl md:text-9xl text-primary mb-8 drop-shadow-[0_0_30px_oklch(0.78_0.18_0_/_0.6)]"
            >
              Roopa 💛
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed"
            >
              <span className="font-display text-2xl md:text-3xl text-primary-glow mt-3 inline-block">
                "24 vayasu aaiduchu, KitKat vaangi celebrate pannalaam!" 🍫🎂✨
              </span>
              <br />
              <span className="font-display text-xl md:text-2xl text-primary-glow mt-2 inline-block">
                — Vicky 💛
              </span>
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              onClick={fireConfetti}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 font-display text-xl px-8 py-3 rounded-full bg-card border border-border text-foreground hover:bg-muted transition"
            >
              innum oru muraii 🎊
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
