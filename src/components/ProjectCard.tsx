import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
  index: number;
}

const statusColors: Record<string, string> = {
  Completed: "bg-green-500/15 text-green-700 dark:text-green-400",
  Ongoing: "bg-accent/20 text-accent-foreground",
  Upcoming: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
};

const ProjectCard = ({ project, index }: Props) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((c) => (c + 1) % project.images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [project.images.length]);

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
          to={`/projects/${project.id}`}
          className="group block rounded-lg overflow-hidden"
        >
          {/* Image carousel */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {project.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${project.name} view ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === currentImg ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute top-3 left-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[project.status]}`}>
                {project.status}
              </span>
            </div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-accent rounded-full p-1.5">
                <ArrowUpRight className="h-4 w-4 text-accent-foreground" />
              </div>
            </div>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {project.images.map((_, i) => (
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
                <MapPin className="h-3.5 w-3.5" /> {project.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {project.year}
              </span>
            </div>
          </div>
        </Link>
      </BorderGlow>
    </motion.div>
  );
};

export default ProjectCard;
