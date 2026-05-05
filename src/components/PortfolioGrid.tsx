import { useState, useRef, useEffect } from 'react';
import { ExternalLink, Eye } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string[];
  image: string;
  commission: number;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Campagne Digitale - Luxe Paris',
    description: 'Stratégie de communication digitale complète pour une marque de luxe parisienne. Réseaux sociaux, RP et événementiel.',
    category: ['communication'],
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1045162/2026-03-20/5cbf28ed-1ba9-4972-8f89-62566c2ed18f.png',
    commission: 2.5,
  },
  {
    id: 2,
    title: 'Identité Visuelle - TechStart',
    description: 'Création complète d\'identité visuelle : logo, charte graphique, supports print et digital pour une startup tech.',
    category: ['infographie'],
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1045162/2026-03-20/94c82014-0827-4725-b852-5607515ede16.png',
    commission: 3.0,
  },
  {
    id: 3,
    title: 'App Mobile - FoodDelivery UX',
    description: 'Recherche utilisateur, wireframes, prototypage et tests utilisabilité pour une application de livraison de repas.',
    category: ['ux'],
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1045162/2026-03-20/dce01b64-52a6-4deb-9dcc-53969cfeb73f.png',
    commission: 4.0,
  },
  {
    id: 4,
    title: 'Shooting Mode - Collection Été',
    description: 'Direction artistique et photographie de mode pour la collection été d\'une marque de prêt-à-porter.',
    category: ['photo'],
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1045162/2026-03-20/8533bc39-68f0-4a5c-a4e2-82a842f397d6.png',
    commission: 1.5,
  },
  {
    id: 5,
    title: 'Film Corporate - Groupe Industriel',
    description: 'Réalisation d\'un film institutionnel de 3 minutes : scénarisation, tournage multi-sites et post-production.',
    category: ['video'],
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1045162/2026-03-20/accbe8e7-cd07-4287-b7ba-5f4c5dc24784.png',
    commission: 5.0,
  },
  {
    id: 6,
    title: 'Rebranding - Agence Immobilière',
    description: 'Refonte complète de l\'image de marque : nouveau logo, site web UX, supports marketing et signalétique.',
    category: ['infographie', 'ux', 'communication'],
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1045162/2026-03-20/5cbf28ed-1ba9-4972-8f89-62566c2ed18f.png',
    commission: 3.5,
  },
];

const categories = [
  { key: 'all', label: 'Tous' },
  { key: 'communication', label: 'Communication' },
  { key: 'infographie', label: 'Infographie' },
  { key: 'ux', label: 'UX Design' },
  { key: 'photo', label: 'Photographie' },
  { key: 'video', label: 'Vidéographie' },
];

interface PortfolioGridProps {
  onProjectClick: (commission: number) => void;
}

export default function PortfolioGrid({ onProjectClick }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute('data-id'));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredProjects]);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveFilter(cat.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeFilter === cat.key
                ? 'bg-primary text-dark shadow-lg shadow-primary/25'
                : 'glass text-cream/70 hover:text-cream hover:border-primary/30'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            ref={(el) => { cardRefs.current[idx] = el; }}
            data-id={project.id}
            onClick={() => onProjectClick(project.commission)}
            className={`group glass rounded-2xl overflow-hidden cursor-pointer hover-lift transition-all duration-500 ${
              visibleCards.has(project.id)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <div className="flex gap-2">
                  <span className="bg-primary/90 text-dark p-2 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </span>
                  <span className="bg-white/10 backdrop-blur-sm text-cream p-2 rounded-lg">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
                <span className="text-green-400 text-sm font-semibold bg-dark/60 backdrop-blur-sm px-3 py-1 rounded-full">
                  +€{project.commission.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex flex-wrap gap-2 mb-3">
                {project.category.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs text-primary/80 bg-primary/10 px-2.5 py-1 rounded-full capitalize"
                  >
                    {cat === 'ux' ? 'UX Design' : cat}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-cream mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-cream/50 text-sm leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}