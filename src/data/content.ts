// ---------------------------------------------------------------------------
// All For STEAM — single source of truth for real site content.
//
// Everything in this file was pulled directly from the live site
// (allforsteam.org) and the organization's own linktree/social channels, or
// supplied directly by the founder. Fields explicitly marked PLACEHOLDER are
// still waiting on real figures/copy — swap them here and every section that
// renders them updates automatically.
// ---------------------------------------------------------------------------

export const site = {
  name: "All For STEAM",
  shortName: "All For STEAM",
  tagline: "Making STEAM Accessible for Every Child.",
  description:
    "All For STEAM is a student-run nonprofit providing free tutoring, workshops, and mentorship in Science, Technology, Engineering, Arts, and Mathematics to K-8 students worldwide.",
  founded: "2024",
};

export const links = {
  tutorApplication: "http://bit.ly/allforsteamtutorapplication",
  joinForm: "https://forms.gle/J7asPFZwRKAmow3N7",
  instagram: "https://www.instagram.com/allforsteam",
  // NOTE: the LinkedIn URL supplied was your logged-in admin dashboard link
  // (/company/112467032/admin/dashboard/), which only works while you're
  // signed in and isn't meant to be public. This is the public page for the
  // same company ID — double check it resolves to your page before launch.
  linkedin: "https://www.linkedin.com/company/112467032/",
  email: "allforsteamorg@gmail.com",
  linktree: "https://linktr.ee/allforsteam",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Our Mission", href: "/mission" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const announcement = {
  text: "Are you a high schooler interested in tutoring? Click here to apply now.",
  href: links.tutorApplication,
};

export const hero = {
  headline: site.name,
  tagline: site.tagline,
  primaryCta: { label: "Join Us Today", href: links.joinForm },
  secondaryCta: { label: "Explore Opportunities", href: "/opportunities" },
};

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  note: string;
}

export const impact = {
  kicker: "Our Impact In Numbers",
  title: "Real numbers behind the mission",
  body: "Every workshop, tutoring session, and chapter is run by students, for students. Here's the scale we've built together so far.",
};

// Ordered to ascend: 15 -> 50+ -> 400+ -> 1,000+.
export const stats: Stat[] = [
  { value: 15, suffix: "", label: "Team Members", note: "Tutors, leads, and advisors" },
  { value: 50, suffix: "+", label: "Workshops Run", note: "Since 2024" },
  { value: 400, suffix: "+", label: "Students Taught", note: "And counting" },
  { value: 1000, suffix: "+", label: "Hours of Impact", note: "Across tutoring and workshops" },
];

export const programs = [
  {
    title: "Tutoring",
    description:
      "Personalized, one-on-one tutoring sessions that help K-8 students build confidence and excel across Science, Technology, Engineering, Arts, and Mathematics.",
    tag: "1:1 Support",
  },
  {
    title: "Workshops",
    description:
      "Live, engaging workshops spanning coding, math, science, and art, led by our own high-school volunteers and designed to make STEAM tangible.",
    tag: "Live Sessions",
  },
  {
    title: "STEM Competitions",
    description:
      "Opportunities to apply new skills in exciting STEM competitions, giving students a stage to test what they've learned.",
    tag: "Apply Skills",
  },
  {
    title: "Talk To Me",
    description:
      "A bimonthly, anonymous, judgment-free space on Zoom, open to everyone. Students can vent and talk things through without ever feeling alone or sharing their identity.",
    tag: "Peer Support",
  },
];

export const whatWeDo = {
  title: "What We Do",
  body: "From personalized tutoring to full-scale workshops, and a space to just talk, everything we run is designed by our own high-school team.",
};

export const mission = {
  title: "Our Mission",
  body: "Why we started, who we serve, and the kind of STEAM community we're building — one workshop and one student at a time.",
  paragraphs: [
    "We are a group of high school students passionate about making a difference in STEAM education. Through our organization, All For STEAM, we provide online workshops and tutoring sessions to help children from K-8 excel in Science, Technology, Engineering, Arts, and Mathematics.",
    "Our mission is to help students across the world, especially from underrepresented groups in STEM, apply their passions and improve their skills through an expansive and highly integrated community. We believe that STEM should be both collaborative and interdisciplinary, and through our efforts, students across the globe have embraced this as well. Join us in fostering a love for learning and making STEM education accessible to all.",
  ],
  image: "/photos/about-hero-boy.jpg",
};

export interface Testimonial {
  quote: string;
  name: string;
  type: "parent" | "student";
}

export const testimonialsSection = {
  kicker: "Testimonials",
  title: "Real feedback from parents and students",
  body: "Genuine feedback from the families and students who have taken part in our programs.",
};

