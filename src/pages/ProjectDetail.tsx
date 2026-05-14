import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Clock, Building2, Ruler, Home,
  CheckCircle2, TreePine, Navigation, Phone,
} from "lucide-react";
import { projects } from "@/data/projects";
import BentoGallery from "@/components/BentoGallery";
import BorderGlow from "@/components/BorderGlow";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 text-center py-20">
          <h1 className="font-display text-3xl font-bold mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-accent underline">
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const overview = [
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Clock, label: "Timeline", value: project.year },
    { icon: Building2, label: "Type", value: project.type },
    { icon: Ruler, label: "Total Area", value: project.area },
    { icon: Home, label: "Units", value: String(project.units) },
  ];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  });

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> All Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div className="mb-8" {...fadeUp()}>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="font-display text-3xl md:text-4xl font-bold">{project.name}</h1>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                project.status === "Completed"
                  ? "bg-green-500/15 text-green-700 dark:text-green-400"
                  : project.status === "Ongoing"
                  ? "bg-accent/20 text-accent-foreground"
                  : "bg-blue-500/15 text-blue-700 dark:text-blue-400"
              }`}
            >
              {project.status}
            </span>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </motion.div>

        {/* Gallery */}
        <motion.div className="mb-12" {...fadeUp(0.1)}>
          <BentoGallery images={project.images} name={project.name} />
        </motion.div>

        {/* Overview + Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div {...fadeUp(0.2)}>
            <BorderGlow animated borderRadius={12}>
              <div className="p-8">
                <h2 className="font-display text-xl font-semibold mb-5">Project Overview</h2>
                <div className="space-y-4">
                  {overview.map((d) => (
                    <div key={d.label} className="flex items-center gap-3">
                      <d.icon className="h-4 w-4 text-accent shrink-0" />
                      <span className="text-sm text-muted-foreground w-24">{d.label}</span>
                      <span className="text-sm font-medium">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </BorderGlow>
          </motion.div>

          <motion.div {...fadeUp(0.25)}>
            <BorderGlow animated borderRadius={12}>
              <div className="p-8">
                <h2 className="font-display text-xl font-semibold mb-5 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" /> Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </BorderGlow>
          </motion.div>
        </div>

        {/* Specifications */}
        <motion.div className="mb-8" {...fadeUp(0.3)}>
          <BorderGlow animated borderRadius={12}>
            <div className="p-8">
              <h2 className="font-display text-xl font-semibold mb-5">Specifications</h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {Object.entries(project.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start py-2 border-b border-border/50 last:border-0">
                    <span className="text-sm text-muted-foreground">{key}</span>
                    <span className="text-sm font-medium text-right max-w-[55%]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </BorderGlow>
        </motion.div>

        {/* Amenities + Neighborhood */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeUp(0.35)}>
            <BorderGlow animated borderRadius={12}>
              <div className="p-8">
                <h2 className="font-display text-xl font-semibold mb-5 flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-accent" /> Amenities
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {project.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm">
                      <div className="h-1 w-1 rounded-full bg-accent shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </BorderGlow>
          </motion.div>

          <motion.div {...fadeUp(0.4)}>
            <BorderGlow animated borderRadius={12}>
              <div className="p-8">
                <h2 className="font-display text-xl font-semibold mb-5 flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-accent" /> Neighbourhood
                </h2>
                <ul className="space-y-3">
                  {project.neighborhood.map((n) => (
                    <li key={n} className="flex items-start gap-2 text-sm">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </BorderGlow>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="bg-accent/10 border border-accent/20 rounded-xl p-8 md:p-12 text-center"
          {...fadeUp(0.45)}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Interested in {project.name}?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Get in touch with our team for site visits, floor plans, pricing, and availability.
          </p>
          <Link
            to="/contact"
            className="relative rounded px-5 py-2.5 overflow-hidden group bg-accent text-accent-foreground inline-flex items-center gap-2 font-medium hover:ring-2 hover:ring-offset-2 hover:ring-accent transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative inline-flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Schedule a Visit
            </span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default ProjectDetail;
