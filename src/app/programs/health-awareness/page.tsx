'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Shield, CheckCircle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const objectives = [
  'Promote health awareness through education and community engagement.',
  'Encourage preventive healthcare and healthy lifestyle choices.',
  'Increase access to free and affordable health screening services.',
  'Support early detection and timely referral for medical care.',
  'Empower vulnerable populations with knowledge to make informed health decisions.',
  'Reduce the incidence of preventable diseases through continuous education and advocacy.',
  'Foster partnerships that improve access to quality healthcare services.',
];

const activities = [
  'Community health education and awareness campaigns',
  'Free and subsidized health screening exercises',
  'Health talks, seminars, and workshops',
  'Preventive healthcare and wellness promotion',
  'Sexual and reproductive health education',
  'Maternal and child health awareness',
  'Mental health education and advocacy',
  'Nutrition and healthy lifestyle promotion',
  'Referrals and linkage to healthcare services',
  'Community empowerment through health information and skills development',
];

export default function HealthAwarenessPage() {
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
              Health Awareness, Screening & Empowerment
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              A flagship initiative dedicated to promoting preventive healthcare, early disease detection, and informed health decision-making within communities.
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
              Our mission is to improve the health and well-being of individuals and communities by promoting health education, preventive care, early disease detection, and empowering people with the knowledge and resources needed to make informed health decisions. We are committed to ensuring that quality health information and essential screening services are accessible to all, especially vulnerable and underserved populations.
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
                The Health Awareness, Screening & Empowerment program is a flagship initiative of the Melinawo Foundation dedicated to promoting preventive healthcare, early disease detection, and informed health decision-making within communities.
              </p>
              <p>
                Through community outreach, educational campaigns, health screenings, and capacity-building activities, the Foundation equips individuals with the knowledge and resources they need to lead healthier lives. We focus on increasing awareness of common health conditions, encouraging regular medical check-ups, and reducing the burden of preventable diseases through early intervention.
              </p>
              <p>
                The program empowers women, children, youth, persons with disabilities, and other vulnerable groups by providing accurate health information, promoting healthy lifestyles, and connecting individuals with essential healthcare services. By strengthening health literacy and encouraging community participation, we strive to build healthier, more resilient communities where everyone has the opportunity to thrive.
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
              Your contribution helps us bring life-saving health education and screening services to communities across Ghana.
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