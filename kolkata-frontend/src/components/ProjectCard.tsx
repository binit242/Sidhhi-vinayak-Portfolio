import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import { getAssetUrl, type ProjectSummary } from "@/api/client";
import placeholder from "@/assets/hero-building.jpg";

interface Props {
  project: ProjectSummary & {
    images?: string[];
    year?: string | number;
  };
  index: number;
}

const statusColors: Record<string, string> = {
  Completed: "bg-emerald-600 text-white border-emerald-300/70 shadow-lg shadow-emerald-950/30",
  Ongoing: "bg-amber-500 text-slate-950 border-amber-200/80 shadow-lg shadow-amber-950/30",
  Upcoming: "bg-sky-600 text-white border-sky-200/70 shadow-lg shadow-sky-950/30",
  COMPLETED: "bg-emerald-600 text-white border-emerald-300/70 shadow-lg shadow-emerald-950/30",
  ONGOING: "bg-amber-500 text-slate-950 border-amber-200/80 shadow-lg shadow-amber-950/30",
  UPCOMING: "bg-sky-600 text-white border-sky-200/70 shadow-lg shadow-sky-950/30",
  SOLD_OUT: "bg-rose-600 text-white border-rose-200/70 shadow-lg shadow-rose-950/30",
};

const ProjectCard = ({ project, index }: Props) => {
  const [currentImg, setCurrentImg] = useState(0);
  const images = project.images?.length
    ? project.images.map((img) => getAssetUrl(img))
    : [getAssetUrl(project.heroImageUrl) || placeholder];
  const projectUrl = `/projects/${project.slug || project.id}`;
  const location = project.location || project.city || "Kolkata";
  const detail = project.year || project.status;
  const statusLabel = project.status
    ? project.status.replace("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImg((c) => (c + 1) % images.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <BorderGlow
        edgeSensitivity={5}
        glowColor="40 80 80"
        backgroundColor="#120F17"
        borderRadius={12}
        glowRadius={40}
        glowIntensity={1.5}
        coneSpread={25}
        animated
        colors={['#c084fc', '#f472b6', '#38bdf8']}
      >
        <Link
          to={projectUrl}
          className="group block rounded-lg overflow-hidden"
        >
          {/* Image carousel */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <div
              className="flex h-full transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentImg * 100}%)` }}
            >
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.name} view ${i + 1}`}
                  className="w-full h-full object-cover shrink-0"
                />
              ))}
            </div>
            <div className="absolute top-3 left-3">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${statusColors[project.status] || "bg-slate-800 text-white border-white/30 shadow-lg"}`}>
                {statusLabel}
              </span>
            </div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-accent rounded-full p-1.5">
                <ArrowUpRight className="h-4 w-4 text-accent-foreground" />
              </div>
            </div>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.length > 1 && images.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentImg ? "w-4 bg-accent" : "w-1.5 bg-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="p-5 bg-card">
            <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {detail}
              </span>
            </div>
          </div>
        </Link>
      </BorderGlow>
    </motion.div>
  );
};

export default ProjectCard;
