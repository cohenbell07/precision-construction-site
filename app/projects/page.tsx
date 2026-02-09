"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

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
    <div className="min-h-screen bg-black relative premium-bg-pattern">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight premium-heading px-2">
            Project Gallery
          </h1>
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-3 sm:mb-4 md:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-2xl mx-auto leading-relaxed premium-text px-2">
            Explore our portfolio of completed projects showcasing our quality craftsmanship and
            attention to detail.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12 md:mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl transition-colors font-black uppercase tracking-wide text-xs sm:text-sm border-2 ${
                selectedCategory === category
                  ? "bg-silver text-black shadow-[0_0_20px_rgba(232,232,232,0.5)] border-silver btn-glow"
                  : "bg-black/65 text-white border-silver/30 hover:bg-black/75 hover:border-silver/60 "
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => setSelectedProject(project)}
            >
              <Card className="card-premium border-silver/30 overflow-hidden p-0 h-full bg-black/75 ">
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                  <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="premium-silver-text font-black text-lg uppercase tracking-wide">View Details</span>
                  </div>
                  <div className="absolute top-5 left-5">
                    <span className="bg-silver text-black px-4 py-2 rounded-xl text-sm font-black uppercase tracking-wide shadow-[0_0_15px_rgba(232,232,232,0.5)]">
                      {project.category}
                    </span>
                  </div>
                  {/* Premium shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-silver/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-display font-black text-white uppercase tracking-tight group-hover:text-silver transition-colors premium-heading-sm">
                    {project.title}
                  </h3>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-black/95 border-silver/30 rounded-xl sm:rounded-2xl  p-4 sm:p-6">
            {selectedProject && (
              <>
                <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 md:mb-6 shadow-2xl border border-silver/20">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 80vw"
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black mb-2 sm:mb-3 text-white uppercase tracking-tight premium-heading">
                  {selectedProject.title}
                </h2>
                <p className="premium-silver-text font-black mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg uppercase tracking-wide">
                  {selectedProject.category}
                </p>
                <p className="text-white/90 leading-relaxed text-sm sm:text-base md:text-lg premium-text">
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
