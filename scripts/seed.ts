import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding database...');

  // Seed Causes
  const causes = [
    {
      title: 'Health Awareness, Screening & Empowerment',
      description: 'Providing comprehensive health education, community screening programs, and empowerment initiatives to underserved populations. We conduct regular health screenings, distribute vital health information, and train community health workers to sustain long-term wellness outcomes.',
      image: '/causes/health-awareness.jpg',
      raised: 42000,
      goal: 65000,
      category: 'Health',
      featured: true,
    },
    {
      title: "Women's Health & Endometriosis Awareness",
      description: 'Breaking the silence around endometriosis and women\'s health issues through awareness campaigns, free screening programs, and support networks. We partner with medical professionals to provide early diagnosis, treatment access, and emotional support for women affected by this condition.',
      image: '/causes/womens-health.jpg',
      raised: 31500,
      goal: 50000,
      category: 'Health',
      featured: true,
    },
    {
      title: 'Clean Water Initiative',
      description: 'Providing access to clean, safe drinking water to communities in developing regions. We build wells, install filtration systems, and educate communities on water sanitation practices to ensure long-term sustainability of water resources.',
      image: '/causes/water.jpg',
      raised: 34500,
      goal: 50000,
      category: 'Environment',
      featured: true,
    },
    {
      title: 'Education for Every Child',
      description: 'Building schools, training teachers, and providing learning materials to underserved communities. Our programs focus on primary education, digital literacy, and vocational training to create lasting opportunities for the next generation.',
      image: '/causes/education.jpg',
      raised: 67800,
      goal: 80000,
      category: 'Education',
      featured: true,
    },
    {
      title: 'Community Development',
      description: 'Working with local leaders to build infrastructure, create economic opportunities, and strengthen community resilience. Our integrated approach addresses livelihoods, food security, and social cohesion across 23 countries.',
      image: '/causes/community.jpg',
      raised: 28900,
      goal: 40000,
      category: 'Community',
      featured: false,
    },
    {
      title: 'Emergency Relief',
      description: 'Delivering nutritious meals and essential supplies to communities affected by natural disasters, conflict, and economic hardship. Our rapid-response teams work around the clock to ensure no one goes hungry during crises.',
      image: '/causes/food.jpg',
      raised: 45600,
      goal: 60000,
      category: 'Humanitarian',
      featured: false,
    },
  ];

  for (const cause of causes) {
    await prisma.cause.upsert({
      where: { id: cause.title.toLowerCase().replace(/\s+/g, '-') },
      update: cause,
      create: { ...cause, id: cause.title.toLowerCase().replace(/\s+/g, '-') },
    });
  }
  console.log(`Seeded ${causes.length} causes`);

  // Seed Events
  const events = [
    {
      id: 'annual-gala-2026',
      title: 'Annual Charity Gala 2026',
      description: 'An elegant evening of celebration, inspiration, and generosity. Join us for fine dining, live entertainment, and silent auctions — all supporting our global initiatives.',
      date: new Date('2026-09-15T18:00:00Z'),
      location: 'Grand Ballroom, The Ritz-Carlton, New York',
      image: '/events/gala.jpg',
    },
    {
      id: 'tree-planting-day',
      title: 'Community Tree Planting Day',
      description: 'Roll up your sleeves and help us plant 5,000 native trees in Riverside Park. Families welcome — we will provide all tools, snacks, and a fun educational program for kids.',
      date: new Date('2026-07-20T09:00:00Z'),
      location: 'Riverside Park, Portland, Oregon',
      image: '/events/tree-planting.jpg',
    },
    {
      id: 'clean-water-run',
      title: 'Run for Clean Water 5K/10K',
      description: 'Every mile you run helps provide clean water to a family for a month. Join hundreds of runners for a scenic course along the waterfront, with medals, prizes, and a post-race festival.',
      date: new Date('2026-08-10T07:00:00Z'),
      location: 'Waterfront Trail, Chicago, Illinois',
      image: '/events/run.jpg',
    },
    {
      id: 'workshop-sustainability',
      title: 'Sustainability Workshop Series',
      description: 'A three-day workshop on sustainable living, renewable energy, and community resilience. Expert speakers, hands-on activities, and actionable takeaways for everyday life.',
      date: new Date('2026-10-05T10:00:00Z'),
      location: 'Green Community Center, Austin, Texas',
      image: '/events/workshop.jpg',
    },
  ];

  for (const event of events) {
    await prisma.event.upsert({
      where: { id: event.id },
      update: event,
      create: event,
    });
  }
  console.log(`Seeded ${events.length} events`);

  // Seed Team Members
  const team = [
    {
      id: 'raphael-tumawu',
      name: 'Raphael Tudiza Tumawu',
      role: 'CEO and Founder',
      bio: 'With a deep passion for community-driven change, Raphael founded MELINAWO FOUNDATION to create sustainable impact in health, education, and empowerment. His leadership and vision continue to drive the foundation’s mission forward.',
      image: '/team/raphael.jpg',
      order: 0,
    },
    {
      id: 'cynthia-tumawu',
      name: 'Cynthia Woelinam Tumawu',
      role: 'Co Founder & Executive Director',
      bio: 'Cynthia co-founded MELINAWO FOUNDATION and leads its day-to-day operations with dedication and strategic insight. Her commitment to women’s health and community empowerment shapes the foundation’s most impactful programs.',
      image: '/team/cynthia.jpg',
      order: 1,
    },
    {
      id: 'maria-gonzalez',
      name: 'Maria Gonzalez',
      role: 'Head of Fundraising',
      bio: 'Maria brings 15 years of nonprofit fundraising experience, having raised over $50 million for various causes. She is passionate about building lasting donor relationships.',
      image: '/team/maria.jpg',
      order: 2,
    },
    {
      id: 'david-kim',
      name: 'David Kim',
      role: 'Director of Operations',
      bio: 'David ensures our operations run smoothly and efficiently across all regions. His expertise in logistics and project management keeps our programs on track and within budget.',
      image: '/team/david.jpg',
      order: 3,
    },
    {
      id: 'amira-hassan',
      name: 'Amira Hassan',
      role: 'Community Outreach Manager',
      bio: 'Amira connects our work with the communities we serve. With a background in social work, she builds trust and partnerships that amplify our collective impact.',
      image: '/team/amira.jpg',
      order: 4,
    },
    {
      id: 'tom-ward',
      name: 'Tom Ward',
      role: 'Communications Director',
      bio: 'Tom tells the stories that matter. Through compelling content and strategic media outreach, he helps the world understand the importance of our mission and the impact of their support.',
      image: '/team/tom.jpg',
      order: 5,
    },
  ];

  for (const member of team) {
    await prisma.teamMember.upsert({
      where: { id: member.id },
      update: member,
      create: member,
    });
  }
  console.log(`Seeded ${team.length} team members`);

  // Seed Testimonials
  const testimonials = [
    {
      id: 't1',
      name: 'Emily Rodriguez',
      role: 'Monthly Donor since 2021',
      content: 'MELINAWO FOUNDATION has shown me exactly where my donations go. The transparency and impact reports are incredible — I can see the schools being built and the wells being dug. It feels amazing to be part of something so tangible and meaningful.',
      image: '/testimonials/emily.jpg',
    },
    {
      id: 't2',
      name: 'Rev. Michael Thompson',
      role: 'Partner Community Leader',
      content: 'When MELINAWO FOUNDATION came to our village, they did not just bring resources — they brought dignity. They listened to us, worked alongside us, and empowered us to lead our own development. Our community has been transformed.',
      image: '/testimonials/michael.jpg',
    },
    {
      id: 't3',
      name: 'Aisha Patel',
      role: 'Volunteer Coordinator',
      content: 'Volunteering with MELINAWO FOUNDATION changed my life. I went thinking I would help others, but the experience opened my eyes to the resilience and strength of communities facing incredible challenges. I have been inspired beyond words.',
      image: '/testimonials/aisha.jpg',
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: t,
      create: t,
    });
  }
  console.log(`Seeded ${testimonials.length} testimonials`);

  // Seed some sample donations
  const sampleDonations = [
    { name: 'John Smith', email: 'john@example.com', amount: 250, message: 'Keep up the great work!' },
    { name: 'Jane Doe', email: 'jane@example.com', amount: 100, causeId: 'clean-water-initiative', message: 'For clean water for all.' },
    { name: 'Anonymous', email: 'anon@example.com', amount: 500, message: '' },
    { name: 'Robert Johnson', email: 'robert@example.com', amount: 75, causeId: 'education-for-every-child' },
    { name: 'Lisa Wong', email: 'lisa@example.com', amount: 150, message: 'Proud to support this cause.' },
  ];

  for (const d of sampleDonations) {
    await prisma.donation.create({ data: d });
  }
  console.log(`Seeded ${sampleDonations.length} sample donations`);

  console.log('Seed complete!');
}

seed()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());