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
          className="flex-[68]"
          animate={{ backgroundColor: flavor.bgTop }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.div 
          className="flex-[32]"
          animate={{ backgroundColor: flavor.bgBottom }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Main Content Area */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        
        {/* Title / Typography */}
        <div className="absolute top-8 sm:top-10 md:top-12 left-0 right-0 overflow-hidden h-20 sm:h-24 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.h1
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, y: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md text-center px-6"
            >
              {flavor.name}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Interaction Area */}
        <div className="relative flex items-center justify-center w-full max-w-4xl px-4 pointer-events-auto mt-24 sm:mt-20 md:mt-16 translate-y-6 sm:translate-y-8 md:translate-y-8">
          {/* Arrow Left */}
          <button 
            onClick={() => paginate(-1)}
            className="flex p-2.5 sm:p-3 md:p-4 rounded-full bg-white/15 hover:bg-white/25 active:scale-90 backdrop-blur-sm text-white transition-all z-20 absolute top-[60%] -translate-y-1/2 left-2 sm:left-4 md:left-8 lg:left-16 shadow-lg cursor-pointer"
            aria-label="Previous Flavor"
          >
            <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />
          </button>

          {/* Center Cup */}
          <div className="relative z-10 flex items-center justify-center">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 140 : -140 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -140 : 140 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
              >
                <SVGCup liquidColor={flavor.liquidColor} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrow Right */}
          <button 
            onClick={() => paginate(1)}
            className="flex p-2.5 sm:p-3 md:p-4 rounded-full bg-white/15 hover:bg-white/25 active:scale-90 backdrop-blur-sm text-white transition-all z-20 absolute top-[60%] -translate-y-1/2 right-2 sm:right-4 md:right-8 lg:right-16 shadow-lg cursor-pointer"
            aria-label="Next Flavor"
          >
            <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />
          </button>
        </div>

        {/* Bottom Section Controls & Hints */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 flex flex-col items-center gap-1.5 sm:gap-2.5 pointer-events-auto">
          {/* Pagination Dots */}
          <div className="flex gap-2 sm:gap-2.5">
            {FLAVORS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className="group relative p-1.5 cursor-pointer"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? "w-7 sm:w-8 bg-white shadow-sm" 
                      : "w-2 sm:w-2.5 bg-white/40 group-hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Interaction Hint */}
          <div className="text-white/80 font-medium tracking-wide flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm drop-shadow-sm pointer-events-none text-center">
            <span className="hidden md:inline">Drag straw to stir</span>
            <span className="hidden md:inline opacity-50">•</span>
            <span>Tap cup to drink</span>
          </div>
        </div>

      </div>
    </div>
  );
}
