import { motion } from 'framer-motion';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineExternalLink } from 'react-icons/hi';

const branches = [
    { name: 'Chantilly', address: '13949 Metrotech Dr, Chantilly, VA, 20151', details: 'https://www.dwarakasbawarchi.com/', phone: '703-378-9100' },
    { name: 'Ashburn', address: '21760 Beaumeade Circle,Unit 145, Ashburn, VA, 20147', details: 'https://www.dwarakasbawarchiashburn.com/', phone: '571-918-0716' },
    { name: 'Columbia', address: '7185 Columbia Gateway Dr, Suite: A&B, Columbia, MD, 21046', details: 'https://www.dwarakasbawarchicolumbia.com/', phone: '410-290-1118' },
    { name: 'Austin', address: '1400 E old settlers Blvd, Unit 203, Round Rock, TX', details: 'https://www.dwarakasbawarchiaustin.com/', phone: '512-212-8999' }
];

export default function LocationsSection() {
    return (
        <section id="locations" data-scroll className="relative overflow-hidden px-4 py-16 sm:px-10 sm:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.08),_transparent_30%)]" />
            <div className="relative mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-black/80 p-6 shadow-card backdrop-blur-xl sm:rounded-[2.5rem] sm:p-10">
                <div className="mb-10">
                    <p className="text-sm uppercase tracking-[0.35em] text-gold">Locations</p>
                    <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">Find us at premium culinary destinations.</h2>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-white/75">
                        Check Dwaraka's Bawarachi's new locations and find out the closest option to you!
                    </p>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0e0b08] shadow-card"
                >
                    <div className="absolute inset-0 bg-[url('/photos/indian-spices.jpg')] bg-cover bg-center opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/60" />
                    <div className="relative p-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {branches.map((branch, index) => (
                            <motion.div
                                key={branch.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="rounded-2xl border border-white/15 bg-black/30 p-5 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                            >
                                {/* Header row */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-gold/10 text-xs font-semibold text-gold">
                                        {index + 1}
                                    </span>
                                    <a
                                        href={branch.details}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-base font-semibold text-white hover:text-gold transition"
                                    >
                                        {branch.name}
                                        <HiOutlineExternalLink className="text-xs text-gold/60" />
                                    </a>
                                </div>
                                {/* Details */}
                                <div className="space-y-2">
                                    <p className="flex items-start gap-2 text-sm text-white/60">
                                        <HiOutlineLocationMarker className="mt-0.5 shrink-0 text-gold" />
                                        {branch.address}
                                    </p>
                                    <p className="flex items-center gap-2 text-sm text-white/60">
                                        <HiOutlinePhone className="shrink-0 text-gold" />
                                        {branch.phone}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
