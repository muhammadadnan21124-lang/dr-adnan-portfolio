export type PortfolioData = {
  name: string;
  greeting: string;
  title: string;
  subtitle: string;
  intro: string;
  location: string;
  institution: string;
  email: string;
  phone: string;
  stats: { value: string; label: string }[];
  socials: { linkecom: string; whatsapp: string };
  about: string;
  expertise: { title: string; image: string }[];
  impactText: string;
  leadership: { role: string; org: string }[];
  digital: string[];
  research: string[];
  certificates: { title: string; issuer: string; year: string }[];
};

export const defaultData: PortfolioData = {
  name: "DR. ADNAN HASSAN",
  greeting: "Assalamu Alaikum,",
title: "BDS Intern Doctor | Researcher | Community Healthcare Advocate",
subtitle: "Clinical Dentistry • Research • Primary Healthcare • Community Service",
intro: "Committed to ethical dental care, evidence-based practice, research, and delivering accessible primary healthcare to underserved and vulnerable communities.",
  location: "Dhaka, Bangladesh",
  institution: "BDS, University Dental College & Hospital, University of Dhaka",
  email: "muhammad.adnan21124@gmail.com",
  phone: "+8801309081990",
  stats: [
    { value: "47+", label: "Free Medical / Dental Camps" },
    { value: "45,000+", label: "People Served" },
    { value: "380+ Lakh BDT", label: "Charity Work (Free)" },
    { value: "1,000+", label: "Clinical Cases Handled" },
    { value: "5+", label: "Research Projects" }
  ],
  socials: {
    linkedin: "https://www.linkedin.com/in/adnan-hasan-06b430220?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  whatsapp: "https://wa.me/@Dr.Adnan_Hassan"
  },
  about: "I am a BDS Intern Doctor with a strong foundation in clinical dentistry and a growing focus on Conservative Dentistry, Aesthetic Dentistry, Restorative Care, and Digital Dentistry. My clinical approach is grounded in careful patient assessment, evidence-based decision-making, effective communication, and a strong commitment to ethical and compassionate care. Beyond clinical practice, I have a deep interest in research, academic learning, and the application of digital innovation to modern dentistry. I continuously strive to strengthen my clinical skills, expand my knowledge, and develop a multidisciplinary perspective toward healthcare. Community healthcare is an equally important part of my professional journey. I have been actively involved in providing free primary healthcare and dental care to underserved and vulnerable communities through rural health initiatives and medical and dental camps. Working closely with people from disadvantaged backgrounds has strengthened my empathy, sense of responsibility, communication skills, and commitment to making healthcare more accessible. I believe an effective healthcare professional should combine clinical competence with empathy, integrity, continuous learning, leadership, and a genuine commitment to service. My long-term goal is to bring together clinical dentistry, research, digital innovation, and community healthcare to create meaningful and sustainable impact.",
  expertise: [
    { title: "Conservative Dentistry", image: "/clinical-1.png" },
    { title: "Aesthetic Dentistry", image: "/clinical-2.png" },
    { title: "Restorative Procedures", image: "/clinical-3.png" },
    { title: "Vital Pulp Therapy", image: "/clinical-4.png" },
    { title: "Preventive & Patient Care", image: "/clinical-5.png" }
  ],
  impactText: "I have organized and been part of 48+ rural medical & dental camps across Bangladesh, providing free healthcare to 45,000+ people.",
  leadership: [
    { role: "Dental Coordinator", org: "Dreamers Consultant & Research" },
    { role: "President (Local Committee)", org: "Bangladesh Medical Students Society" },
    { role: "Volunteer & Organizer", org: "Various Health & Educational Events" },
    { role: "Speaker & Presenter", org: "Health Awareness Programs" }
  ],
  digital: ["AI in Dentistry", "Cephalometric Analysis", "3D Dental Design", "CAD/CAM & Digital Workflow"],
  research: ["Research Projects", "Conference Participation", "Research Interests", "Publications (Upcoming)"],
  certificates: [
    { title: "Clinical Dentistry", issuer: "Professional Training", year: "2025" },
    { title: "Research Methodology", issuer: "Academic Course", year: "2025" },
    { title: "Digital Dentistry", issuer: "Advanced Course", year: "2025" },
    { title: "Community Healthcare", issuer: "Professional Certificate", year: "2025" }
  ]
};

export const STORAGE_KEY = "dr-adnan-portfolio-data";

export function getDataFromStorage(): PortfolioData {
  if (typeof window === "undefined") return defaultData;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultData;
  } catch {
    return defaultData;
  }
}
