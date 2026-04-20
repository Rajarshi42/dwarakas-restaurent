import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneHero from './components/SceneHero';

const StorySection    = lazy(() => import('./components/StorySection'));
const MenuCategories  = lazy(() => import('./components/MenuCategories'));
const FoodExperience  = lazy(() => import('./components/FoodExperience'));
const OrderCta        = lazy(() => import('./components/OrderCta'));
const CateringForm    = lazy(() => import('./components/CateringForm'));
const LocationsSection = lazy(() => import('./components/LocationsSection'));
const FranchiseSection = lazy(() => import('./components/FranchiseSection'));
const MenuPage        = lazy(() => import('./pages/MenuPage'));

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const [activeSection, setActiveSection] = useState('hero');
  const openCateringModal = useRef<() => void>(() => {});

  useEffect(() => {
    const sections = document.querySelectorAll('section[data-scroll]');
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
      });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const navItems = useMemo(
    () => [
      { id: 'hero', label: 'Home' },
      { id: 'story', label: 'Our Story' },
      { id: 'menu', label: 'Menu' },
      { id: 'food', label: 'Experience' },
      { id: 'order', label: 'Order' },
      { id: 'catering', label: 'Catering' },
      { id: 'locations', label: 'Locations' },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-page text-white">
<header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <span className="text-sm uppercase tracking-[0.35em] text-gold">Dwaraka's</span>
            <h1 className="mt-1 text-xl font-semibold">Bawarchi Indian Kitchen</h1>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm transition ${activeSection === item.id ? 'text-gold' : 'text-white/70'} hover:text-gold`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#order" className="rounded-full border border-gold px-4 py-2 text-sm text-gold transition hover:bg-gold/10" onClick={(e) => { e.preventDefault(); openCateringModal.current(); }}>
            Book Table
          </a>
        </div>
      </header>

      <main className="space-y-32">
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
  return (
    <Routes location={location} key={location.pathname.split('/')[1]}>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu/:category" element={<Suspense fallback={null}><MenuPage /></Suspense>} />
    </Routes>
  );
}

export default function App() {
  return <AnimatedRoutes />;
}
