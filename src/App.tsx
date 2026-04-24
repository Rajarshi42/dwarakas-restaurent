import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneHero from './components/SceneHero';

const StorySection     = lazy(() => import('./components/StorySection'));
const MenuCategories   = lazy(() => import('./components/MenuCategories'));
const FoodExperience   = lazy(() => import('./components/FoodExperience'));
const OrderCta         = lazy(() => import('./components/OrderCta'));
const CateringForm     = lazy(() => import('./components/CateringForm'));
const LocationsSection = lazy(() => import('./components/LocationsSection'));
const FranchiseSection = lazy(() => import('./components/FranchiseSection'));
const MenuPage         = lazy(() => import('./pages/MenuPage'));

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const openCateringModal = useRef<() => void>(() => {});
  const isInitializing = useRef(true);

  useEffect(() => {
    // If the page loaded with a hash-as-path (e.g. /hero from a refresh), redirect to /#hero
    const path = window.location.pathname;
    if (path !== '/' && !path.startsWith('/menu')) {
      const section = path.replace(/^\//, '');
      history.replaceState(null, '', `/#${section}`);
    }
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    setTimeout(() => { isInitializing.current = false; }, 300);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false);
      window.addEventListener('scroll', close, { once: true, passive: true });
      return () => window.removeEventListener('scroll', close);
    }
  }, [menuOpen]);

  useEffect(() => {
    const sections = document.querySelectorAll('section[data-scroll]');
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          if (isInitializing.current || window.location.pathname !== '/') return;
          setActiveSection(section.id);
          history.replaceState(null, '', `/${section.id === 'hero' ? '' : '#' + section.id}`);
        },
        onEnterBack: () => {
          if (isInitializing.current || window.location.pathname !== '/') return;
          setActiveSection(section.id);
          history.replaceState(null, '', `/${section.id === 'hero' ? '' : '#' + section.id}`);
        },
      });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const navItems = useMemo(
    () => [
      { id: 'hero',      label: 'Home' },
      { id: 'story',     label: 'Our Story' },
      { id: 'menu',      label: 'Menu' },
      { id: 'food',      label: 'Experience' },
      { id: 'order',     label: 'Order' },
      { id: 'catering',  label: 'Catering' },
      { id: 'locations', label: 'Locations' },
      { id: 'franchise', label: 'Contact' },
    ],
    []
  );

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    history.replaceState(null, '', id === 'hero' ? '/' : `/#${id}`);
    const el = document.getElementById(id);
    if (!el) return;
    const navbarHeight = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-page text-white">
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${scrolled ? 'border-white/10 bg-black/75 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.6)]' : 'border-transparent bg-transparent backdrop-blur-none'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3 min-w-0">
            <img 
              src="photos/Logo1.png" 
              alt="Dwaraka's Bawarchi Indian Kitchen" 
              className="h-12 w-auto sm:h-14 object-contain flex-shrink-0"
            />
            <div className="min-w-0">
              <span className="block text-xs uppercase tracking-[0.3em] text-gold sm:text-sm">Dwaraka's</span>
              <h1 className="mt-0.5 truncate text-base font-semibold sm:text-xl">Bawarchi Indian Kitchen</h1>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                className={`text-sm transition ${activeSection === item.id ? 'text-gold' : 'text-white/70'} hover:text-gold`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="#order"
              className="rounded-full border border-gold px-3 py-1.5 text-xs text-gold transition hover:bg-gold/10 sm:px-4 sm:py-2 sm:text-sm"
              onClick={(e) => { e.preventDefault(); openCateringModal.current(); }}
            >
              Book Table
            </a>
            {/* Hamburger */}
            <button
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 lg:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className={`block h-px w-5 bg-white transition-all duration-300 ${menuOpen ? 'translate-y-[3px] rotate-45' : ''}`} />
              <span className={`block h-px w-5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-5 bg-white transition-all duration-300 ${menuOpen ? '-translate-y-[9px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`overflow-hidden transition-all duration-300 lg:hidden ${menuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
          <nav className="flex flex-col border-t border-white/10 bg-black/90 px-4 py-3 backdrop-blur-xl">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                className={`py-3 text-sm transition border-b border-white/5 last:border-0 ${activeSection === item.id ? 'text-gold' : 'text-white/70'} hover:text-gold`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="space-y-24 sm:space-y-32">
        <section id="hero" data-scroll className="relative min-h-[100vh] overflow-hidden">
          <SceneHero />
        </section>
        <Suspense fallback={null}>
          <StorySection />
          <MenuCategories />
          <FoodExperience />
          <OrderCta openModalRef={(fn) => { openCateringModal.current = fn; }} />
          <CateringForm />
          <LocationsSection />
          <FranchiseSection />
        </Suspense>
      </main>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  // Use only the base pathname (ignore hash) as the route key to prevent remounts on hash changes
  const routeKey = location.pathname === '/' ? 'home' : location.pathname.split('/')[1];
  return (
    <Routes location={location} key={routeKey}>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu/:category" element={<Suspense fallback={null}><MenuPage /></Suspense>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return <AnimatedRoutes />;
}
