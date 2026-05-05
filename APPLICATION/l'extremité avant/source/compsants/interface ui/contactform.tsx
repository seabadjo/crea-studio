import { useState, type FormEvent } from 'react';
import { Send, MapPin, Mail, Phone } from 'lucide-react';

interface ContactFormProps {
  onSubmit: () => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      onSubmit();
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSending(false);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Info */}
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-cream mb-4">
            Parlons de votre <span className="text-primary">projet</span>
          </h3>
          <p className="text-cream/60 leading-relaxed">
            Vous avez un projet créatif en tête ? N'hésitez pas à me contacter.
            Je serai ravi de discuter de vos besoins et de trouver la meilleure
            solution pour vous.
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-cream/50 text-sm">Email</p>
              <p className="text-cream font-medium">stjeanbouh45@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-cream/50 text-sm">Téléphone</p>
              <p className="text-cream font-medium">+225 05 64 41 18 67 / +225 01 52 75 40 30</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-cream/50 text-sm">Localisation</p>
              <p className="text-cream font-medium">Abidjan, Côte d'ivoire</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4 pt-4">
          {['LinkedIn', 'Behance', 'Dribbble', 'Instagram'].map((social) => (
            <button
              key={social}
              className="glass px-4 py-2 rounded-lg text-sm text-cream/60 hover:text-primary hover:border-primary/30 transition-all duration-300"
            >
              {social}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-cream/60 text-sm mb-2">Nom complet</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className="block text-cream/60 text-sm mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
              placeholder="votre@email.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-cream/60 text-sm mb-2">Sujet</label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
            placeholder="Sujet de votre message"
          />
        </div>

        <div>
          <label className="block text-cream/60 text-sm mb-2">Message</label>
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all resize-none"
            placeholder="Décrivez votre projet..."
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full bg-primary text-dark font-semibold py-3.5 rounded-xl btn-shine hover:bg-orange-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {sending ? (
            <span className="animate-spin w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              Envoyer le message
            </>
          )}
        </button>
      </form>
    </div>
  );
}