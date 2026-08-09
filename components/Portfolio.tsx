"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowDown, ArrowRight, Award, BookOpen, BriefcaseBusiness, CheckCircle2,
  Download, FlaskConical, HeartPulse, Instagram, Linkedin, Mail, MapPin,
  Menu, MessageCircle, Microscope, Phone, Send, ShieldCheck, Sparkles, Users, X
} from "lucide-react";
import { defaultData, getDataFromStorage, PortfolioData } from "../lib/site-data";

export default function Portfolio() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [menu, setMenu] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => setData(getDataFromStorage()), []);
  useEffect(() => {
    const fn = () => setData(getDataFromStorage());
    window.addEventListener("portfolio-data-updated", fn);
    return () => window.removeEventListener("portfolio-data-updated", fn);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const moveTooth = (clientX: number, clientY: number) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (clientX - (r.left + r.width / 2)) / r.width;
    const y = (clientY - (r.top + r.height / 2)) / r.height;
    setTilt({ x: Math.max(-1, Math.min(1, y)) * -10, y: Math.max(-1, Math.min(1, x)) * 14 });
  };

  const resetTooth = () => setTilt({ x: 0, y: 0 });
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenu(false);
  };
  const mailto = `mailto:${data.email}?subject=${encodeURIComponent("Portfolio Contact")}`;

  return (
    <main>
      <header className={scrolled ? "nav nav-scrolled" : "nav"}>
        <button className="brand" onClick={() => scrollTo("home")} aria-label="Home">
          <span className="brand-d">D</span><span className="brand-star">✦</span>
        </button>
        <nav className={menu ? "nav-links open" : "nav-links"}>
          {["home","about","expertise","research","impact","portfolio","certificates","contact"].map(id =>
            <button key={id} onClick={() => scrollTo(id)}>{id[0].toUpperCase()+id.slice(1)}</button>
          )}
        </nav>
        <button className="connect-btn" onClick={() => scrollTo("contact")}>Let&apos;s Connect <ArrowRight size={14}/></button>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X/> : <Menu/>}</button>
      </header>

      <aside className="social-rail">
        <a href={data.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a>
        <a href={data.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a>
        <a href={mailto} aria-label="Email"><Mail/></a>
        <a href={data.socials.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a>
      </aside>

      <section id="home" className="hero" ref={heroRef}
        onMouseMove={(e) => moveTooth(e.clientX, e.clientY)}
        onMouseLeave={resetTooth}
        onTouchMove={(e) => { const t=e.touches[0]; if(t) moveTooth(t.clientX,t.clientY); }}
        onTouchEnd={resetTooth}>
        <div className="hero-grid"/>
        <div className="hero-noise"/>
        <div className="hero-glow glow-a"/><div className="hero-glow glow-b"/>
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> {data.greeting}</div>
          <h1>{data.name.split(" ").slice(0,-1).join(" ")}<br/><strong>{data.name.split(" ").slice(-1)}</strong></h1>
          <p className="hero-title">{data.title}</p>
          <div className="pills">{data.subtitle.split(" • ").map(x => <span key={x}><CheckCircle2 size={12}/>{x}</span>)}</div>
          <p className="hero-intro">{data.intro}</p>
          <div className="hero-actions">
            <button className="primary" onClick={() => scrollTo("about")}>Explore My Journey <ArrowRight size={16}/></button>
            <a className="download" href="/cv.pdf" download><Download size={16}/> Download CV</a>
          </div>
        </div>

        <div className="portrait-stage">
          <div className="portrait-halo"/>
          <div className="portrait-ring ring-a"/><div className="portrait-ring ring-b"/>
          <div className="portrait-card">
            <Image src="/profile.png" alt={data.name} fill priority sizes="(max-width: 700px) 72vw, 420px"/>
          </div>
          <div className="portrait-tag"><span/> Clinical • Research • Community</div>
        </div>

        <div className="tooth-stage" style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
          <div className="tooth-shadow"/>
          <div className="tooth-orbit orbit-1"/><div className="tooth-orbit orbit-2"/>
          <div className="tooth-core"><Image src="/tooth-hero.png" alt="Interactive dental visualization" fill sizes="340px"/></div>
          <span className="tooth-dot dot-a"/><span className="tooth-dot dot-b"/><span className="tooth-dot dot-c"/>
        </div>
        <div className="hero-tech-label"><span>3D / DIGITAL DENTISTRY</span><b>Interactive visualization</b></div>

        <button className="scroll-card" onClick={() => scrollTo("about")}><span>SCROLL</span><ArrowDown size={18}/></button>
      </section>

      <section id="about" className="about-section">
        <div className="section-heading">
          <span className="kicker"><Users size={14}/> ABOUT ME</span>
          <h2>Clinical care with a <em>future-focused</em> mindset.</h2>
        </div>
        <div className="about-layout">
          <div className="about-copy panel">
            <p>{data.about}</p>
            <div className="facts">
              <div><BookOpen/><span>{data.institution}</span></div>
              <div><MapPin/><span>{data.location}</span></div>
              <div><Sparkles/><span>Open to collaboration in research &amp; dental projects</span></div>
            </div>
            <button className="outline" onClick={() => scrollTo("expertise")}>Explore Expertise <ArrowRight size={15}/></button>
          </div>
          <div id="expertise" className="expertise-panel panel">
            <div className="panel-title"><BriefcaseBusiness size={15}/> CLINICAL EXPERTISE</div>
            <div className="expertise-grid">
              {data.expertise.map((item,i) =>
                <article className="expertise-card" key={item.title}>
                  <div className="expertise-image"><Image src={item.image} alt={item.title} fill sizes="220px"/><span>0{i+1}</span></div>
                  <div><h3>{item.title}</h3><ArrowRight size={15}/></div>
                </article>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="stats-wrap">
        {data.stats.map((s,i) => {
          const I = [HeartPulse,Users,Award,ShieldCheck,FlaskConical][i] || Award;
          return <div className="stat" key={i}><I/><div><strong>{s.value}</strong><span>{s.label}</span></div></div>;
        })}
      </section>

      <section className="feature-section">
        <InfoCard id="research" icon={<Microscope/>} title="RESEARCH & ACADEMIC WORK" number="01">
          <div className="feature-art research-art"><span>R</span><i/></div>
          <ul>{data.research.map(x=><li key={x}>{x}</li>)}</ul>
          <button className="text-btn" onClick={() => scrollTo("contact")}>Discuss Research <ArrowRight size={15}/></button>
        </InfoCard>
        <InfoCard id="impact" icon={<Users/>} title="IMPACT & COMMUNITY" number="02">
          <div className="feature-art impact-art"><i/></div>
          <p>{data.impactText}</p>
          <button className="text-btn" onClick={() => scrollTo("contact")}>View Impact <ArrowRight size={15}/></button>
        </InfoCard>
        <InfoCard id="portfolio" icon={<BriefcaseBusiness/>} title="LEADERSHIP & EXPERIENCE" number="03">
          <div className="timeline">{data.leadership.map((x,i)=><div className="timeline-item" key={i}><span/><div><b>{x.role}</b><small>{x.org}</small></div></div>)}</div>
          <button className="text-btn" onClick={() => scrollTo("contact")}>Let&apos;s Collaborate <ArrowRight size={15}/></button>
        </InfoCard>
        <InfoCard icon={<Sparkles/>} title="DIGITAL DENTISTRY & INNOVATION" number="04">
          <div className="feature-art digital-art"><div className="mini-tooth">✦</div></div>
          <ul>{data.digital.map(x=><li key={x}>{x}</li>)}</ul>
          <button className="text-btn" onClick={() => scrollTo("contact")}>Explore Innovation <ArrowRight size={15}/></button>
        </InfoCard>
      </section>

      <section id="certificates" className="cert-section">
        <div className="section-heading compact"><span className="kicker"><Award size={14}/> CERTIFICATIONS &amp; COURSES</span><h2>Learning never <em>stops.</em></h2></div>
        <div className="cert-grid">{data.certificates.map((c,i)=>
          <article className="certificate" key={i}><div className="cert-number">0{i+1}</div><div className="cert-icon"><Award/></div><b>{c.title}</b><span>{c.issuer}</span><small>{c.year}</small></article>
        )}</div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-copy">
          <span className="kicker"><MessageCircle size={14}/> LET&apos;S CONNECT</span>
          <h2>Have an idea? <em>Let&apos;s talk.</em></h2>
          <p>I&apos;m open to collaboration, research, and opportunities in healthcare &amp; dentistry.</p>
          <a href={mailto}><Mail/> {data.email}</a>
          <span><MapPin/> {data.location}</span>
          <a href={`tel:${data.phone}`}><Phone/> {data.phone}</a>
        </div>
        <ContactForm email={data.email}/>
      </section>

      <footer>
        <div className="footer-brand"><span>✦</span><div><b>{data.name}</b><small>{data.title}</small></div></div>
        <span>© 2026 All Rights Reserved.</span><span>Designed for a better tomorrow <b className="heart">♥</b></span>
      </footer>
    </main>
  );
}

function InfoCard({icon,title,number,children,id}:{icon:React.ReactNode,title:string,number:string,children:React.ReactNode,id?:string}) {
  return <article id={id} className="feature-card panel"><div className="feature-head"><span className="panel-title">{icon}{title}</span><b>{number}</b></div>{children}</article>;
}

function ContactForm({email}:{email:string}) {
  const [sent,setSent]=useState(false);
  const submit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const f=new FormData(e.currentTarget);
    const body=`Name: ${f.get("name")}\nEmail: ${f.get("email")}\n\n${f.get("message")}`;
    window.location.href=`mailto:${email}?subject=${encodeURIComponent("Portfolio Contact")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return <form onSubmit={submit} className="contact-form">
    <div className="form-row"><input name="name" required placeholder="Your Name"/><input name="email" required type="email" placeholder="Your Email"/></div>
    <textarea name="message" required placeholder="Tell me a little about your idea..."/>
    <button className="primary" type="submit">{sent ? "Opening Email…" : "Send Message"} <Send size={16}/></button>
  </form>;
   }
