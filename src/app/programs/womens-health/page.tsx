'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Shield, CheckCircle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const objectives = [
  'Raise awareness about endometriosis and its impact on women\'s health.',
  'Advocate for early diagnosis and timely treatment of endometriosis.',
  'Provide free screening and support services for women at risk.',
  'Create safe spaces for women to share experiences and access psychosocial support.',
  'Educate healthcare providers and communities on endometriosis recognition and management.',
  'Partner with medical institutions to improve access to specialized care.',
  'Reduce stigma and misinformation surrounding endometriosis and women\'s health conditions.',
];

const activities = [
  'Endometriosis awareness campaigns in schools, workplaces, and communities',
  'Free health screening and medical consultations for women',
  'Support group meetings for women living with endometriosis',
  'Educational workshops on women\'s reproductive health',
  'Advocacy for policy changes in women\'s healthcare access',
  'Partnerships with hospitals and specialists for referral and treatment',
  'Public lectures and media engagement on endometriosis',
  'Distribution of educational materials on women\'s health',
  'Capacity building for community health workers on endometriosis',
  'Psychosocial support and counseling for affected women and families',
];

export default function WomensHealthPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-br from-[#0033A0] to-[#001a54] text-white py-20 px-4">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/#causes">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Heart className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-white/70 uppercase tracking-wider">Our Programs</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Women&apos;s Health & Endometriosis Awareness
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Breaking the silence around endometriosis and women&apos;s health issues through awareness, free screening programs, and support networks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-br from-[#0033A0] to-[#001a54] p-8 sm:p-10 text-white"
          >
            <div className="flex items-center gap-3 mb-5">
              <Shield className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Mission Statement</h2>
            </div>
            <p className="text-white/90 leading-relaxed text-base sm:text-lg">
              Our mission is to break the silence surrounding endometriosis and other women&apos;s health conditions by raising awareness, providing access to early diagnosis and treatment, and building a strong support network for affected women across Ghana. We are committed to ensuring that no woman suffers in silence and that every woman has access to the care, information, and support she deserves.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About the Program */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">About the Program</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                The Women&apos;s Health & Endometriosis Awareness program is a dedicated initiative of the Melinawo Foundation focused on addressing the critical but often overlooked issue of endometriosis and broader women&apos;s health concerns in Ghana.
              </p>
              <p>
                Endometriosis affects millions of women worldwide, yet it remains poorly understood, frequently misdiagnosed, and shrouded in stigma. Through this program, the Foundation works to change the narrative by educating communities, training healthcare workers, and providing direct support to women affected by this debilitating condition.
              </p>
              <p>
                Our program partners with medical professionals, hospitals, and specialist clinics to provide free screening, early diagnosis, and treatment access. We also facilitate support groups where women can share their experiences, access psychosocial counseling, and find strength in community. By amplifying the voices of women living with endometriosis, we advocate for better healthcare policies and increased funding for women&apos;s health research and services.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Objectives */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Our Objectives</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {objectives.map((obj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <CheckCircle className="h-5 w-5 mt-0.5 text-[#0033A0] shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{obj}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Activities */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Key Activities</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {activities.map((act, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border shadow-sm"
                >
                  <Activity className="h-5 w-5 mt-0.5 text-[#FF3333] shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{act}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Support This Program</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Your contribution helps us provide life-changing support to women living with endometriosis across Ghana.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#FF3333] hover:bg-[#cc2929] text-white px-8">
                <Heart className="h-5 w-5 mr-2" />
                Donate Now
              </Button>
              <Button size="lg" variant="outline" className="px-8" asChild>
                <Link href="/#causes">Explore All Programs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#001a54] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-white/60">&copy; 2026 MELINAWO FOUNDATION. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}