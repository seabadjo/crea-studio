import { useCallback } from 'react';
import { toast } from 'sonner';
import {
  ArrowDown,
  Megaphone,
  Palette,
  Layout,
  Camera,
  Video,
  Award,
  Users,
  Briefcase,
  Clock,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import RevenueBar, { useRevenue } from '@/components/RevenueTracker';
import PortfolioGrid from '@/components/PortfolioGrid';
import ContactForm from '@/components/ContactForm';
import TestimonialCarousel from '@/components/TestimonialCarousel';

const HERO_IMAGE = 'https://mgx-backend-cdn.metadl.com/generate/images/1045162/2026-03-20/177b0daf-9582-47dd-8ad2-1b32e33ef569.png';

const services = [
  {
    icon: Megaphone,
    title: 'Communication',
    description:
      'Stratégie de communication digitale et traditionnelle. Gestion des réseaux sociaux, relations presse et événementiel.',
  },
  {
    icon: Palette,
    title: 'Infographie',
    description:
      'Création d\'identités visuelles, logos, chartes graphiques, supports print et digital. Design impactant et mémorable.',
  },
  {
    icon: Layout,
    title: 'UX Design',
    description:
      'Recherche utilisateur, wireframing, prototypage et tests d\'utilisabilité. Interfaces intuitives centrées sur l\'humain.',
  },
  {
    icon: Camera,
    title: 'Photographie',
    description:
      'Photographie professionnelle : corporate, mode, produit, événementiel. Direction artistique et retouche avancée.',
  },
  {
    icon: Video,
    title: 'Vidéographie',
    description:
      'Réalisation de films corporate, spots publicitaires, contenus sociaux. Scénarisation, tournage et post-production.',
  },
];

const stats = [
  { icon: Briefcase, value: '120+', label: 'Projets Réalisés' },
  { icon: Users, value: '85+', label: 'Clients Satisfaits' },
  { icon: Award, value: '15', label: 'Prix & Distinctions' },
  { icon: Clock, value: '8+', label: "Années d'Expérience" },
];

export default function Index() {
  const { data: revenueData, addRevenue, addClick } = useRevenue();

  const showToast = useCallback((message: string) => {
    toast(message, {
      style: {
        background: '#1a1a1a',
        border: '1px solid rgba(252,134,8,0.3)',
        color: '#FEFCE1',
      },
    });
  }, []);

  const handleProjectClick = useCallback(
    (commission: number) => {
      if (commission > 0) {
        addRevenue(commission);
        showToast(`+€${commission.toFixed(2)} ajouté à vos revenus !`);
      } else {
        addClick();
      }
    },
    [addRevenue, addClick, showToast]
  );

  const handleContactSubmit = useCallback(() => {
    addRevenue(5.0);
    showToast('Message envoyé ! Revenus de lead: +€5.00');
  }, [addRevenue, showToast]);

  const handleAdClick = useCallback(() => {
    addRevenue(0.45);
    showToast('+€0.45 ajouté à vos revenus !');
  }, [addRevenue, showToast]);

  return (
    <div className="min-h-screen bg-dark text-cream">
      <RevenueBar data={revenueData} />
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section
        id="accueil"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Creative workspace"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/80 to-dark" />
        </div>

        {/* Decorative Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-300/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-block glass px-4 py-2 rounded-full text-sm text-cream/70 mb-8 animate-fade-in">
            ✨ Chargé de Communication • Infographe • UX Designer • Photographe • Vidéaste
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            <span className="text-cream">Créateur</span>
            <br />
            <span className="gradient-text">d'Expériences</span>
            <br />
            <span className="text-cream">Visuelles</span>
          </h1>

          <p className="text-lg md:text-xl text-cream/60 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Je transforme vos idées en expériences visuelles mémorables.
            Communication, design, photographie et vidéo — un regard créatif unique.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary text-dark px-8 py-4 rounded-xl font-semibold text-lg btn-shine hover:bg-orange-400 transition-colors"
            >
              Voir mes réalisations
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glass px-8 py-4 rounded-xl font-semibold text-lg text-cream/80 hover:text-primary hover:border-primary/30 transition-all"
            >
              Discutons ensemble
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-cream/40" />
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="apropos" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Text */}
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                À Propos
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
                Un créatif <span className="gradient-text">polyvalent</span>
              </h2>
              <p className="text-cream/60 leading-relaxed mb-6">
                Passionné par la création sous toutes ses formes, je combine expertise en
                communication, design graphique, UX design, photographie et vidéographie
                pour offrir des solutions créatives complètes et cohérentes.
              </p>
              <p className="text-cream/60 leading-relaxed mb-8">
                Chaque projet est une opportunité de raconter une histoire unique.
                Mon approche multidisciplinaire me permet de créer des expériences
                visuelles qui connectent les marques à leur audience de manière
                authentique et impactante.
              </p>

              {/* Skills */}
              <div className="space-y-4">
                {[
                  { label: 'Communication & Stratégie', pct: 95 },
                  { label: 'Design Graphique', pct: 90 },
                  { label: 'UX/UI Design', pct: 88 },
                  { label: 'Photographie', pct: 92 },
                  { label: 'Vidéographie', pct: 85 },
                ].map((skill) => (
                  <div key={skill.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-cream/80">{skill.label}</span>
                      <span className="text-primary font-medium">{skill.pct}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-orange-300 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-6 text-center hover-lift"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-3xl md:text-4xl font-bold text-cream mb-1">{stat.value}</p>
                  <p className="text-cream/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="section-padding bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Ce que je <span className="gradient-text">propose</span>
            </h2>
            <p className="text-cream/50 mt-4 max-w-xl mx-auto">
              Une approche créative complète pour donner vie à vos projets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div
                key={service.title}
                onClick={handleAdClick}
                className="glass rounded-2xl p-7 cursor-pointer group hover-lift"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-cream mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-cream/50 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO SECTION ===== */}
      <section id="portfolio" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Mes <span className="gradient-text">réalisations</span>
            </h2>
            <p className="text-cream/50 mt-4 max-w-xl mx-auto">
              Découvrez une sélection de mes projets les plus récents
            </p>
          </div>

          <PortfolioGrid onProjectClick={handleProjectClick} />
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section id="temoignages" className="section-padding bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Témoignages
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Ce qu'ils <span className="gradient-text">disent</span>
            </h2>
            <p className="text-cream/50 mt-4 max-w-xl mx-auto">
              La satisfaction de mes clients est ma plus grande fierté
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Contact
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Travaillons <span className="gradient-text">ensemble</span>
            </h2>
            <p className="text-cream/50 mt-4 max-w-xl mx-auto">
              Prêt à donner vie à votre prochain projet créatif ?
            </p>
          </div>

          <ContactForm onSubmit={handleContactSubmit} />
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-3">
                <span className="text-primary">Créa</span>
                <span className="text-cream">Studio</span>
              </h3>
              <p className="text-cream/50 text-sm leading-relaxed">
                Créateur d'expériences visuelles. Communication, design,
                photographie et vidéo au service de votre marque.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-cream font-semibold mb-4">Liens Rapides</h4>
              <div className="space-y-2">
                {['Accueil', 'À Propos', 'Services', 'Portfolio', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace('à propos', 'apropos').replace(' ', '')}`}
                    className="block text-cream/50 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-cream font-semibold mb-4">Suivez-moi</h4>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Youtube, label: 'YouTube' },
                ].map((social) => (
                  <button
                    key={social.label}
                    onClick={() => {
                      addClick();
                      showToast('Ouverture du profil social...');
                    }}
                    className="glass w-10 h-10 rounded-lg flex items-center justify-center text-cream/50 hover:text-primary hover:border-primary/30 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream/30 text-sm">
              © 2026 CréaStudio. Tous droits réservés.
            </p>
            <p className="text-cream/30 text-sm">
              Fait avec <span className="text-primary">♥</span> à Paris
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}