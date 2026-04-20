import { motion } from 'framer-motion';

const branches = [
    { name: 'Chantilly', address: '13949 Metrotech Dr, Chantilly, VA, 20151', details: 'https://www.dwarakasbawarchi.com/', phone: '703-378-9100' },
    { name: 'Ashburn', address: '21760 Beaumeade Circle,Unit 145, Ashburn, VA, 20147', details: 'https://www.dwarakasbawarchiashburn.com/', phone: '571-918-0716' },
    { name: 'Columbia', address: '7185 Columbia Gateway Dr, Suite: A&B, Columbia, MD, 21046', details: 'https://www.dwarakasbawarchicolumbia.com/', phone: '410-290-1118' },
    { name: 'Austin', address: '1400 E old settlers Blvd, Unit 203, Round Rock, TX', details: 'https://www.dwarakasbawarchiaustin.com/', phone: '512-212-8999' }
];

export default function LocationsSection() {
    return (
        <section id="locations" data-scroll className="relative overflow-hidden px-6 py-24 sm:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.08),_transparent_30%)]" />
            <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-black/80 p-10 shadow-card backdrop-blur-xl">
                <div className="mb-10">
                    <p className="text-sm uppercase tracking-[0.35em] text-gold/75">Locations</p>
                    <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Find us at premium culinary destinations.</h2>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-white/75">
                        Check Dwaraka's Bawarachi's new locations and find out the closest option to you!
                    </p>
                </div>
                <div className="relative h-[420px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0e0b08] shadow-card">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/80" />
                    <div className="absolute inset-0 p-8 grid grid-cols-2 gap-6">
                        {branches.map((branch, index) => (
                            <motion.div
                                key={branch.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: index * 0.1 }}
                                className="mb-6 flex items-center gap-4 rounded-3xl border border-white/10 bg-black/50 p-4 shadow-card"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-gold/10 text-gold">{index + 1}</div>
                                <div>
                                    <a href={branch.details} className="text-sm text-gold hover:underline">
                                        {branch.name}
                                    </a>
                                    <p className="text-sm text-white/70">{branch.address}</p>
                                    <p className="text-sm text-white/70">{branch.phone}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
