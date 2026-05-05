# Portfolio Créatif - Site Web Portfolio Multi-compétences

## Design Guidelines

### Design References
- **Behance.net**: Creative portfolio layouts, bold imagery
- **Dribbble.com**: Modern card designs, smooth animations
- **Style**: Dark Mode + Orange Accent + Glassmorphism + Creative Agency

### Color Palette
- Primary/Accent: #FC8608 (Orange - 25% usage, CTAs, highlights, accents)
- Light/Cream: #FEFCE1 (Blanc crème - text, backgrounds sections alternées)
- Dark/Base: #0E100F (Noir profond - background principal)
- Glass: rgba(255, 255, 255, 0.03) with blur (glassmorphism cards)
- Muted text: #9CA3AF (gris pour texte secondaire)

### Typography
- **Primary Font**: Moon Walk (display/headings) - via local font or Google Fonts alternative
- **Secondary Font**: Poppins (body text, navigation, buttons)
- Heading1: Poppins font-weight 700 (48px-64px)
- Heading2: Poppins font-weight 600 (36px)
- Heading3: Poppins font-weight 500 (24px)
- Body: Poppins font-weight 400 (16px)
- Navigation: Poppins font-weight 600 (16px)

### Key Component Styles
- **Buttons**: Orange background (#FC8608), dark text (#0E100F), 8px rounded, hover: brighten
- **Cards**: Glass morphism (rgba(255,255,255,0.03)), blur(16px), border rgba(255,255,255,0.08), 12px rounded
- **Forms**: Dark inputs with orange accent on focus
- **Toast**: Bottom-right, orange accent

### Layout & Spacing
- Hero section: Full viewport height with parallax-like effect
- Portfolio grid: 3 columns desktop, 2 tablet, 1 mobile, 24px gaps
- Section padding: 80px-100px vertical
- Card hover: Lift with glow, 300ms transition

### Images to Generate
1. **hero-creative-workspace.jpg** - Dark moody creative workspace with camera, laptop, design tools, orange accent lighting (photorealistic)
2. **portfolio-branding-project.jpg** - Modern branding mockup with business cards and stationery on dark background, orange accents (photorealistic)
3. **portfolio-ux-design.jpg** - UX design wireframes and prototypes on tablet/screen, dark theme with orange highlights (photorealistic)
4. **portfolio-photography.jpg** - Professional photography setup with camera and dramatic lighting, dark mood (photorealistic)
5. **portfolio-video-production.jpg** - Video production scene with camera rig, cinematic lighting, dark studio (photorealistic)
6. **portfolio-graphic-design.jpg** - Graphic design poster/artwork mockup on dark wall, creative and colorful (photorealistic)

---

## Development Tasks

### Files to Create (max 8):
1. **src/index.css** - Global styles, CSS variables, custom animations, font imports, glassmorphism
2. **tailwind.config.ts** - Extended with custom colors (orange, cream, dark), Poppins font
3. **src/pages/Index.tsx** - Main page: Hero, About, Services, Portfolio, Testimonials, Contact, Footer, Revenue bar
4. **src/components/Navbar.tsx** - Navigation bar with glass effect, mobile menu, scroll behavior
5. **src/components/PortfolioGrid.tsx** - Filterable portfolio grid with categories
6. **src/components/RevenueTracker.tsx** - Revenue tracking system (from original script.js)
7. **src/components/ContactForm.tsx** - Contact form with validation and toast
8. **src/components/TestimonialCarousel.tsx** - Client testimonials carousel

### Features (from original code):
- Revenue tracking system (daily/total/clicks) with localStorage
- Portfolio filter by category (Communication, Infographie, UX Design, Photo, Vidéo)
- Toast notifications
- Scroll animations (IntersectionObserver)
- Mobile responsive menu
- Navbar scroll effect
- Contact form with lead tracking
- Passive revenue simulation (CPM)