port type PortfolioData = {
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
  socials: { linkedin: string; instagram: string; whatsapp: string };
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
  title: "BDS Intern | Dentist | Researcher | Primary Health Care Service Provider",
  subtitle: "Clinical Excellence • Research Driven • Community Focused • Experienced ",
  intro: "Passionate about delivering ethical dental care, advancing dental education and research, and leveraging technology for a better tomorrow.",
  location: "Dhaka, Bangladesh",
  institution: "BDS, University Dental College & Hospital, University of Dhaka",
  email: "muhammad.adnan21124@gmail.com",
  phone: "+8801309081990",
  stats: [
    { value: "37+", label: "Free Medical / Dental Camps" },
    { value: "45,000+", label: "People Served" },
    { value: "380+ Lakh BDT", label: "Charity Work (Free)" },
    { value: "1,000+", label: "Clinical Cases Handled" },
    { value: "5+", label: "Research Projects" }
  ],
  socials: {
    linkedin: "https://www.linkedin.com/in/adnan-hasan-06b430220?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/",
    whatsapp: "https://wa.me/@Dr.Adnan_Hassan"
  },
  about: "I am a BDS intern Dr with a strong foundation in clinical dentistry and a deep interest in conservative and aesthetic dentistry, research, digital dentistry, and community healthcare.",
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
