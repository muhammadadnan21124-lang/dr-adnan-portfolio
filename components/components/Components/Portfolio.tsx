 "use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowDown, ArrowRight, Award, Beaker, BookOpen, BriefcaseBusiness, CheckCircle2,
  ChevronLeft, ChevronRight, Download, FlaskConical, HeartPulse, Instagram, Linkedin,
  Mail, MapPin, Menu, MessageCircle, Microscope, Phone, Send, ShieldCheck, Sparkles,
  Users, X
} from "lucide-react";
import { defaultData, getDataFromStorage, PortfolioData } from "../lib/site-data";

export default function Portfolio() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [menu, setMenu] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => setData(getDataFromStorage()), []);

  useEffect(() => {
    const fn = () => setData(getDataFromStorage());
    window.addEventListener("portfolio-data-updated", fn);
    return () => window.removeEventListener("portfolio-data-updated", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const mailto = `mailto:${data.email}?subject=${encodeURIComponent("Portfolio Contact")}`;

  return (
    <main>
      <header className="nav">
        <button className="brand" onClick={() => scrollTo("home")} aria-label="Home">
          <span className="brand-tooth">⌁</span>
          <span className="brand-star">✦</span>
        </button>
        <nav className={menu ? "nav-links open" : "nav-links"}>
          {["home","about","expertise","research","impact","portfolio","certificates","contact"].map((id) =>
            <button key={id} onClick={() => scrollTo(id)}>{id[0].toUpperCase()+id.slice(1)}</button>
          )}
        </nav>
        <button className="connect-btn" onClick={() => scrollTo("contact")}>Let's Connect</button>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">
          {menu ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </header>

      <aside className="social-rail">
        <a href={data.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a>
        <a href={data.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a>
        <a href={mailto} aria-label="Email"><Mail/></a>
        <a href={data.socials.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a>
      </aside>

      <section id="home" className="hero">
        <div className="hero-glow"/>
        <div className="hero-photo">
          <Image src="/profile.png" alt="Profile" fill priority sizes="(max-width: 900px) 90vw, 40vw"/>
        </div>
        <div className="hero-copy">
          <div className="eyebrow">{data.greeting}</div>
          <h1>{data.name.split(" ").slice(0,-1).join(" ")}<br/><span>{data.name.split(" ").slice(-1)}</span></h1>
          <p className="hero-title">{data.title}</p>
          <div className="pills">
            {data.subtitle.split(" • ").map((x) => <span key={x}><CheckCircle2 size={12}/>{x}</span>)}
          </div>
          <p className="hero-intro">{data.intro}</p>
          <div className="hero-actions">
            <button className="primary" onClick={() => scrollTo("about")}>Explore My Journey <ArrowRight size={17}/></button>
            <a className="download" href="/cv.pdf" download>Download CV <Download size={17}/></a>
          </div>
        </div>
        <div className="hero-tooth">
          <Image src="/tooth-hero.png" alt="Digital tooth visualization" fill priority sizes="40vw"/>
        </div>
        <button className="scroll-card" onClick={() => scrollTo("about")}><span>Scroll<br/>Down</span><ArrowDown size={22}/></button>
      </section>

      <section id="about" className="glass about-grid">
        <div className="about-copy">
          <div className="section-label"><Users size={15}/> ABOUT ME</div>
          <h2>About Me</h2>
          <p>{data.about}</p>
          <div className="facts">
            <div><BookOpen/><span>{data.institution}</span></div>
            <div><MapPin/><span>{data.location}</span></div>
            <div><Sparkles/><span>Open to collaborate in research & dental projects</span></div>
          </div>
          <button className="outline" onClick={() => scrollTo("portfolio")}>Know More About Me</button>
        </div>

        <div id="expertise" className="expertise">
          <div className="section-label"><BriefcaseBusiness size={15}/> CLINICAL EXPERTISE</div>
          <div className="cards">
            {data.expertise.map((item) =>
              <article className="expertise-card" key={item.title}>
                <div className="card-image"><Image src={item.image} alt={item.title} fill sizes="180px"/></div>
                <h3>{item.title}</h3>
              </article>
            )}
          </div>
          <div className="slider-dots">
            <button onClick={() => setSlide(Math.max(0,slide-1))}><ChevronLeft/></button>
            {data.expertise.map((_,i)=><span key={i} className={i===slide ? "active":""}/>)}
            <button onClick={() => setSlide(Math.min(data.expertise.length-1,slide+1))}><ChevronRight/></button>
          </div>
        </div>
      </section>

      <section className="stats">
        {data.stats.map((s, i) => <div className="stat" key={i}>
          <div className="stat-icon">{[HeartPulse, Users, Award, ShieldCheck, FlaskConical][i] ? (() => { const I=[HeartPulse,Users,Award,ShieldCheck,FlaskConical][i]; return <I/> })() : <Award/>}</div>
          <div><strong>{s.value}</strong><span>{s.label}</span></div>
        </div>)}
      </section>

      <section id="research" className="four-grid">
        <InfoCard icon={<Microscope/>} title="RESEARCH & ACADEMIC WORK">
          <div className="mini-images"><div className="abstract-img microscope-img"/><div className="abstract-img brain-img"/></div>
          <ul>{data.research.map(x=><li key={x}>{x}</li>)}</ul>
          <button className="outline" onClick={() => alert("Add your research links in Admin / data settings.")}>View All Research</button>
        </InfoCard>

        <InfoCard id="impact" icon={<Users/>} title="IMPACT & COMMUNITY">
          <div className="mini-images"><div className="impact-photo"/><div className="impact-photo second"/></div>
          <p>{data.impactText}</p>
          <button className="outline" onClick={() => scrollTo("contact")}>View Impact</button>
        </InfoCard>

        <InfoCard icon={<Sparkles/>} title="LEADERSHIP & EXPERIENCE">
          <div className="timeline">
            {data.leadership.map((x,i)=><div key={i} className="timeline-item"><span className="dot"/><div><b>{x.role}</b><small>{x.org}</small></div></div>)}
          </div>
          <button className="outline" onClick={() => scrollTo("portfolio")}>View All Experience</button>
        </InfoCard>

        <InfoCard id="portfolio" icon={<Sparkles/>} title="DIGITAL DENTISTRY & INNOVATION">
          <div className="digital-art"><div className="tooth-row">◌ ◌ ◌ ◌ ◌</div></div>
          <ul>{data.digital.map(x=><li key={x}>{x}</li>)}</ul>
          <button className="outline" onClick={() => scrollTo("contact")}>Explore More</button>
        </InfoCard>
      </section>

      <section id="certificates" className="bottom-grid">
        <div className="glass certs">
          <div className="section-label"><Award size={15}/> CERTIFICATIONS & COURSES</div>
          <div className="cert-grid">
            {data.certificates.map((c,i)=><div className="certificate" key={i}><div className="cert-seal">CERT</div><b>{c.title}</b><span>{c.issuer} · {c.year}</span></div>)}
          </div>
          <button className="outline" onClick={() => alert("Replace certificate entries from the editable data file or Admin page.")}>View All Certificates</button>
        </div>

        <div id="contact" className="glass contact">
          <div>
            <div className="section-label"><MessageCircle size={15}/> LET&apos;S CONNECT</div>
            <p>I&apos;m open to collaboration, research, and opportunities in healthcare & dentistry.</p>
            <a href={mailto}><Mail/> {data.email}</a>
            <span><MapPin/> {data.location}</span>
            <a href={`tel:${data.phone}`}><Phone/> {data.phone}</a>
          </div>
          <ContactForm email={data.email}/>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-tooth">⌁</span><div><b>{data.name}</b><small>{data.title}</small></div></div>
        <span>© 2025 All Rights Reserved.</span>
        <span>Designed with <span className="heart">♥</span> for a better tomorrow</span>
      </footer>
    </main>
  );
}

function InfoCard({icon,title,children,id}:{icon:React.ReactNode,title:string,children:React.ReactNode,id?:string}) {
  return <article id={id} className="info-card glass"><div className="section-label">{icon} {title}</div>{children}</article>
}

function ContactForm({email}:{email:string}) {
  const [sent,setSent] = useState(false);
  const submit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const form=new FormData(e.currentTarget);
    const body=`Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}`;
    window.location.href=`mailto:${email}?subject=${encodeURIComponent("Portfolio Contact")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return <form onSubmit={submit} className="contact-form">
    <input name="name" required placeholder="Your Name"/>
    <input name="email" required type="email" placeholder="Your Email"/>
    <textarea name="message" required placeholder="Your Message"/>
    <button className="primary" type="submit">{sent ? "Opening Email…" : "Send Message"} <Send size={16}/></button>
  </form>
}
