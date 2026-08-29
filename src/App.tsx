import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import SVGCup from './components/SVGCup';
import { FLAVORS } from './flavors';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const flavor = FLAVORS[currentIndex];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    let nextIndex = currentIndex + newDirection;
    if (nextIndex < 0) nextIndex = FLAVORS.length - 1;
    if (nextIndex >= FLAVORS.length) nextIndex = 0;
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none touch-none">
      {/* Animated Split Background */}
      <motion.div
        className="absolute inset-0 z-0 flex flex-col"
        initial={false}
      >
        <motion.div 
          className="flex-[4]"
          animate={{ backgroundColor: flavor.bgTop }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.div 
          className="flex-[1]"
          animate={{ backgroundColor: flavor.bgBottom }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Main Content Area */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        
        {/* Title / Typography */}
        <div className="absolute top-16 left-0 right-0 overflow-hidden h-24 flex items-center justify-center">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.h1
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, y: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
              className="text-white text-5xl md:text-6xl font-bold tracking-tight drop-shadow-md text-center px-4"
            >
              {flavor.name}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Interaction Area */}
        <div className="flex items-center justify-center w-full max-w-4xl px-4 pointer-events-auto">
          {/* Arrow Left */}
          <button 
            onClick={() => paginate(-1)}
            className="flex p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-colors z-20 absolute left-4 md:left-8 lg:left-24"
            aria-label="Previous Flavor"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Center Cup */}
          <div className="relative mt-20 z-10 flex items-center justify-center">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 150 : -150 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -150 : 150 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
              >
                <SVGCup liquidColor={flavor.liquidColor} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrow Right */}
          <button 
            onClick={() => paginate(1)}
            className="flex p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-colors z-20 absolute right-4 md:right-8 lg:right-24"
            aria-label="Next Flavor"
          >
            <ChevronRight size={36} />
          </button>
        </div>

        {/* Interaction Hint (Mobile & Desktop) */}
        <div className="absolute bottom-8 md:bottom-12 text-white/70 font-medium tracking-wide flex flex-col md:flex-row gap-2 items-center text-sm md:text-base pointer-events-none text-center">
          <div className="hidden md:block">Drag straw to stir</div>
          <span className="hidden md:inline opacity-50">|</span>
          <div>Tap cup to drink</div>
        </div>
        
        {/* Pagination Dots */}
        <div className="absolute bottom-20 flex gap-3 pointer-events-auto">
          {FLAVORS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className="group relative p-2"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40 group-hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
