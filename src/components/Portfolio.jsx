import React, { useState } from 'react';
import { 
  ExternalLink, 
  Sparkles, 
  X, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Monitor, 
  Smartphone,
  Cpu,
  Zap,
  Globe
} from 'lucide-react';
import { trackEvent } from '../services/api';

export default function Portfolio({ projects = [], onQuoteClick }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Website Development', 'Website Redesign', 'Custom Software', 'App Development', 'AI & Automation'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    trackEvent(`portfolio_view_${project.id}`);
  };

  return (
    <section id="portfolio" className="py-24 lg:py-32 relative bg-[#07111F] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[500px] bg-[#087CFF]/10 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#101F35] border border-[#087CFF]/30 text-xs font-semibold text-[#00D5FF]">
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Great Ideas Deserve <span className="gradient-text">Great Execution.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A8B5C7] leading-relaxed">
            Explore digital experiences designed with purpose, performance, and attention to detail.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 scrollbar-none mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                trackEvent(`portfolio_filter_${category}`);
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white border-transparent shadow-lg shadow-[#087CFF]/25'
                  : 'bg-[#101F35]/70 text-[#A8B5C7] border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-[#101F35]/70 border border-white/10 hover:border-[#087CFF]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#087CFF]/20 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Project Mockup Visual Container */}
                <div className="relative h-56 bg-gradient-to-tr from-[#0B1730] to-[#101F35] p-5 border-b border-white/5 flex items-center justify-center overflow-hidden">
                  
                  {/* Subtle Grid Lines in preview box */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>

                  {/* Stylized Modern Project Illustration */}
                  <div className="relative w-full h-full rounded-xl bg-[#07111F]/90 border border-white/10 p-4 shadow-xl flex flex-col justify-between group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500/80"></span>
                        <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                      </div>
                      <span className="text-[10px] font-mono text-[#00D5FF]">rydentec.engine</span>
                    </div>

                    <div className="space-y-1.5 my-auto">
                      <div className="text-xs font-bold text-white truncate">{project.title}</div>
                      <div className="text-[10px] text-[#A8B5C7]">{project.industry}</div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[9px] text-[#A8B5C7]">
                      <span>{project.category}</span>
                      <span className="text-emerald-400 font-semibold">99 Lighthouse</span>
                    </div>
                  </div>

                  {/* Concept Project Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#07111F]/90 text-amber-300 border border-amber-400/30 shadow-md">
                      {project.badge || (project.isConcept ? 'Concept Project' : 'Client Project')}
                    </span>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#00D5FF] font-semibold">
                    <span>{project.industry}</span>
                    <span className="text-white/40">•</span>
                    <span className="text-[#A8B5C7]">{project.category}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#00D5FF] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A8B5C7] line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {(project.techStack || []).slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-[#0B1730] text-[#A8B5C7] border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Project Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleOpenModal(project)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0B1730] border border-white/10 group-hover:border-[#087CFF] group-hover:bg-[#087CFF]/15 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-2"
                >
                  <span>View Project Details</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#00D5FF]" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#0B1730] border border-[#087CFF]/40 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-[#A8B5C7] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded text-xs font-bold bg-[#07111F] text-amber-300 border border-amber-400/30">
                  {selectedProject.badge || (selectedProject.isConcept ? 'Concept Project' : 'Client Project')}
                </span>
                <span className="text-xs text-[#00D5FF] font-semibold">{selectedProject.industry}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-[#A8B5C7] font-mono">
                Category: {selectedProject.category}
              </p>
            </div>

            {/* Simulated Desktop Preview Box */}
            <div className="rounded-xl bg-[#07111F] border border-white/10 p-5 mb-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#A8B5C7] border-b border-white/5 pb-2">
                <span className="flex items-center gap-1.5 text-white font-semibold">
                  <Monitor className="w-4 h-4 text-[#00D5FF]" />
                  <span>Desktop &amp; Mobile Responsive Blueprint</span>
                </span>
                <span className="text-emerald-400 font-mono">Core Web Vitals 99</span>
              </div>

              <div className="py-4 text-sm text-[#A8B5C7] leading-relaxed">
                {selectedProject.fullDescription || selectedProject.shortDescription}
              </div>

              {/* Metrics Highlights */}
              {selectedProject.metrics && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {selectedProject.metrics.map((metric, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-[#101F35] border border-white/5 text-center">
                      <div className="text-xs font-bold text-white">{metric}</div>
                      <div className="text-[10px] text-[#00D5FF]">Verified Spec</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Technology Stack */}
            <div className="space-y-2 mb-6">
              <div className="text-xs font-semibold text-[#A8B5C7] uppercase tracking-wider">Engineered With:</div>
              <div className="flex flex-wrap gap-2">
                {(selectedProject.techStack || []).map((tech, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg text-xs bg-[#101F35] text-white border border-white/10 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setSelectedProject(null);
                  onQuoteClick(selectedProject.category);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-bold text-xs shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Request Similar Project Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#101F35] text-[#A8B5C7] hover:text-white text-xs font-semibold"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
