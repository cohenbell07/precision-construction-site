"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "phosphor-react";

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Modern Kitchen Renovation",
    category: "Kitchens",
    image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&q=80",
    description: "Complete kitchen transformation with custom cabinets, quartz countertops, and premium appliances.",
  },
  {
    id: "2",
    title: "Luxury Master Bathroom",
    category: "Bathrooms",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    description: "Custom steam shower, large format porcelain tile, and custom millwork.",
  },
  {
    id: "3",
    title: "Custom Murphy Bed Suite",
    category: "Carpentry",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
    description: "Space-saving Murphy bed with custom built-in storage and desk.",
  },
  {
    id: "4",
    title: "Commercial Office Renovation",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    description: "Complete office space renovation with modern finishes and efficient layout.",
  },
  {
    id: "5",
    title: "Luxury Vinyl Plank Flooring",
    category: "Flooring",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    description: "Premium LVP installation throughout entire home with seamless transitions.",
  },
  {
    id: "6",
    title: "Basement Development",
    category: "Basements",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
    description: "Complete basement finishing with custom bar, home theater, and guest suite.",
  },
  {
    id: "7",
    title: "Custom Closet System",
    category: "Carpentry",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
    description: "Walk-in closet with custom organization system and premium finishes.",
  },
  {
    id: "8",
    title: "Deck & Outdoor Living",
    category: "Outdoor",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    description: "Custom deck construction with pergola and outdoor kitchen area.",
  },
  {
    id: "9",
    title: "Tile Shower Installation",
    category: "Bathrooms",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    description: "Custom tile shower with niche storage and premium fixtures.",
  },
];

const categories = ["All", "Kitchens", "Bathrooms", "Commercial", "Carpentry", "Flooring", "Basements", "Outdoor"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-industrial-black texture-concrete">
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6 text-text-primary uppercase tracking-tight">
            Project Gallery
          </h1>
          <div className="inline-block mb-6">
            <div className="h-1 w-24 bg-gold mx-auto"></div>
          </div>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of completed projects showcasing our quality craftsmanship and
            attention to detail.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-2xl transition-all font-bold uppercase tracking-wide text-sm ${
                selectedCategory === category
                  ? "bg-gold text-white shadow-lg btn-glow"
                  : "bg-industrial-slate text-text-secondary hover:bg-industrial-surface border border-gold/20 hover:border-gold/40 rounded-2xl"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <Card className="card-premium card-beveled border-gold/20 overflow-hidden p-0 h-full rounded-2xl">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover gallery-image"
                    />
                    <div className="absolute inset-0 bg-industrial-black/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <span className="text-gold font-bold text-lg uppercase tracking-wide">View Details</span>
                    </div>
                    <div className="absolute top-5 left-5">
                      <span className="bg-gold text-white px-4 py-2 rounded-2xl text-sm font-bold uppercase tracking-wide shadow-lg">
                        {project.category}
                      </span>
                    </div>
                    {/* Premium shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-display font-black text-text-primary uppercase tracking-tight group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-industrial-slate border-gold/30 rounded-2xl">
            {selectedProject && (
              <>
                <div className="relative h-[500px] w-full rounded-2xl overflow-hidden mb-6 shadow-2xl">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black mb-3 text-text-primary uppercase tracking-tight">
                  {selectedProject.title}
                </h2>
                <p className="text-gold font-bold mb-6 text-lg uppercase tracking-wide">
                  {selectedProject.category}
                </p>
                <p className="text-text-secondary leading-relaxed text-lg">
                  {selectedProject.description}
                </p>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
