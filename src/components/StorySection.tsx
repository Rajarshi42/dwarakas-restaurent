import { motion } from 'framer-motion';

const storyBlocks = [
  {
    title: 'Rooted in tradition',
    description:
      'Inspired by authentic recipes and regional flavors, every dish carries the essence of Indian culinary heritage — cooked the way it was always meant to be.',
  },
  {
    title: 'Crafted with passion',
    description:
      'From handpicked ingredients to perfected recipes, we focus on quality, taste, and consistency in every plate that leaves our kitchen.',
  },
  {
    title: 'Made for every occasion',
    description:
      "Whether it's a casual family meal or a grand celebration, we create experiences that bring people together around great food.",
  },
];

const VIDEO_SRC = 'videos/ourStory.mp4';

export default function StorySection() {
  return (
    <section id="story" data-scroll className="relative overflow-hidden px-4 py-12 sm:px-10 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08),_transparent_22%),linear-gradient(180deg,_rgba(139,0,0,0.08),transparent_40%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16">

        {/* ── Heading + video row ── */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">

          {/* Text */}
          <div className="flex-1">
            <p className="text-sm uppercase tracking-[0.35em] text-gold">Our story</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Where authentic flavors meet modern dining.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/70">
              Founded with a deep passion for authentic Indian cuisine, Dwaraka's Bawarchi has been serving flavorful experiences since 2019. Our journey began with a simple vision — to bring the true taste of traditional recipes to modern dining.
            </p>
            <p className="mt-4 text-base leading-8 text-white/70">
              Every dish reflects the richness of Indian culinary heritage, from aromatic biryanis to carefully crafted curries. We stay true to regional authenticity while ensuring every meal is fresh, flavorful, and memorable.
            </p>
          </div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative w-full shrink-0 lg:w-[400px]"
          >
            <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gold/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-card">
              <video
                src={VIDEO_SRC}
                autoPlay
                loop
                muted
                playsInline
                className="h-[280px] w-full object-cover sm:h-[370px] lg:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
                <span className="text-xs font-medium text-white/80">Freshly prepared, every day</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Feature cards ── */}
        <div className="grid gap-6 lg:grid-cols-3">
          {storyBlocks.map((block, index) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              className="rounded-[2rem] border border-white/10 bg-black/70 p-8 shadow-card backdrop-blur-xl"
            >
              <h3 className="text-xl font-semibold text-white">{block.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">{block.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
