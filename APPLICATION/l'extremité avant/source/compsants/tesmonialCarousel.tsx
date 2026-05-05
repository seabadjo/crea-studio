import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sophie Martin',
    role: 'Directrice Marketing',
    company: 'Luxe Paris',
    text: "Un talent exceptionnel qui a su capturer l'essence de notre marque. La campagne digitale a dépassé toutes nos attentes avec une augmentation de 150% de notre engagement.",
    avatar: 'SM',
  },
  {
    id: 2,
    name: 'Thomas Dubois',
    role: 'CEO',
    company: 'TechStart',
    text: "L'identité visuelle créée pour notre startup est exactement ce dont nous avions besoin. Moderne, impactante et parfaitement alignée avec notre vision. Un vrai professionnel.",
    avatar: 'TD',
  },
  {
    id: 3,
    name: 'Marie Laurent',
    role: 'Responsable Communication',
    company: 'Groupe Industriel',
    text: "Le film corporate réalisé est d'une qualité cinématographique remarquable. Notre image de marque a été transformée. Je recommande vivement pour tout projet vidéo.",
    avatar: 'ML',
  },
  {
    id: 4,
    name: 'Pierre Moreau',
    role: 'Fondateur',
    company: 'FoodDelivery',
    text: "L'approche UX a complètement repensé notre application. Les tests utilisateurs ont montré une amélioration de 200% de la satisfaction. Un travail méthodique et créatif.",
    avatar: 'PM',
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Main Card */}
      <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-6 right-8 text-primary/10">
          <Quote className="w-24 h-24" />
        </div>

        <div className="relative z-10">
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <p className="text-cream/80 text-lg md:text-xl leading-relaxed mb-8 italic">
            "{t.text}"
          </p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-orange-300 flex items-center justify-center text-dark font-bold text-lg">
              {t.avatar}
            </div>
            <div>
              <p className="text-cream font-semibold text-lg">{t.name}</p>
              <p className="text-cream/50 text-sm">
                {t.role} — <span className="text-primary">{t.company}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="glass w-12 h-12 rounded-full flex items-center justify-center text-cream/60 hover:text-primary hover:border-primary/30 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === current
                  ? 'bg-primary w-8'
                  : 'bg-cream/20 hover:bg-cream/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="glass w-12 h-12 rounded-full flex items-center justify-center text-cream/60 hover:text-primary hover:border-primary/30 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}