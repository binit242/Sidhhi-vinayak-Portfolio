import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api, { ProjectSummary } from "@/api/client";
import ProjectCard from "@/components/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLocation, setActiveLocation] = useState("All");

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => {
        setProjects(res.data.data || res.data || []);
      })
      .catch((err) => console.error("Projects fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  // Build locations list dynamically from fetched projects
  const locations = [
    "All",
    ...Array.from(
      new Set(
        projects
          .map((p) => p.city || p.location)
          .filter((loc): loc is string => Boolean(loc))
      )
    ),
  ];

  const filtered =
    activeLocation === "All"
      ? projects
      : projects.filter(
          (p) => p.city === activeLocation || p.location === activeLocation
        );

  if (loading) {
    return (
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-3">
            Our Portfolio
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Explore our developments across Kolkata. Select a location to filter.
          </p>
        </motion.div>

        {/* Location Filter */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setActiveLocation(loc)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeLocation === loc
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent/20"
              }`}
            >
              {loc}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.p
            className="text-center text-muted-foreground py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No projects in this location yet. Stay tuned!
          </motion.p>
        )}
      </div>
    </main>
  );
};

export default Projects;