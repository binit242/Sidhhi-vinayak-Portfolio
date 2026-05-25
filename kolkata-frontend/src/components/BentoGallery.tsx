import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Grid3X3, ChevronDown } from "lucide-react";

interface Props {
  images: string[];
  name: string;
}

const bentoPatterns = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
];

const INITIAL_COUNT = 6;

const BentoGallery = ({ images, name }: Props) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? images : images.slice(0, INITIAL_COUNT);
  const hasMore = images.length > INITIAL_COUNT;

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected !== null) setSelected(selected > 0 ? selected - 1 : images.length - 1);
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected !== null) setSelected(selected < images.length - 1 ? selected + 1 : 0);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
        <AnimatePresence mode="popLayout">
          {visible.map((img, i) => (
            <motion.button
              key={`${img}-${i}`}
              className={`relative overflow-hidden rounded-lg ${bentoPatterns[i % bentoPatterns.length]} group cursor-pointer`}
              onClick={() => setSelected(i)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
              whileHover={{ scale: 1.02 }}
              layout
            >
              <img
                src={img}
                alt={`${name} gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              <span className="absolute bottom-2 right-2 text-xs bg-background/70 text-foreground px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {i + 1} / {images.length}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Show more / less */}
      {hasMore && (
        <motion.button
          className="mx-auto mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-full border border-border hover:border-foreground/30"
          onClick={() => setShowAll(!showAll)}
          whileTap={{ scale: 0.97 }}
        >
          {showAll ? (
            <>Show Less</>
          ) : (
            <>
              <Grid3X3 className="h-4 w-4" />
              View All {images.length} Photos
              <ChevronDown className="h-3 w-3" />
            </>
          )}
        </motion.button>
      )}

      {/* Lightbox with navigation */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 bg-card rounded-full p-2 border border-border z-10 hover:bg-muted transition-colors"
              onClick={() => setSelected(null)}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Counter */}
            <span className="absolute top-5 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
              {selected + 1} / {images.length}
            </span>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-card rounded-full p-2 border border-border z-10 hover:bg-muted transition-colors"
              onClick={goPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Image */}
            <motion.img
              key={selected}
              src={images[selected]}
              alt={`${name} full view`}
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-card rounded-full p-2 border border-border z-10 hover:bg-muted transition-colors"
              onClick={goNext}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BentoGallery;
