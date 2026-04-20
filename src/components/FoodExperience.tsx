import { motion } from 'framer-motion';

const VIDEO_SRC =
  '/videos/Firefly Ultra realistic cinematic slow-motion video of chicken biryani preparation, 4K resolution, 6.mp4';

const highlights = [
  { icon: '🍛', text: 'Signature biryanis & rich curries' },
  { icon: '🌿', text: 'Fresh ingredients, traditional recipes' },
  { icon: '🏡', text: 'Warm, welcoming dining experience' },
  { icon: '🎉', text: 'Catering for weddings, parties & corporate events' },
];

export default function FoodExperience() {
  return (
    <section id="food" data-scroll className="relative overflow-hidden px-6 py-24 sm:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.04),_transparent_30%)]" />

      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">

        {/* ── Visual (dominant) ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-card lg:flex-[1.2]"
        >
          <video
            src={VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            className="h-[460px] w-full object-cover lg:h-[560px]"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          {/* overlay text */}
          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gold/70">In our kitchen</p>
            <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Crafted with spice.<br />Served with soul.
            </h3>
          </div>
        </motion.div>

        {/* ── Text ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          className="flex flex-col gap-8 lg:flex-1"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold/75">Food experience</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight sm:text-4xl">
              More than a meal — it's an experience of flavor, tradition, and warmth.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
              At Dwaraka's Bawarchi, every dish is crafted with authentic recipes, bold spices, and fresh ingredients — bringing true Indian flavors to your table.
            </p>
          </div>

          {/* Highlights */}
          <ul className="flex flex-col gap-3">
            {highlights.map((h, i) => (
              <motion.li
                key={h.text}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"
              >
                <span className="text-lg">{h.icon}</span>
                <span className="text-sm text-white/70">{h.text}</span>
              </motion.li>
            ))}
          </ul>


        </motion.div>

      </div>
    </section>
  );
}
