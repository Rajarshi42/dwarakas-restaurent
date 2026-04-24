import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { MdOutlineStar } from 'react-icons/md';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  occasion: string;
  eventDate: string;
  eventTime: string;
  adults: number;
  children: number;
  dietType: 'veg' | 'nonveg' | 'both';
  cuisines: string[];
  menuCategories: string[];
  customRequirements: string;
  deliveryOption: 'pickup' | 'delivery';
  address: string;
}

const INITIAL: FormData = {
  firstName: '', lastName: '', phone: '', email: '',
  occasion: '', eventDate: '', eventTime: '',
  adults: 50, children: 0,
  dietType: 'both', cuisines: [], menuCategories: [],
  customRequirements: '',
  deliveryOption: 'pickup', address: '',
};

const CUISINES = ['Indian', 'Chinese', 'Continental', 'Mughlai', 'South Indian', 'Italian'];
const MENU_CATS = ['Starters', 'Main Course (Curries)', 'Biryani', 'Breads', 'Desserts', 'Beverages'];
const OCCASIONS = ['Wedding', 'Birthday', 'Corporate', 'Anniversary', 'Other'];
const TOTAL_STEPS = 5;

// ─── Reusable Input ───────────────────────────────────────────────────────────
function Input({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs uppercase tracking-widest text-white/50">{label}</label>
      <input
        {...props}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-gold/60 focus:ring-1 focus:ring-gold/30"
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ─── Stepper Counter ──────────────────────────────────────────────────────────
function Counter({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  const [raw, setRaw] = useState(String(value));

  const commit = (str: string) => {
    const n = parseInt(str, 10);
    const safe = isNaN(n) || n < 0 ? 0 : n;
    setRaw(String(safe));
    onChange(safe);
  };

  // keep raw in sync when stepper buttons change value
  const step = (delta: number) => {
    const next = Math.max(0, value + delta);
    setRaw(String(next));
    onChange(next);
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <span className="text-sm text-white/70">{label}</span>
      <div className="flex items-center gap-2">
        <button onClick={() => step(-1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-gold hover:text-gold">−</button>
        <input
          type="number"
          min={0}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && commit(raw)}
          className="w-14 rounded-lg border border-white/10 bg-black/40 py-1 text-center text-sm font-semibold text-white outline-none transition focus:border-gold/60 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button onClick={() => step(1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-gold hover:text-gold">+</button>
      </div>
    </div>
  );
}

// ─── Chip Toggle ──────────────────────────────────────────────────────────────
function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition ${selected ? 'border-gold bg-gold/20 text-gold' : 'border-white/15 bg-white/5 text-white/60 hover:border-gold/40 hover:text-white'
        }`}
    >
      {label}
    </button>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  const labels = ['Info', 'Event & Guests', 'Food & Menu', 'Delivery', 'Review'];
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {labels.map((label, i) => {
          const idx = i + 1;
          const done = idx < step;
          const active = idx === step;
          return (
            <div key={label} className="flex flex-1 flex-col items-center gap-1">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition ${done ? 'bg-gold text-black' : active ? 'border-2 border-gold text-gold' : 'border border-white/20 text-white/30'
                }`}>
                {done ? '✓' : idx}
              </div>
              <span className={`hidden text-[10px] uppercase tracking-wider sm:block ${active ? 'text-gold' : 'text-white/30'}`}>{label}</span>
              {i < labels.length - 1 && (
                <div className="absolute" />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 h-1 w-full rounded-full bg-white/10">
        <motion.div
          className="h-1 rounded-full bg-gold"
          animate={{ width: `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}

// ─── Slide variants ───────────────────────────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

// ─── Main Modal ───────────────────────────────────────────────────────────────
function BookingModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleArr = (key: 'cuisines' | 'menuCategories', val: string) =>
    set(key, form[key].includes(val) ? form[key].filter((v) => v !== val) : [...form[key], val]);

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (step === 1) {
      if (!form.firstName.trim()) e.firstName = 'Required';
      if (!form.lastName.trim()) e.lastName = 'Required';
      if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit number';
      if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter valid email';
    }
    if (step === 2) {
      if (!form.occasion) e.occasion = 'Select an occasion';
      if (!form.eventDate) e.eventDate = 'Required';
      if (!form.eventTime) e.eventTime = 'Required';
    }
    if (step === 4 && form.deliveryOption === 'delivery' && !form.address.trim()) {
      e.address = 'Address is required for delivery';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (!validate()) return; setDir(1); setStep((s) => s + 1); };
  const back = () => { setDir(-1); setStep((s) => s - 1); };

  const submit = () => {
    if (!validate()) return;
    onSuccess();
  };

  const estimatedPrice = () => {
    const base = (form.adults + form.children * 0.5) * 800;
    return `₹${Math.round(base).toLocaleString('en-IN')} – ₹${Math.round(base * 1.3).toLocaleString('en-IN')}`;
  };

  const stepContent = () => {
    switch (step) {
      case 1: return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="First Name" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} placeholder="Arjun" error={errors.firstName} />
          <Input label="Last Name" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} placeholder="Sharma" error={errors.lastName} />
          <Input label="Phone Number" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="9876543210" type="tel" error={errors.phone} />
          <Input label="Email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" type="email" error={errors.email} />
        </div>
      );
      case 2: return (
        <div className="flex flex-col gap-5">
          {/* Event Details */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-white/40">Event Details</p>
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-widest text-white/50">Occasion</label>
              <select
                value={form.occasion}
                onChange={(e) => set('occasion', e.target.value)}
                className="rounded-xl border border-white/10 bg-[#1a0a0a] px-4 py-3 text-sm text-white outline-none transition focus:border-gold/60"
              >
                <option value="">Select occasion</option>
                {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.occasion && <p className="text-xs text-red-400">{errors.occasion}</p>}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Event Date" type="date" value={form.eventDate} onChange={(e) => set('eventDate', e.target.value)} error={errors.eventDate} />
              <Input label="Event Time" type="time" value={form.eventTime} onChange={(e) => set('eventTime', e.target.value)} error={errors.eventTime} />
            </div>
          </div>
          {/* Guest Details */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-white/40">Guest Details</p>
            <Counter label="Number of Adults" value={form.adults} onChange={(v) => set('adults', v)} />
            <Counter label="Number of Children" value={form.children} onChange={(v) => set('children', v)} />
            <div className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 text-sm text-gold/80">
              Estimated price range: <span className="font-semibold text-gold">{estimatedPrice()}</span>
            </div>
          </div>
        </div>
      );
      case 3: return (
        <div className="flex flex-col gap-6">
          {/* Food Preferences */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-white/40">Food Preferences</p>
            <div className="flex gap-3">
              {(['veg', 'nonveg', 'both'] as const).map((d) => (
                <button key={d} onClick={() => set('dietType', d)}
                  className={`flex-1 rounded-xl border py-3 text-sm transition ${form.dietType === d ? 'border-gold bg-gold/20 text-gold' : 'border-white/10 bg-white/5 text-white/50 hover:border-gold/30'}`}>
                  {d === 'nonveg' ? 'Non-Veg' : d === 'both' ? 'Both' : 'Veg'}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {CUISINES.map((c) => <Chip key={c} label={c} selected={form.cuisines.includes(c)} onClick={() => toggleArr('cuisines', c)} />)}
            </div>
          </div>
          {/* Menu Requirements */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-white/40">Menu Categories</p>
            <div className="flex flex-wrap gap-2">
              {MENU_CATS.map((c) => <Chip key={c} label={c} selected={form.menuCategories.includes(c)} onClick={() => toggleArr('menuCategories', c)} />)}
            </div>
            <textarea
              value={form.customRequirements}
              onChange={(e) => set('customRequirements', e.target.value)}
              rows={3}
              placeholder="Any special dietary needs, allergies, or specific dishes..."
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-gold/60 focus:ring-1 focus:ring-gold/30 resize-none"
            />
          </div>
        </div>
      );
      case 4: return (
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-white/50">Delivery Option</p>
          <div className="flex flex-col gap-3">
            {(['pickup', 'delivery'] as const).map((opt) => (
              <label key={opt} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${form.deliveryOption === opt ? 'border-gold bg-gold/10' : 'border-white/10 bg-white/5'}`}>
                <input type="radio" name="delivery" value={opt} checked={form.deliveryOption === opt} onChange={() => set('deliveryOption', opt)} className="accent-gold" />
                <div>
                  <p className="text-sm font-medium text-white capitalize">{opt}</p>
                  <p className="text-xs text-white/40">{opt === 'pickup' ? 'Pick up from our kitchen' : 'We deliver to your venue'}</p>
                </div>
              </label>
            ))}
          </div>
          <AnimatePresence>
            {form.deliveryOption === 'delivery' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <Input label="Delivery Address" value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="Full venue address" error={errors.address} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
      case 5: return (
        <div className="flex flex-col gap-4 text-sm">
          {[
            ['Name', `${form.firstName} ${form.lastName}`],
            ['Contact', `${form.phone} · ${form.email}`],
            ['Occasion', form.occasion],
            ['Date & Time', `${form.eventDate} at ${form.eventTime}`],
            ['Guests', `${form.adults} Adults, ${form.children} Children`],
            ['Diet', form.dietType === 'nonveg' ? 'Non-Veg' : form.dietType === 'both' ? 'Both' : 'Veg'],
            ['Cuisines', form.cuisines.join(', ') || '—'],
            ['Menu', form.menuCategories.join(', ') || '—'],
            ['Delivery', form.deliveryOption === 'delivery' ? `Delivery → ${form.address}` : 'Pickup'],
            ['Est. Price', estimatedPrice()],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 rounded-xl border border-white/8 bg-white/4 px-4 py-3">
              <span className="text-white/40 shrink-0">{label}</span>
              <span className="text-right text-white/90">{value}</span>
            </div>
          ))}
          {form.customRequirements && (
            <div className="rounded-xl border border-white/8 bg-white/4 px-4 py-3">
              <p className="text-white/40 mb-1">Custom Notes</p>
              <p className="text-white/80">{form.customRequirements}</p>
            </div>
          )}
        </div>
      );
    }
  };

  const stepTitles = [
    'Basic Information', 'Event & Guests', 'Food & Menu', 'Delivery Options', 'Review & Submit',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center px-0 sm:px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg rounded-t-[2rem] sm:rounded-[2rem] border border-white/10 bg-[#0d0505] shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold/60">Catering</p>
            <h2 className="text-lg font-semibold text-white">{stepTitles[step - 1]}</h2>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-white/30 hover:text-white">✕</button>
        </div>

        {/* Progress */}
        <div className="px-6 shrink-0">
          <ProgressBar step={step} />
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {stepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 border-t border-white/8 px-6 py-4 shrink-0">
          {step > 1 && (
            <button onClick={back} className="flex-1 rounded-full border border-white/15 py-3 text-sm text-white/70 transition hover:border-white/30 hover:text-white">
              Back
            </button>
          )}
          {step < TOTAL_STEPS ? (
            <button onClick={next} className="flex-1 rounded-full bg-gold py-3 text-sm font-semibold text-black transition hover:bg-gold/90">
              Continue
            </button>
          ) : (
            <button onClick={submit} className="flex-1 rounded-full bg-gold py-3 text-sm font-semibold text-black transition hover:bg-gold/90">
              Submit Request
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-sm rounded-[2rem] border border-white/10 bg-[#0d0505] p-10 text-center shadow-2xl"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
          <HiCheckCircle className="text-4xl text-gold" />
        </div>
        <h3 className="text-xl font-semibold text-white">Request Received!</h3>
        <p className="mt-3 text-sm text-white/60">We'll get back to you within 24 hours to confirm your catering booking.</p>
        <button onClick={onClose} className="mt-6 w-full rounded-full bg-gold py-3 text-sm font-semibold text-black transition hover:bg-gold/90">
          Done
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── OrderCta ─────────────────────────────────────────────────────────────────
export default function OrderCta({ openModalRef }: { openModalRef?: (fn: () => void) => void }) {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const handleSuccess = () => { setShowModal(false); setShowSuccess(true); };

  // expose openModal to parent via callback ref
  if (openModalRef) openModalRef(openModal);

  return (
    <>
      <section id="order" data-scroll className="relative overflow-hidden px-4 py-10 sm:px-10 sm:py-18">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#2a0000]/50 via-transparent to-[#0d0000]/30" />

        <div className="relative mx-auto max-w-5xl">

          {/* ── Header ── */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              <MdOutlineStar className="text-sm" /> Trusted by 1000+ happy guests
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Dine with us.{' '}
              <span className="text-gold">Celebrate with us.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50">
              From everyday dining to grand celebrations, enjoy rich Indian flavors crafted fresh in our kitchen — every single time.
            </p>
          </div>

          {/* ── Cards ── */}
          <div className="grid gap-4 lg:grid-cols-[1fr_0.6fr]">

            {/* LEFT — Dine-In */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-card backdrop-blur-sm"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gold/8 blur-3xl" />

              <p className="text-xs uppercase tracking-[0.3em] text-gold/70">Dine-in experience</p>
              <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Visit our restaurant</h3>

              <ul className="mt-6 space-y-3">
                {[
                  'Authentic Indian & Hyderabadi cuisine',
                  'Warm ambiance & family-friendly dining',
                  'Perfect for lunch & dinner outings',
                  'Fresh ingredients, cooked to order',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[10px] text-gold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#locations"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-gold/90 active:scale-[0.98]"
                >
                  Locations →
                </a>
              </div>
            </motion.div>

            {/* RIGHT — Catering (primary CTA) */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-gold/[0.05] p-8 shadow-card backdrop-blur-sm"
            >
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-gold/10 blur-3xl" />

              <p className="text-xs uppercase tracking-[0.3em] text-gold/60">Catering services</p>
              <h3 className="mt-3 text-xl font-semibold text-white">Planning an event?</h3>

              <ul className="mt-5 space-y-2.5">
                {[
                  'Weddings, birthdays & corporate events',
                  'Custom menus tailored to your needs',
                  'Trusted for large gatherings',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/55">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/50" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={openModal}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-gold/90 active:scale-[0.98]"
              >
                Book Catering
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      <AnimatePresence>
        {showModal && <BookingModal onClose={closeModal} onSuccess={handleSuccess} />}
        {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
      </AnimatePresence>
    </>
  );
}
