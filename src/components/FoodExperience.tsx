import { motion } from 'framer-motion';
import { GiCookingPot } from 'react-icons/gi';
import { MdOutlineEco, MdOutlineDinnerDining, MdOutlineCelebration } from 'react-icons/md';

const highlights = [
  { Icon: GiCookingPot, text: 'Signature biryanis & rich curries' },
  { Icon: MdOutlineEco, text: 'Fresh ingredients, traditional recipes' },
  { Icon: MdOutlineDinnerDining, text: 'Warm, welcoming dining experience' },
  { Icon: MdOutlineCelebration, text: 'Catering for weddings, parties & corporate events' },
];

export default function FoodExperience() {
  return (
    <section id="food" data-scroll className="relative overflow-hidden px-4 py-16 sm:px-10 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.07),_transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-[0.35em] text-gold"
        >
          Food experience
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
        >
          More than a meal —{' '}
          <span className="text-gold">it's an experience.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 max-w-xl text-base leading-8 text-white/55"
        >
          At Dwaraka’s Bawarchi, every dish is more than just food — it’s a celebration of authentic Indian flavors. From our wide range of signature biryanis to rich, carefully crafted curries, each recipe is prepared using fresh ingredients and traditional spice blends. Whether you’re dining with family or hosting a special event, we bring together taste, quality, and warm hospitality to create an experience that feels both memorable and genuine.
        </motion.p>

        {/* Divider */}
        <div className="mt-10 h-px w-16 bg-gold/30" />

        {/* Highlights grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {highlights.map(({ Icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 backdrop-blur-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                <Icon className="text-xl text-gold" />
              </span>
              <span className="text-sm text-white/70">{text}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
