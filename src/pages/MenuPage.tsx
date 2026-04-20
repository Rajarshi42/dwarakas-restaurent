import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { menuData, categoryMeta } from '../data/menuData';
import nonVegMenu from '../data/nonVegMenu.json';
import vegMenu from '../data/vegMenu.json';

type CategoryKey = 'veg' | 'nonVeg' | 'desserts' | 'drinks';

const tabs: { id: string; label: string; key: CategoryKey }[] = [
  { id: 'veg',      label: 'Vegetarian', key: 'veg' },
  { id: 'non-veg',  label: 'Non-Veg',   key: 'nonVeg' },
  { id: 'desserts', label: 'Desserts',  key: 'desserts' },
  { id: 'drinks',   label: 'Drinks',    key: 'drinks' },
];

const subCategoryLabels: Record<string, string> = {
  chickenAppetizers:  'Chicken Appetizers',
  goatLambAppetizers: 'Goat & Lamb Appetizers',
  seafoodAppetizers:  'Seafood Appetizers',
  eggAppetizers:      'Egg Appetizers',
  tandoori:           'Tandoori',
  chickenEntrees:     'Chicken Entrees',
  goatLambEntrees:    'Goat & Lamb Entrees',
  seafoodEntrees:     'Seafood Entrees',
  biryani:            'Biryani',
};

type RawItem = {
  name: string;
  description?: string;
  price: number | { small: number; large: number };
  spiceLevels?: string[];
  spice_levels?: string[];
  extras?: { name: string; price: number }[];
};

function formatPrice(price: number | { small: number; large: number }): string {
  if (typeof price === 'object') return `$${price.small.toFixed(2)} / $${price.large.toFixed(2)}`;
  return `$${(price as number).toFixed(2)}`;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

// ── Shared item row ───────────────────────────────────────────────────────────
function ItemRow({ item, isLast }: { item: RawItem; isLast: boolean }) {
  const spices = item.spice_levels ?? item.spiceLevels;
  return (
    <motion.div
      variants={cardVariants}
      className={`flex items-start justify-between gap-6 py-4 ${!isLast ? 'border-b border-white/[0.06]' : ''}`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-sm font-medium text-white">{item.name}</span>
          {spices && spices.map((level) => (
            <span key={level} className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-white/35">
              {level}
            </span>
          ))}
        </div>
        {item.description && (
          <p className="mt-1 text-xs leading-5 text-white/40">{item.description}</p>
        )}
        {item.extras && (
          <div className="mt-2 flex flex-wrap gap-2">
            {item.extras.map((extra) => (
              <span key={extra.name} className="rounded-full border border-gold/20 px-2.5 py-0.5 text-[10px] text-gold/55">
                + {extra.name} ${extra.price.toFixed(2)}
              </span>
            ))}
          </div>
        )}
      </div>
      <span className="shrink-0 text-sm font-semibold text-gold">{formatPrice(item.price)}</span>
    </motion.div>
  );
}

// ── Accordion section ─────────────────────────────────────────────────────────
function AccordionSection({
  label,
  items,
  isOpen,
  onToggle,
}: {
  label: string;
  items: RawItem[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-6 py-5 transition-colors duration-300 ${
          isOpen ? 'bg-gold/10' : 'bg-white/5 hover:bg-white/8'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={`text-base font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${isOpen ? 'text-gold' : 'text-white/70'}`}>
            {label}
          </span>
          <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-white/35">
            {items.length}
          </span>
        </div>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`h-4 w-4 shrink-0 transition-colors duration-300 ${isOpen ? 'text-gold' : 'text-white/30'}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {/* Items */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="px-6 pb-2"
            >
              {items.map((item, i) => (
                <ItemRow key={item.name} item={item} isLast={i === items.length - 1} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Veg menu ──────────────────────────────────────────────────────────────────
function VegMenu() {
  const sections = vegMenu as { category: string; items: RawItem[] }[];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.div
      key="veg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      {sections.map((section, i) => (
        <AccordionSection
          key={section.category}
          label={section.category}
          items={section.items}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </motion.div>
  );
}

// ── Non-Veg menu ──────────────────────────────────────────────────────────────
function NonVegMenu() {
  const sections = Object.entries(nonVegMenu) as [string, RawItem[]][];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.div
      key="non-veg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      {sections.map(([key, items], i) => (
        <AccordionSection
          key={key}
          label={subCategoryLabels[key] ?? key}
          items={items}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </motion.div>
  );
}

// ── Flat menu (desserts / drinks) ─────────────────────────────────────────────
function FlatMenu({ tabKey }: { tabKey: CategoryKey }) {
  const items = menuData[tabKey];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tabKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-white">{item.name}</h3>
              {item.tag && (
                <span className="shrink-0 rounded-full border border-gold/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">
                  {item.tag}
                </span>
              )}
            </div>
            <p className="text-sm leading-7 text-white/55">{item.description}</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-lg font-medium text-gold">{item.price}</span>
              <button className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/50 transition hover:border-gold/40 hover:text-gold">
                Order
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MenuPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const validId = tabs.find((t) => t.id === category) ? category! : 'veg';
  const [activeTab, setActiveTab] = useState(validId);

  useEffect(() => {
    if (category && tabs.find((t) => t.id === category)) setActiveTab(category);
  }, [category]);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    navigate(`/menu/${id}`, { replace: true });
  };

  const current = tabs.find((t) => t.id === activeTab)!;
  const meta = categoryMeta[activeTab];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-page text-white"
    >
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button onClick={() => navigate('/')} className="text-left">
            <span className="text-sm uppercase tracking-[0.35em] text-gold">Dwaraka's</span>
            <p className="mt-1 text-xl font-semibold">Bawarchi Indian Kitchen</p>
          </button>
          <button
            onClick={() => navigate('/')}
            className="rounded-full border border-gold px-4 py-2 text-sm text-gold transition hover:bg-gold/10"
          >
            Book Table
          </button>
        </div>
      </header>

      <div className="px-6 pb-24 pt-32 sm:px-10">
        <div className="mx-auto max-w-7xl">

          {/* Back */}
          <button
            onClick={() => navigate('/')}
            className="mb-10 flex items-center gap-2 text-sm text-white/40 transition hover:text-gold"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Title */}
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.35em] text-gold/60">Our Menu</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Explore every flavour.</h1>
          </div>

          {/* Tabs */}
          <div className="mb-12 flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white/80'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full border border-gold/60 bg-gold/5"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-sm text-white/40">{meta?.description}</p>
          </div>

          {/* Content */}
          {activeTab === 'veg' && <VegMenu />}
          {activeTab === 'non-veg' && <NonVegMenu />}
          {activeTab !== 'veg' && activeTab !== 'non-veg' && (
            <FlatMenu key={activeTab} tabKey={current.key} />
          )}

        </div>
      </div>
    </motion.div>
  );
}
