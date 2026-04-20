import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const eventTypes = ['Wedding', 'Corporate', 'Private Party', 'Festival'];

export default function CateringForm() {

  return (
    <section id="catering" data-scroll className="relative overflow-hidden px-6 py-24 sm:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.08),_transparent_22%)]" />
      <div className="relative mx-auto max-w-6xl rounded-[2.5rem] border border-white/10 bg-black/80 p-10 shadow-card backdrop-blur-xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">Catering</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Premium event catering made effortless.</h2>

          {/* Catering intro content */}
          <div className="mt-8 grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-base leading-8 text-white/75">
                As a premier catering service, food is our focus. Our professionally trained staff is committed to delivering exceptional catering for every occasion. While our menu showcases many traditional Indian favorites, our culinary expertise extends beyond — let us create delicious and memorable dishes tailored to your specific needs.
              </p>
              <p className="text-base leading-8 text-white/75">
                We cater to all events, including weddings, parties, corporate gatherings, group meetings, and any other occasion you can imagine.
              </p>
            </div>
            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-3">
                {['Weddings', 'Corporate Gatherings', 'Private Parties', 'Group Meetings'].map((event) => (
                  <div key={event} className="flex items-center gap-3 text-sm text-white/65">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold/70 shrink-0" />
                    {event}
                  </div>
                ))}
              </div>
              <div className="rounded-[1.5rem] border border-gold/20 bg-gold/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-gold/60 mb-2">Contact us</p>
                <p className="text-sm text-white/60 leading-6">
                  Contact us for a personalized consultation and to explore our full capabilities.
                </p>
                <a href="tel:4102901118" className="mt-2 block text-xl font-semibold text-gold hover:text-gold/80 transition">
                  410-290-1118
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
