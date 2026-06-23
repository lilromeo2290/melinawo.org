---
Task ID: 1
Agent: Main Agent
Task: Develop an NGO website (GreenHope Foundation)

Work Log:
- Initialized fullstack development environment
- Designed Prisma schema with 8 models: Cause, Event, Donation, TeamMember, Testimonial, Subscriber, ContactMessage (+ existing User/Post)
- Pushed schema to SQLite and seeded with realistic data (6 causes, 4 events, 6 team members, 3 testimonials, 5 sample donations)
- Updated layout.tsx with NGO metadata, SEO tags, and GreenHope Foundation branding
- Customized globals.css with NGO-themed green/earth tone color variables
- Created 8 API routes: /api/donate (POST/GET), /api/subscribe, /api/contact, /api/causes, /api/events, /api/team, /api/testimonials, /api/impact, /api/stats
- Built full single-page NGO website with 10 sections: Navbar, Hero, About/Mission, Causes, Impact Stats, Events, Team, Testimonials, Donate, Volunteer CTA, Contact/Newsletter, Footer
- All interactions verified via agent-browser: donation form (201), newsletter subscribe (201), contact form (201), success states confirmed
- ESLint passes with 0 errors

Stage Summary:
- Complete NGO website deployed at / route
- Database seeded with realistic demo data
- All forms functional with Zod validation and Prisma persistence
- Responsive design with Framer Motion animations
- Green/earth-tone color theme with shadcn/ui components