// Real feedback supplied directly by the founder.
export const testimonials: Testimonial[] = [
  {
    quote: "Clear and easy to understand, contained an appropriate amount of information.",
    name: "Hussain M.",
    type: "parent",
  },
  {
    quote:
      "My son had never been interested in coding before, but after the Scratch workshop he kept asking if he could make another game. I was so happy to see him excited about something new!",
    name: "Daniel B.",
    type: "parent",
  },
  {
    quote:
      "The workshop was very well organized and the content was easy for my daughter to follow. It was the perfect amount of information without feeling overwhelming. Arshia was amazing!",
    name: "Mei Z.",
    type: "parent",
  },
  {
    quote:
      "I really loved the Intro to Anatomy Workshop. Adyanshi did a wonderful job explaining the concepts in a way that was understandable for younger students, and my daughter was completely engaged.",
    name: "Kavita P.",
    type: "student",
  },
  {
    quote:
      "The math workshop was fantastic! Saanvi made the activities fun and interactive, and my daughter actually asked me if she could sign up for more workshops.",
    name: "Meghna J.",
    type: "parent",
  },
  {
    quote:
      "My daughter really enjoyed the Color and Shading Workshop. Dhruthi was so encouraging and gave the students room to experiment with their own ideas.",
    name: "Emily N.",
    type: "parent",
  },
  {
    quote:
      "Everything was clear from the beginning, and the workshop moved at a comfortable pace. I also really liked how Rutvi made sure all of us had time to ask questions.",
    name: "Aisha W.",
    type: "student",
  },
  {
    quote:
      "My son came into the coding workshop knowing absolutely nothing about programming and left with his own little project. He was so proud of himself!",
    name: "Rajiv M.",
    type: "parent",
  },
  {
    quote:
      "The Intro to Astronomy Workshop was probably my son's favorite workshop so far. He wouldn't stop talking about planets and stars afterward!",
    name: "Fatima A.",
    type: "parent",
  },
  {
    quote:
      "Arshia did a wonderful job organizing the workshop. Everything felt thoughtful and well planned, and it was clear that the team genuinely wanted the students to have a good experience.",
    name: "Carlos H.",
    type: "parent",
  },
  {
    quote:
      "My son absolutely loved his middle school science tutoring sessions. Harshini made the material feel much less intimidating and always encouraged him to ask questions instead of just giving him the answers.",
    name: "Sofia R.",
    type: "parent",
  },
  {
    quote:
      "The tutoring sessions were incredibly helpful for my son's middle school art class. Ishani was encouraging and helped him understand techniques without taking away his own creative ideas. He became much more confident in his work.",
    name: "Marcus W.",
    type: "parent",
  },
];

export const joinCta = {
  heading: "Join us today!",
  body: mission.paragraphs[0],
  cta: { label: "Sign up now", href: links.joinForm },
  image: "/photos/welcome-girl.jpg",
};

export interface TeamMember {
  name: string;
  role: string;
  location: string;
  photo: string;
  bio?: string;
  /** Overrides the team grid's default 35% grayscale-on-photo treatment
   * for photos where that reads as too washed out. */
  photoGrayscale?: number;
}

// Real roster, scraped in on-site order from allforsteam.org/about. The
// India Chapter Head sits inline with everyone else here (rather than a
// separate section) so the grid reads as one team of fifteen.
export const team: TeamMember[] = [
  {
    name: "Arshia Ghatak",
    role: "Founder & Director",
    location: "CA, USA",
    photo: "/team/arshia-ghatak.jpg",
    photoGrayscale: 12,
    bio: "Arshia Ghatak is a high school student from the Bay Area who is passionate about using technology, education, and creativity to create meaningful impact. Through research, community leadership, and education, she strives to turn what she learns into opportunities for others. As the founder and director of All for STEAM, Arshia works to make STEAM education more accessible through free workshops, mentorship, and hands-on learning opportunities for younger students. She hopes to empower students to explore, create, and use their knowledge to make a difference in their communities.",
  },
  { name: "Shreya Kishore", role: "Organization Management", location: "CA, USA", photo: "/team/shreya-kishore.jpg" },
  { name: "Alyssa Del Mundo", role: "Director of Outreach", location: "CA, USA", photo: "/team/alyssa-del-mundo.jpg" },
  { name: "Adyanshi Pati", role: "Science Lead", location: "CA, USA", photo: "/team/adyanshi-pati.jpg" },
  { name: "Rutvi Mudalagi", role: "Technology Lead", location: "CA, USA", photo: "/team/rutvi-mudalagi.jpg" },
  { name: "Dhruthi Srikishen", role: "Arts Lead", location: "CA, USA", photo: "/team/dhruthi-srikishen.jpg" },
  { name: "Saanvi Harshith", role: "Math Lead", location: "CA, USA", photo: "/team/saanvi-harshith.jpg" },
  { name: "Nirav Padubidri Prabhu", role: "Curriculum Advisor", location: "CA, USA", photo: "/team/nirav-padubidri-prabhu.jpg" },
  { name: "Siddharth Vedam", role: "Curriculum Advisor & Program Manager", location: "CA, USA", photo: "/team/siddharth-vedam.jpg" },
  { name: "Dhruv Redkar", role: "Curriculum Advisor", location: "CA, USA", photo: "/team/dhruv-redkar.jpg" },
  { name: "Jahnavi Alavilli", role: "Tutor", location: "CA, USA", photo: "/team/jahnavi-alavilli.jpg" },
  { name: "Harshini Elamparithi", role: "Tutor", location: "CA, USA", photo: "/team/harshini-elamparithi.jpg" },
  { name: "Akshita Nagarajan", role: "Tutor", location: "CA, USA", photo: "/team/akshita-nagarajan.jpg" },
  { name: "Ishani Paul", role: "Tutor", location: "CA, USA", photo: "/team/ishani-paul.jpg" },
  { name: "Nirvaan Duggirala", role: "India Chapter Head", location: "India", photo: "/team/nirvaan-duggirala.jpg" },
];

export const contact = {
  heading: "Contact",
  body: "Have questions or feedback? We'll respond as soon as we can.",
  subheading: `Get in touch through this form or email ${links.email}.`,
  email: links.email,
};

export const stayConnected = {
  heading: "Stay Connected",
  body: "Follow along for new workshops, upcoming events, and behind-the-scenes moments from the All For STEAM community.",
  socials: [
    { label: "Instagram", handle: "@allforsteam", href: links.instagram },
    { label: "LinkedIn", handle: "All For STEAM", href: links.linkedin },
  ],
};

export const footer = {
  copyright: `Copyright © ${new Date().getFullYear()} ALL FOR STEAM. All Rights Reserved.`,
  tagline: site.tagline,
};
