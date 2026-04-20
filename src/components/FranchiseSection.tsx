import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';

interface FranchiseForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL: FranchiseForm = { firstName: '', lastName: '', email: '', phone: '', message: '' };

function Field({
  label, icon: Icon, error, textarea, ...props
}: { label: string; icon?: React.ElementType; error?: string; textarea?: boolean } & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
  const base =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-gold/60 focus:ring-1 focus:ring-gold/30';
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs uppercase tracking-widest text-white/40">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />}
        {textarea ? (
          <textarea
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            rows={5}
            className={`${base} resize-none`}
          />
        ) : (
          <input {...props as React.InputHTMLAttributes<HTMLInputElement>} className={`${base} ${Icon ? 'pl-9' : ''}`} />
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default function FranchiseSection() {
  const [form, setForm] = useState<FranchiseForm>(INITIAL);
  const [errors, setErrors] = useState<Partial<FranchiseForm>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof FranchiseForm, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2: Partial<FranchiseForm> = {};
    if (!form.firstName.trim()) e2.firstName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e2.email = 'Valid email required';
    setErrors(e2);
    if (Object.keys(e2).length) return;
    setSent(true);
  };

  return (
    <section id="franchise" data-scroll className="relative overflow-hidden px-6 py-10 sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.07),_transparent_60%)]" />

      <div className="relative mx-auto max-w-2xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-gold">Franchise</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Be part of the<br />
            <span className="text-gold">Franchise.</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/50">
            Would you like to have your own Dwaraka's Bawarchi place? Be a part of the franchise and bring authentic Indian flavors to your city.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-[2rem] border border-white/10 bg-black/60 p-8 shadow-card backdrop-blur-xl"
        >
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20">
                <HiOutlineMail className="text-2xl text-gold" />
              </span>
              <h3 className="text-xl font-semibold text-white">Message Sent!</h3>
              <p className="text-sm text-white/50">We'll review your inquiry and get back to you shortly.</p>
              <button
                onClick={() => { setSent(false); setForm(INITIAL); }}
                className="mt-2 rounded-full border border-white/15 px-6 py-2.5 text-sm text-white/60 transition hover:border-gold/40 hover:text-gold"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First Name" icon={HiOutlineUser} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Arjun" error={errors.firstName} />
                <Field label="Last Name" value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Sharma" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" icon={HiOutlineMail} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" error={errors.email} />
                <Field label="Phone" icon={HiOutlinePhone} type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="9876543210" />
              </div>
              <Field label="Message" textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us about yourself and your interest in the franchise..." />
              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-gold py-3.5 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-gold/90 active:scale-[0.98]"
              >
                Send Inquiry
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
