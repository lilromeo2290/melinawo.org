'use client';

import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Heart,
  Droplets,
  BookOpen,
  TreePine,
  Users,
  Globe,
  HandHeart,
  Calendar,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Send,
  DollarSign,
  Target,
  Award,
  ChevronUp,
  Star,
} from 'lucide-react';

/* ─────────────────────────────── Types ─────────────────────────────── */

interface Cause {
  id: string;
  title: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
  category: string;
  featured: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  order: number;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
}

interface Stats {
  fundsRaised: number;
  donors: number;
  projects: number;
  volunteers: number;
  countries: number;
}

/* ─────────────────────────── Hooks ─────────────────────────── */

function useAnimatedCounter(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const started = useRef(false);

  useEffect(() => {
    if ((!startOnView || inView) && !started.current) {
      started.current = true;
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, [inView, end, duration, startOnView]);

  return { count, ref };
}

/* ─────────────────────── Utility Components ─────────────────────── */

function SectionHeading({ tag, title, subtitle }: { tag: string; title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
    >
      <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium bg-ngo-green-50 text-ngo-green border-ngo-green-pale/50">
        {tag}
      </Badge>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
        {title}
      </h2>
      <p className="text-muted-foreground text-lg leading-relaxed">{subtitle}</p>
    </motion.div>
  );
}

function SectionContainer({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

/* ────────────────────────── Nav Icons ────────────────────────── */

const categoryIcons: Record<string, React.ReactNode> = {
  Environment: <Droplets className="h-5 w-5" />,
  Education: <BookOpen className="h-5 w-5" />,
  Community: <Users className="h-5 w-5" />,
  Humanitarian: <HandHeart className="h-5 w-5" />,
  Health: <Heart className="h-5 w-5" />,
};

const categoryColors: Record<string, string> = {
  Environment: 'bg-blue-100 text-blue-700',
  Education: 'bg-amber-100 text-amber-700',
  Community: 'bg-rose-100 text-rose-700',
  Humanitarian: 'bg-orange-100 text-orange-700',
  Health: 'bg-teal-100 text-teal-700',
};

const categoryGradients: Record<string, string> = {
  Environment: 'from-blue-600 to-blue-800',
  Education: 'from-amber-500 to-orange-500',
  Community: 'from-rose-500 to-pink-600',
  Humanitarian: 'from-orange-500 to-red-500',
  Health: 'from-teal-500 to-cyan-600',
};

/* ─────────────────────────── NAVBAR ─────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
      if (programsRef.current && !programsRef.current.contains(e.target as Node)) {
        setProgramsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const aboutSubmenu = [
    { label: 'Mission & Vision', href: '#mission-vision' },
    { label: 'Core Values', href: '#core-values' },
    { label: 'Team & Leadership', href: '#team' },
    { label: 'Board Members', href: '#team' },
  ];

  const programsSubmenu = [
    { label: 'Health Awareness, Screening & Empowerment', href: '#causes' },
    { label: "Women's Health & Endometriosis Awareness", href: '#causes' },
  ];

  const links = [
    { label: 'Home', href: '#', key: 'home' },
    { label: 'About Us', href: '#about', key: 'about', submenu: aboutSubmenu },
    { label: 'Programs', href: '#causes', key: 'programs', submenu: programsSubmenu, dropdownRef: 'programs' },
    { label: 'Our Impact', href: '#impact', key: 'impact' },
    { label: 'Resources', href: '#team', key: 'resources' },
    { label: 'Gallery', href: '#events', key: 'gallery' },
    { label: 'Contact Us', href: '#contact', key: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <img src="/logo.png" alt="MELINAWO FOUNDATION" className="h-9 w-auto" />
          <span className="text-lg font-bold text-foreground group-hover:text-ngo-green transition-colors">
            MELINAWO FOUNDATION
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) =>
            l.submenu ? (
              <div key={l.key} className="relative" ref={l.key === 'about' ? aboutRef : programsRef}>
                <button
                  onClick={() => l.key === 'about' ? setAboutOpen(!aboutOpen) : setProgramsOpen(!programsOpen)}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors inline-flex items-center gap-1"
                >
                  {l.label}
                  <ChevronUp className={`h-3 w-3 transition-transform ${(l.key === 'about' ? aboutOpen : programsOpen) ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {(l.key === 'about' ? aboutOpen : programsOpen) && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-border py-1.5 z-50"
                    >
                      {l.submenu.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                          onClick={() => { setAboutOpen(false); setProgramsOpen(false); }}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={l.key}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
              >
                {l.label}
              </a>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <a href="#donate">
              <Heart className="h-4 w-4 mr-1.5" />
              Donate
            </a>
          </Button>
          <Button size="sm" className="bg-ngo-green hover:bg-ngo-green-light text-white" asChild>
            <a href="#volunteer">Volunteer</a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l) =>
                l.submenu ? (
                  <div key={l.key}>
                    <button
                      onClick={() => l.key === 'about' ? setAboutOpen(!aboutOpen) : setProgramsOpen(!programsOpen)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                      {l.label}
                      <ChevronUp className={`h-4 w-4 transition-transform ${(l.key === 'about' ? aboutOpen : programsOpen) ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {(l.key === 'about' ? aboutOpen : programsOpen) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 overflow-hidden"
                        >
                          {l.submenu.map((sub) => (
                            <a
                              key={sub.label}
                              href={sub.href}
                              onClick={() => { setMobileOpen(false); setAboutOpen(false); setProgramsOpen(false); }}
                              className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                            >
                              {sub.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={l.key}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    {l.label}
                  </a>
                )
              )}
              <Separator className="my-2" />
              <div className="flex gap-2 pt-1">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a href="#donate" onClick={() => setMobileOpen(false)}>
                    <Heart className="h-4 w-4 mr-1.5" />
                    Donate
                  </a>
                </Button>
                <Button size="sm" className="flex-1 bg-ngo-green hover:bg-ngo-green-light text-white" asChild>
                  <a href="#volunteer" onClick={() => setMobileOpen(false)}>Volunteer</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */

function HeroSection() {
  const { count: causeCount, ref: causeRef } = useAnimatedCounter(6);
  const { count: countryCount, ref: countryRef } = useAnimatedCounter(23);
  const { count: donorCount, ref: donorRef } = useAnimatedCounter(18500);

  const scrollToDonate = () => {
    document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToCauses = () => {
    document.getElementById('causes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ngo-green-50 via-white to-ngo-green-50/30" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-ngo-green-pale/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-ngo-warm/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-ngo-green-pale/15 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Badge className="mb-6 px-4 py-1.5 bg-ngo-green text-white border-none text-sm font-medium">
              Making a Difference Since 2012
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Transforming Lives,{' '}
              <span className="text-ngo-green">Building Futures</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
              MELINAWO FOUNDATION is dedicated to creating sustainable change through community
              development, education, healthcare, and humanitarian support across 23 countries worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-ngo-green hover:bg-ngo-green-light text-white px-8 h-12 text-base font-semibold"
                onClick={scrollToDonate}
              >
                <Heart className="h-5 w-5 mr-2" />
                Donate Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 h-12 text-base font-semibold"
                onClick={scrollToCauses}
              >
                Explore Causes
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Right: Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-2 gap-4"
          >
            <StatCard
              icon={<Target className="h-6 w-6" />}
              value={causeCount}
              suffix=""
              label="Active Projects"
              ref={causeRef}
              delay={0}
            />
            <StatCard
              icon={<Globe className="h-6 w-6" />}
              value={countryCount}
              suffix="+"
              label="Countries Served"
              ref={countryRef}
              delay={0.1}
            />
            <StatCard
              icon={<Users className="h-6 w-6" />}
              value={donorCount}
              suffix="+"
              label="Global Donors"
              ref={donorRef}
              delay={0.2}
            />
            <StatCard
              icon={<Award className="h-6 w-6" />}
              value={14}
              suffix=""
              label="Years of Service"
              delay={0.3}
              staticValue
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto">
          <path
            d="M0 40C240 70 480 10 720 40C960 70 1200 10 1440 40V80H0V40Z"
            fill="white"
            fillOpacity="0.6"
          />
          <path d="M0 60C360 80 720 40 1080 60C1260 70 1380 55 1440 60V80H0V60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  value,
  suffix,
  label,
  ref,
  delay = 0,
  staticValue = false,
}: {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  ref?: React.Ref<HTMLSpanElement>;
  delay?: number;
  staticValue?: boolean;
}) {
  const { count, ref: counterRef } = useAnimatedCounter(value, 2000);
  const displayRef = ref || counterRef;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="border-0 shadow-lg shadow-ngo-green/5 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-5">
          <div className="w-10 h-10 rounded-lg bg-ngo-green-50 flex items-center justify-center text-ngo-green mb-3">
            {icon}
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground">
            <span ref={staticValue ? undefined : displayRef}>
              {staticValue ? value : count.toLocaleString()}
            </span>
            {suffix}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─────────────────────── ABOUT / MISSION ─────────────────────── */

function AboutSection() {
  const missions = [
    {
      icon: <Droplets className="h-7 w-7" />,
      title: 'Health Education and Community Outreach',
      desc: 'Bringing vital health knowledge directly to communities through workshops, outreach programs, and partnerships with local health organizations. We educate families on preventive care, nutrition, hygiene, and early detection to build healthier communities from the ground up.',
    },
    {
      icon: <Heart className="h-7 w-7" />,
      title: 'Free Health Screening and Surgical Support',
      desc: 'Organizing free health screening camps and providing access to surgical interventions for those who cannot afford treatment. Our medical teams work with hospitals and specialists to deliver life-changing procedures to underserved populations across multiple regions.',
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: 'Endometriosis Awareness and Advocacy',
      desc: 'Leading the charge to break the silence around endometriosis through awareness campaigns, early screening programs, and advocacy for better healthcare policies. We support women affected by this condition with resources, community networks, and access to specialized care.',
    },
    {
      icon: <HandHeart className="h-7 w-7" />,
      title: 'Support for Vulnerable Individuals and Families',
      desc: 'Providing direct assistance to vulnerable individuals and families through emergency relief, food support, shelter, and livelihood programs. We focus on those most in need — including children, elderly, persons with disabilities, and families affected by crisis.',
    },
  ];

  return (
    <SectionContainer id="about">
      <SectionHeading
        tag="Key Focus Areas"
        title="Key Focus Areas"
        subtitle="We believe that lasting change comes from empowering communities with the tools, knowledge, and resources they need to thrive independently."
      />

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-bold text-foreground">About Melinawo Foundation</h3>
          <p className="text-muted-foreground leading-relaxed">
            Melinawo Foundation is a registered non-governmental organization (NGO) based in Ghana, dedicated to improving the health and well-being of vulnerable individuals and underserved communities. Established with the mission of bringing quality healthcare closer to those who need it most, the Foundation provides health education, free medical screenings, support services, and life-changing surgical interventions for underprivileged populations.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            A key area of focus for Melinawo Foundation is women's health, with a strong commitment to raising awareness and providing support for individuals living with endometriosis. Through community outreach, education, advocacy, and strategic partnerships, the Foundation works to dispel myths and misconceptions surrounding endometriosis, promote early diagnosis, and improve access to timely, appropriate, and affordable medical care. The Foundation also champions the rights and well-being of women affected by the condition, helping them live healthier and more empowered lives.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Over the years, Melinawo Foundation has collaborated with healthcare professionals, volunteers, development partners, and community leaders to organize medical outreaches, health fairs, awareness campaigns, and surgical missions that have transformed countless lives. These initiatives reflect the Foundation's unwavering belief that quality healthcare is a fundamental human right and should be accessible to everyone, regardless of their socio-economic background.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Driven by compassion, integrity, and a commitment to sustainable impact, Melinawo Foundation continues to empower communities through preventive healthcare, advocacy, and life-changing medical interventions, creating healthier futures for individuals and families across Ghana.
          </p>
          </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
          id="mission-vision"
        >
          <div className="space-y-6">
            <div className="rounded-xl bg-ngo-green-50 p-6 border border-ngo-green-pale/50">
              <h4 className="text-lg font-bold text-ngo-green mb-3 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Our Mission
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                To promote accessible and equitable healthcare through education, screenings, medical support and advocacy for vulnerable populations, with a special emphasis on women's reproductive health.
              </p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-ngo-green to-ngo-teal p-6 text-white">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Our Vision
              </h4>
              <p className="text-white/90 leading-relaxed">
                A healthier, informed society where every individual especially the vulnerable has the opportunity to live a life free from preventable diseases and health related inequalities.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Core Values */}
      <div id="core-values" className="mt-12">
        <h3 className="text-2xl font-bold text-foreground text-center mb-8">Our Core Values</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: <Heart className="h-6 w-6" />,
              title: 'Compassion',
              desc: 'Serving with empathy and respect',
            },
            {
              icon: <Award className="h-6 w-6" />,
              title: 'Integrity',
              desc: 'Upholding transparency and accountability in all we do',
            },
            {
              icon: <Users className="h-6 w-6" />,
              title: 'Collaboration',
              desc: 'Working together with partners and communities for greater impact',
            },
            {
              icon: <BookOpen className="h-6 w-6" />,
              title: 'Empowerment',
              desc: 'Educating individuals to make informed health decisions',
            },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center p-5 rounded-xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-ngo-green-50 text-ngo-green flex items-center justify-center mx-auto mb-3">
                {v.icon}
              </div>
              <h4 className="font-bold text-foreground mb-1">{v.title}</h4>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission Pillars */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {missions.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow group">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-ngo-green-50 text-ngo-green flex items-center justify-center mb-4 group-hover:bg-ngo-green group-hover:text-white transition-colors">
                  {m.icon}
                </div>
                <h4 className="font-semibold text-foreground mb-2">{m.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-3 rounded-lg bg-muted/50">
      <p className="text-xl font-bold text-ngo-green">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}

/* ─────────────────────── CAUSES ─────────────────────── */

function CausesSection({ causes }: { causes: Cause[] }) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? causes : causes.filter((c) => c.featured);

  return (
    <SectionContainer id="causes" className="bg-muted/30">
      <SectionHeading
        tag="Our Causes"
        title="Support What Matters Most"
        subtitle="Every cause we champion is rooted in real community needs. Choose a cause close to your heart and help us create measurable, lasting impact."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.map((cause, i) => (
          <motion.div
            key={cause.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Card className="h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all group">
              {/* Image placeholder */}
              <div className={`h-44 bg-gradient-to-br ${categoryGradients[cause.category] || 'from-gray-400 to-gray-600'} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[cause.category] || 'bg-gray-100 text-gray-700'}`}>
                    {categoryIcons[cause.category]}
                    {cause.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold text-foreground px-2.5 py-1 rounded-full">
                    {Math.round((cause.raised / cause.goal) * 100)}% funded
                  </span>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-ngo-green transition-colors">
                  {cause.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                  {cause.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-ngo-green">
                      ${cause.raised.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">
                      of ${cause.goal.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(cause.raised / cause.goal) * 100} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="px-5 pb-5 pt-0">
                <Button
                  className="w-full bg-ngo-green hover:bg-ngo-green-light text-white"
                  onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Contribute
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {causes.length > 3 && (
        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAll(!showAll)}
            className="px-8"
          >
            {showAll ? 'Show Featured Only' : `View All ${causes.length} Causes`}
            <ArrowRight className={`h-4 w-4 ml-2 transition-transform ${showAll ? 'rotate-[-90deg]' : ''}`} />
          </Button>
        </div>
      )}
    </SectionContainer>
  );
}

/* ─────────────────────── IMPACT STATS ─────────────────────── */

function ImpactSection({ stats }: { stats: Stats }) {
  const statItems = [
    { label: 'Funds Raised', value: stats.fundsRaised, prefix: '$', suffix: '+', icon: <DollarSign className="h-6 w-6" /> },
    { label: 'Donors Worldwide', value: stats.donors, prefix: '', suffix: '+', icon: <Heart className="h-6 w-6" /> },
    { label: 'Active Projects', value: Math.max(stats.projects, 6), prefix: '', suffix: '', icon: <Target className="h-6 w-6" /> },
    { label: 'Countries Reached', value: 23, prefix: '', suffix: '', icon: <Globe className="h-6 w-6" /> },
  ];

  return (
    <SectionContainer id="impact">
      <SectionHeading
        tag="Our Impact"
        title="Numbers That Tell Our Story"
        subtitle="Behind every number is a real person whose life has been changed. Here is a snapshot of the impact we have made together with our supporters."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((item, i) => (
          <ImpactStatCard key={item.label} {...item} delay={i * 0.1} />
        ))}
      </div>
    </SectionContainer>
  );
}

function ImpactStatCard({
  label,
  value,
  prefix,
  suffix,
  icon,
  delay,
}: {
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  icon: React.ReactNode;
  delay: number;
}) {
  const { count, ref } = useAnimatedCounter(value, 2200);
  const isMoney = prefix === '$';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6 sm:p-8">
          <div className="w-14 h-14 rounded-2xl bg-ngo-green-50 text-ngo-green flex items-center justify-center mx-auto mb-4">
            {icon}
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
            <span ref={ref}>
              {prefix}
              {isMoney ? (count / 1000).toFixed(0) + 'K' : count.toLocaleString()}
            </span>
            {suffix}
          </p>
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─────────────────────── EVENTS ─────────────────────── */

function EventsSection({ events }: { events: Event[] }) {
  const eventGradients = [
    'from-ngo-green to-ngo-teal',
    'from-ngo-warm to-ngo-orange',
    'from-ngo-teal to-ngo-green',
    'from-ngo-red to-ngo-warm',
  ];

  const eventIcons = [
    <Star key="star" className="h-8 w-8" />,
    <Globe key="globe" className="h-8 w-8" />,
    <Droplets key="drops" className="h-8 w-8" />,
    <Heart key="heart" className="h-8 w-8" />,
  ];

  return (
    <SectionContainer id="events" className="bg-muted/30">
      <SectionHeading
        tag="Upcoming Events"
        title="Join Us in Making a Difference"
        subtitle="From charity galas to community outreach days, our events bring people together for a common purpose. Find an event near you or participate virtually."
      />

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all group h-full">
              <div className="flex flex-col sm:flex-row h-full">
                {/* Date Badge */}
                <div className={`sm:w-32 flex-shrink-0 bg-gradient-to-br ${eventGradients[i % eventGradients.length]} flex flex-col items-center justify-center p-5 text-white`}>
                  <div className="text-white/80 mb-1">{eventIcons[i % eventIcons.length]}</div>
                  <p className="text-3xl font-bold leading-none">
                    {new Date(event.date).getDate()}
                  </p>
                  <p className="text-sm font-medium mt-1 uppercase tracking-wider">
                    {new Date(event.date).toLocaleString('en-US', { month: 'short' })}
                  </p>
                  <p className="text-xs text-white/70 mt-0.5">
                    {new Date(event.date).getFullYear()}
                  </p>
                </div>

                <CardContent className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-ngo-green transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full sm:w-auto"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Calendar className="h-4 w-4 mr-1.5" />
                    Register Now
                  </Button>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}

/* ─────────────────────── TEAM ─────────────────────── */

function TeamSection({ team }: { team: TeamMember[] }) {
  const avatarColors = [
    'bg-ngo-green',
    'bg-ngo-warm',
    'bg-ngo-red',
    'bg-ngo-teal',
    'bg-ngo-orange',
    'bg-ngo-green-light',
  ];

  return (
    <SectionContainer id="team">
      <SectionHeading
        tag="Our Team"
        title="The People Behind the Mission"
        subtitle="Our diverse team of passionate professionals brings together expertise in development, operations, communications, and community engagement."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all group text-center">
              <CardContent className="p-6">
                <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-ngo-green-50">
                  <AvatarFallback className={`${avatarColors[i % avatarColors.length]} text-white text-xl font-bold`}>
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg text-foreground group-hover:text-ngo-green transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-ngo-green font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}

/* ─────────────────────── TESTIMONIALS ─────────────────────── */

function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  if (testimonials.length === 0) return null;

  const t = testimonials[active];

  return (
    <SectionContainer id="testimonials" className="bg-gradient-to-br from-ngo-teal to-ngo-green text-white relative overflow-hidden">
      <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

      <div className="relative z-10">
        <SectionHeading
          tag="Testimonials"
          title="Voices of Impact"
          subtitle="Hear from the people whose lives have been touched by our work — donors, volunteers, and community members share their experiences."
        />

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-ngo-amber text-ngo-amber" />
                ))}
              </div>
              <blockquote className="text-lg sm:text-xl leading-relaxed text-white/90 mb-8 italic">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-white/30">
                  <AvatarFallback className="bg-white/20 text-white font-semibold">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-white/70">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === active ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

/* ─────────────────────── DONATE ─────────────────────── */

function DonateSection({ causes }: { causes: Cause[] }) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [selectedCause, setSelectedCause] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (!amount || amount <= 0 || !donorName || !donorEmail) {
      setError('Please fill in all required fields with valid values.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: donorName,
          email: donorEmail,
          amount,
          causeId: selectedCause || undefined,
          message: donorMessage || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok && !data.success) {
        setError(data.errors?.[0]?.message || 'Something went wrong. Please try again.');
      } else {
        setSuccess(true);
        setDonorName('');
        setDonorEmail('');
        setDonorMessage('');
        setCustomAmount('');
        setSelectedAmount(50);
        setSelectedCause('');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionContainer id="donate">
      <SectionHeading
        tag="Make a Difference"
        title="Your Generosity Changes Lives"
        subtitle="Every contribution, no matter the size, directly funds our programs on the ground. Choose an amount and cause that speaks to you."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-ngo-green-50 rounded-t-xl p-6">
            <CardTitle className="flex items-center gap-2 text-ngo-green text-xl">
              <Heart className="h-5 w-5" />
              Donate Now
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-ngo-green-50 text-ngo-green flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Thank You!</h3>
                <p className="text-muted-foreground">
                  Your generous donation has been received. You will receive a confirmation email
                  shortly. Together, we are making a difference.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSuccess(false)}
                >
                  Make Another Donation
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2.5 rounded-lg text-sm font-semibold transition-all border-2 ${
                          selectedAmount === amt && !customAmount
                            ? 'border-ngo-green bg-ngo-green text-white'
                            : 'border-border bg-white text-foreground hover:border-ngo-green/50'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    placeholder="Or enter a custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      if (e.target.value) setSelectedAmount(null);
                    }}
                    min="1"
                    className="mt-1"
                  />
                </div>

                {/* Cause Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Designate a Cause (Optional)
                  </label>
                  <select
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">General Fund</option>
                    {causes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <Separator />

                {/* Donor Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Full Name *
                    </label>
                    <Input
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Message (Optional)
                  </label>
                  <Textarea
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    placeholder="Leave an encouraging message..."
                    rows={2}
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive font-medium">{error}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-ngo-green hover:bg-ngo-green-light text-white h-12 text-base font-semibold"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      <Heart className="h-5 w-5 mr-2" />
                      Complete Donation
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Your payment information is secure. 97% of your donation goes directly to programs.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </SectionContainer>
  );
}

/* ─────────────────────── NEWSLETTER / CONTACT ─────────────────────── */

function ContactSection() {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subSuccess, setSubSuccess] = useState('');

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubSuccess(data.message || 'Thank you for subscribing!');
        setEmail('');
        setTimeout(() => setSubSuccess(''), 5000);
      }
    } catch {
      setSubSuccess('');
    } finally {
      setSubscribing(false);
    }
  };

  const handleContact = async (e: FormEvent) => {
    e.preventDefault();
    setContactError('');
    setContactSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage,
        }),
      });
      const data = await res.json();
      if (!res.ok && !data.success) {
        setContactError(data.errors?.[0]?.message || 'Something went wrong.');
      } else {
        setContactSuccess(true);
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
      }
    } catch {
      setContactError('Network error. Please try again.');
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <SectionContainer id="contact" className="bg-muted/30">
      <SectionHeading
        tag="Get Involved"
        title="Join Our Movement"
        subtitle="Whether you want to volunteer, partner with us, or simply stay informed — we would love to hear from you."
      />

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="h-full border-0 shadow-md">
            <CardContent className="p-6 sm:p-8">
              <div className="w-12 h-12 rounded-xl bg-ngo-green-50 text-ngo-green flex items-center justify-center mb-4">
                <Send className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Stay Informed</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Subscribe to our newsletter for monthly impact updates, event invitations, and
                stories from the communities we serve. No spam — just meaningful updates about the
                change you are helping to create.
              </p>

              {subSuccess ? (
                <div className="bg-ngo-green-50 text-ngo-green p-4 rounded-lg text-sm font-medium">
                  {subSuccess}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    className="bg-ngo-green hover:bg-ngo-green-light text-white whitespace-nowrap"
                    disabled={subscribing}
                  >
                    {subscribing ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </form>
              )}

              <div className="mt-8 space-y-3">
                <h4 className="font-semibold text-sm text-foreground">What you will receive:</h4>
                {[
                  'Monthly impact reports with real stories',
                  'First access to event registrations',
                  'Volunteer opportunity alerts',
                  'Annual financial transparency report',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 text-ngo-green mt-0.5 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="h-full border-0 shadow-md" id="volunteer">
            <CardContent className="p-6 sm:p-8">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Contact Us</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Have questions about volunteering, partnerships, or our programs? Reach out and our
                team will respond within 24 hours.
              </p>

              {contactSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-14 h-14 rounded-full bg-ngo-green-50 text-ngo-green flex items-center justify-center mx-auto mb-3">
                    <Send className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-foreground mb-1">Message Sent!</h4>
                  <p className="text-sm text-muted-foreground">
                    We will get back to you within 24 hours.
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => setContactSuccess(false)}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleContact} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                      <Input
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                      <Input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Subject *</label>
                    <Input
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                    <Textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Tell us more about your inquiry..."
                      rows={4}
                      required
                    />
                  </div>
                  {contactError && (
                    <p className="text-sm text-destructive font-medium">{contactError}</p>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-ngo-green hover:bg-ngo-green-light text-white"
                    disabled={contactSubmitting}
                  >
                    {contactSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

/* ─────────────────────── VOLUNTEER CTA BANNER ─────────────────────── */

function VolunteerBanner() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-ngo-green to-ngo-teal" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you volunteer your time, donate resources, or simply spread the word — every
            action counts. Join our global community of changemakers today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-ngo-green hover:bg-white/90 px-8 h-12 text-base font-semibold"
              onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Heart className="h-5 w-5 mr-2" />
              Start Donating
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 h-12 text-base font-semibold"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Users className="h-5 w-5 mr-2" />
              Become a Volunteer
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── FOOTER ─────────────────────── */

function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const footerLinks = {
    'Get Involved': ['Donate', 'Volunteer', 'Partner With Us', 'Corporate Giving', 'Fundraise'],
    'About': ['Our Story', 'Team', 'Financial Reports', 'Careers', 'Press'],
    'Resources': ['Blog', 'Annual Report', 'FAQ', 'Privacy Policy', 'Terms of Use'],
  };

  return (
    <footer className="bg-ngo-teal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="MELINAWO FOUNDATION" className="h-9 w-auto brightness-0 invert" />
              <span className="text-lg font-bold">MELINAWO FOUNDATION</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Creating sustainable change through community development, education, healthcare, and
              humanitarian support since 2012.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <MapPin className="h-4 w-4" />
              123 Foundation Avenue, New York, NY 10001
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4 text-white">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>&copy; 2026 MELINAWO FOUNDATION. All rights reserved.</p>
          <p>
            Designed and Powered by <a href="https://clipe233eng.net/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors underline underline-offset-2">Clipe233 Engineers</a>
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-ngo-green text-white shadow-lg hover:bg-ngo-green-light transition-colors flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

/* ─────────────────────── MAIN PAGE ─────────────────────── */

export default function Home() {
  const [causes, setCauses] = useState<Cause[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState<Stats>({
    fundsRaised: 2450000,
    donors: 18500,
    projects: 6,
    volunteers: 3000,
    countries: 23,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [causesRes, eventsRes, teamRes, testimonialsRes, statsRes] = await Promise.all([
          fetch('/api/causes'),
          fetch('/api/events'),
          fetch('/api/team'),
          fetch('/api/testimonials'),
          fetch('/api/stats'),
        ]);

        const [causesData, eventsData, teamData, testimonialsData, statsData] = await Promise.all([
          causesRes.json(),
          eventsRes.json(),
          teamRes.json(),
          testimonialsRes.json(),
          statsRes.json(),
        ]);

        setCauses(causesData);
        setEvents(eventsData.slice(0, 2));
        setTeam(teamData.slice(0, 3));
        setTestimonials(testimonialsData);
        if (statsData.fundsRaised) setStats(statsData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-ngo-green/20 border-t-ngo-green animate-spin" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <EventsSection events={events} />
        <TeamSection team={team} />
        <TestimonialsSection testimonials={testimonials} />
        <DonateSection causes={causes} />
        <VolunteerBanner />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}