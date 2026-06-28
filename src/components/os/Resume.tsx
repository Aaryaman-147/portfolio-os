"use client";

import React from 'react';

// We embed the CSS directly into the component to bypass Next.js App Router CSS import restrictions
const RESUME_CSS = `
/* --- Windows XP Theme Reset & Base --- */
@import url('https://fonts.googleapis.com/css2?family=Tahoma:wght@400;700&display=swap');

.xp-desktop {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: #004E98;
  font-family: 'Tahoma', 'Trebuchet MS', sans-serif;
  color: #000000;
  font-size: 13px;
}

.xp-window {
  background-color: #ECE9D8;
  border: 3px solid #0054E3;
  border-radius: 8px 8px 0 0;
  width: 210mm;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 80px);
}

.xp-titlebar {
  background: linear-gradient(to bottom, #0058e6 0%, #3a93ff 8%, #288eff 40%, #127dff 88%, #036bfa 100%);
  padding: 4px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px 4px 0 0;
  color: white;
  user-select: none;
}

.xp-titlebar-text {
  font-weight: bold;
  font-size: 13px;
  display: flex;
  align-items: center;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.xp-icon { margin-right: 5px; font-size: 14px; }

.xp-titlebar-controls { display: flex; gap: 2px; }

.xp-titlebar-controls button {
  width: 22px; height: 22px; border: 1px solid #fff; border-radius: 3px;
  color: white; font-weight: bold; font-size: 12px; cursor: pointer;
  display: flex; justify-content: center; align-items: center;
  box-shadow: inset -1px -1px 2px rgba(0,0,0,0.3), inset 1px 1px 2px rgba(255,255,255,0.5);
}

.xp-btn-min, .xp-btn-max { background: linear-gradient(to bottom, #509CFF, #1562E3); }
.xp-btn-close { background: linear-gradient(to bottom, #E87A6E, #D03D32); }
.xp-btn-close:active, .xp-btn-min:active, .xp-btn-max:active { box-shadow: inset 2px 2px 3px rgba(0,0,0,0.5); }

.xp-menubar {
  display: flex; background-color: #ECE9D8; padding: 2px 8px;
  border-bottom: 1px solid #ACA899; font-size: 12px;
}
.xp-menubar span { padding: 4px 8px; cursor: pointer; }
.xp-menubar span:hover { background-color: #316AC5; color: white; }
.xp-print-btn { margin-left: auto; font-weight: bold; color: #0054E3; }

.xp-statusbar {
  display: flex; gap: 20px; padding: 4px 10px; background-color: #ECE9D8;
  border-top: 1px solid #ACA899; font-size: 11px; color: #666666; box-shadow: inset 0 1px 0 #fff;
}

/* --- THE FIXES ARE HERE --- */
.xp-document-container { 
  background-color: #808080 !important; 
  padding: 20px 20px 0 20px;
  min-height: 0; 
  display: flex; /* Removes Flexbox restrictions to fix the grey cutoff */
  overflow-y: auto; 
  flex: 1; /* Stretches to fill Notepad */
  border: 2px solid; 
  border-color: #ACA899 #FFFFFF #FFFFFF #ACA899; 
  background-image: none !important; /* Kills global scanlines */
}

.xp-document-container::after {
  content: "";
  display: block;
  height: 20px;
  width: 100%;
}

.xp-document-page { 
  background-color: #ffffff !important; 
  width: 100%; 
  max-width: 210mm; /* Forces A4 width */
  margin: 0 auto; /* Centers the paper horizontally */
  flex-shrink: 0;
  min-height: 297mm; 
  height: max-content; /* Forces the white background to stretch with content! */
  padding: 30px 40px; 
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3); 
  box-sizing: border-box; 
  background-image: none !important; /* Kills global scanlines */
  color: #000000 !important;
}
/* -------------------------- */

.xp-header { display: flex; justify-content: space-between; margin-bottom: 15px; }
.xp-header-left h1 { margin: 0 0 5px 0; font-size: 28px; font-family: 'Times New Roman', Times, serif; color: #000; }
.xp-role-text { margin: 0; font-size: 12px; line-height: 1.4; color: #666666; max-width: 400px; }
.xp-header-right { text-align: right; font-size: 12px; display: flex; flex-direction: column; gap: 4px; white-space: nowrap;}
.xp-links { display: flex; flex-direction: column; margin-top: 5px; gap: 3px; }
.xp-links a { color: #0000EE; text-decoration: underline; }
.xp-links a:hover { color: #FF0000; }
.xp-divider { border: none; border-top: 2px solid #000; border-bottom: 1px solid #000; height: 2px; margin-bottom: 20px; }
.xp-body-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }

.xp-fieldset { border: 1px solid #D0D0BF; border-radius: 4px; padding: 12px; margin-bottom: 15px; }
.xp-legend { font-weight: bold; color: #0054E3; padding: 0 5px; font-size: 14px; }
.xp-card { margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px dotted #ccc; }
.xp-card.no-border { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.xp-card:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.xp-card-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
.xp-card-header h4 { margin: 0; font-size: 14px; color: #000; }
.xp-tech-text { font-size: 11px; color: #666666; font-style: italic; }
.xp-pill-container { margin-bottom: 6px; }
.xp-pill { display: inline-block; background: #EFEFEF; border: 1px solid #7F9DB9; font-size: 10px; padding: 1px 5px; margin-right: 5px; color: #333; }
.xp-role-badge { font-size: 11px; font-weight: bold; background: #FFFFCC; border: 1px solid #CCCC99; padding: 2px 6px; }
.xp-desc { margin: 0; font-size: 12px; line-height: 1.4; }
.xp-list { margin: 5px 0 0 0; padding-left: 18px; font-size: 11px; color: #333; }
.xp-edu-item { margin-bottom: 15px; }
.xp-edu-item h4 { margin: 0 0 2px 0; font-size: 13px; }
.xp-degree { margin: 0; font-size: 12px; font-weight: bold; color: #333; }
.xp-date-text { font-size: 11px; color: #666666; margin-top: 2px; }
.xp-edu-details { margin: 4px 0 0 0; font-size: 11px; line-height: 1.3; }

.xp-progress-container { margin-top: 6px; }
.xp-progress-labels { display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 2px; }
.xp-progress-track { background-color: white; border: 1px solid #8F8F8F; box-shadow: inset 1px 1px 2px rgba(0,0,0,0.2); height: 14px; width: 100%; padding: 1px; box-sizing: border-box; }
.xp-progress-fill { height: 100%; background-color: #29B829; background-image: repeating-linear-gradient(to right, transparent, transparent 8px, white 8px, white 10px); }

.xp-skill-group { margin-bottom: 12px; }
.xp-skill-group h5 { margin: 0 0 4px 0; font-size: 11px; color: #666666; text-transform: uppercase; }
.xp-tags { display: flex; flex-wrap: wrap; gap: 4px; }
.xp-tag { font-size: 11px; background: white; border: 1px solid #7F9DB9; padding: 2px 6px; box-shadow: 1px 1px 0 #E0E0E0; }

.print-only { display: none; }

@media print {
  .no-print, .xp-desktop::before, .xp-titlebar, .xp-menubar, .xp-statusbar { display: none !important; }
  .print-only { display: block !important; }
  body, .xp-desktop, .xp-document-container, .xp-window {
    background: white !important; padding: 0 !important; margin: 0 !important; border: none !important;
    box-shadow: none !important; max-height: none !important; overflow: visible !important; width: 100% !important; color: black !important;
  }
  .xp-document-page { box-shadow: none !important; padding: 0 !important; font-family: 'Times New Roman', Times, serif !important; font-size: 11pt !important; }
  h1, h2, h3, h4, h5, p, span, div, a, legend { color: black !important; font-family: 'Times New Roman', Times, serif !important; }
  .xp-header-left h1 { font-size: 24pt !important; margin-bottom: 4pt; padding-bottom: 2pt; font-weight: bold; }
  .xp-role-text { font-size: 11pt !important; font-style: italic; max-width: 100%; }
  .xp-header-right { font-size: 10pt !important; }
  .xp-links a { text-decoration: underline !important; color: black !important; }
  .xp-divider { border-top: 2pt solid black !important; border-bottom: none !important; margin-bottom: 15pt !important; }
  .xp-fieldset { border: 1pt solid black !important; border-radius: 0 !important; margin-bottom: 15pt !important; padding: 10pt !important; }
  .xp-legend { font-size: 14pt !important; font-weight: bold !important; padding: 0 5pt !important; }
  .xp-card { border-bottom: 1pt dotted black !important; padding-bottom: 8pt !important; margin-bottom: 10pt !important; }
  .xp-card:last-child { border-bottom: none !important; padding-bottom: 0 !important; margin-bottom: 0 !important; }
  .xp-card-header h4, .xp-edu-item h4 { font-size: 12pt !important; font-weight: bold !important; }
  .xp-tech-text, .xp-date-text { font-size: 10pt !important; font-style: italic !important; }
  .xp-desc, .xp-edu-details, .xp-list { font-size: 11pt !important; line-height: 1.25 !important; }
  .xp-list { margin-top: 4pt !important; }
  .xp-pill, .xp-tag, .xp-role-badge { background: transparent !important; border: 1pt solid black !important; color: black !important; font-size: 9pt !important; padding: 1pt 4pt !important; box-shadow: none !important; border-radius: 0 !important; }
  .xp-role-badge { font-weight: bold; font-style: italic; border: none !important; }
  .xp-skill-group h5 { font-size: 11pt !important; font-weight: bold !important; text-decoration: underline; margin-bottom: 4pt !important; }
  .print-new-page { page-break-before: always !important; }
}
`;

// --- TYPES ---
interface LinkData {
  github: string;
  linkedin: string;
  portfolio: string;
}

interface HeaderData {
  name: string;
  role: React.ReactNode;
  location: string;
  email: string;
  phone: string;
  links: LinkData;
}

interface EducationData {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  details: string;
}

interface SkillsData {
  languages: string[];
  frameworks: string[];
  tools: string[];
  soft: string[];
}

interface ProjectData {
  title: string;
  types: string[];
  tech: string;
  desc: string;
}

interface AchievementData {
  title: string;
  role: string;
  tech: string;
  desc: string;
  details?: string[];
}

interface LeadershipData {
  role: string;
  org: string;
  date: string;
  desc: string;
}

interface ResumeData {
  header: HeaderData;
  education: EducationData[];
  skills: SkillsData;
  projects: ProjectData[];
  achievements: AchievementData[];
  leadership: LeadershipData[];
}

const Resume: React.FC = () => {
  // --- DATA SECTION ---
  const resumeData: ResumeData = {
    header: {
      name: "Aaryaman Arora",
      role: (
        <span>
          Biotechnology undergraduate with hands-on experience in web development and data-driven projects, and a strong interest in interdisciplinary research at the interface of biotechnology and biomedical engineering. Passionate about AI-driven biomedical systems and product-focused problem solving.
        </span>
      ),
      location: "India",
      email: "aaryaman1407@gmail.com",
      phone: "+91 9041092164",
      links: {
        github: "github.com/Aaryaman-147",
        linkedin: "linkedin.com/in/aaryaman-arora/",
        portfolio: "aaryaman.me"
      }
    },
    education: [
      {
        school: "Thapar Institute of Engineering and Technology",
        degree: "B.Tech | Biotechnology",
        startDate: "2024-08-01",
        endDate: "2028-06-01",
        details: ""
      },
      {
        school: "Innocent Hearts School",
        degree: "Senior Secondary (Class XII & X)",
        startDate: "2019-04-01",
        endDate: "2024-03-31",
        details: "PCM"
      },
      {
        school: "Cambridge International School",
        degree: "Foundation & Middle School",
        startDate: "2013-04-01",
        endDate: "2019-03-31",
        details: "Early education and foundational studies."
      }
    ],
    skills: {
      languages: ["JavaScript (ES6+)", "Python", "HTML", "CSS"],
      frameworks: ["React.js", "Three.js", "Node.js", "Tailwind CSS", "Flutter", "Vite"],
      tools: ["Git", "GitHub", "Firebase", "Figma", "VS Code", "Chrome DevTools", "Vercel"],
      soft: ["Leadership", "Team Collaboration", "Strategic Planning", "Problem Solving"]
    },
    projects: [
      {
        title: "Smart Wound Monitoring – Proof of Concept",
        types: ["HealthTech", "Research", "IoT"],
        tech: "Arduino · Sensors · Biomedical Instrumentation · Embedded Systems",
        desc: "Proposed and prototyped a non-invasive smart bandage system for early graft failure detection using embedded sensors and data visualization."
      },
      {
        title: "BioCUDA",
        types: ["Machine Learning", "AI Infrastructure"],
        tech: "PyTorch · CUDA Graphs · FastAPI · React.js · Scikit-Learn",
        desc: "A dual-branch, high-throughput machine learning infrastructure for executing 3 Billion parameter foundational models (ESM-2) on constrained hardware and enterprise A100 clusters."
      },
      {
        title: "Northstar – Enterprise Goal Governance Platform",
        types: ["Enterprise Software", "Analytics", "Workflow Automation"],
        tech: "Next.js · FastAPI · Supabase · PostgreSQL",
        desc: "Developed a full-stack enterprise goal management platform with role-based workflows, analytics dashboards, audit logging, and AI-assisted goal tracking using Next.js, FastAPI, and Supabase."
      },
      {
        title: "End-to-End MLOps Pipeline",
        types: ["MLOps", "Cloud Infrastructure"],
        tech: "Python · ML Pipelines · Automation · Model Deployment",
        desc: "Designed an end-to-end MLOps pipeline for model training, versioning, and deployment. Automated data preprocessing, model evaluation, and deployment workflows"
      },
      {
        title: "Second Look – Browser Extension",
        types: ["Productivity", "Tooling"],
        tech: "JavaScript · Browser APIs · Extensions · UX",
        desc: "Developed a browser extension to improve user workflows and efficiency"
      },
      {
        title: "Subscripted – Subscription Management Tool",
        types: ["SaaS", "FinTech"],
        tech: "JavaScript · Frontend · UI/UX · State Management",
        desc: "Built a web-based tool to track and manage recurring subscriptions"
      },
      {
        title: "Schedly – Timetable & Scheduling App for University Students",
        types: ["Productivity", "Time Management"],
        tech: "Frontend · Logic Design · UX · JavaScript",
        desc: "Designed and built a timetable management application tailored for university students to organize classes, labs, and academic commitments."
      },
      {
        title: "Interactive 3D Particle System",
        types: ["Graphics", "Creative Coding"],
        tech: "JavaScript · WebGL / Three.js · Animation",
        desc: "Built a real-time interactive 3D particle system for web environments"
      }
    ],
    achievements: [
      {
        title: "Hack4Help (Israeli Indian Hackathon)",
        role: "Top 10 Finalist | Team Lead | Conference Presenter",
        tech: "System Design · Prototyping",
        desc: "Led a multidisciplinary team to design a smart bandage system. Qualified through multiple screening rounds to present a functional hardware-software demo in the finals.",
        details: [
          "Integrated temperature sensors with Arduino for real-time monitoring.",
          "Oversaw development of a live data dashboard and coordinated integration of hardware and software components",
          "Presented the final in-person pitch and functional demo during the 24-hour hackathon",
          "Selected among Top 10 teams based on innovation and feasibility.",
          "Abstract published in the TISCR Book of Abstracts"
        ]
      },
      {
        title: "Spark Tank Pitch – IIT Delhi",
        role: "Presenter",
        tech: "Medical Innovation",
        desc: "Pitched an advanced smart bandage concept involving multiple biomarkers. Presented technical architecture and clinical relevance to an expert jury. Received feedback on translational potential and scalability in healthcare settings"
      }
    ],
    leadership: [
      {
        role: "Tech Lead",
        org: "Nucleus",
        date: "May 2026 - Present",
        desc: ""
      },{
        role: "EC – R&D",
        org: "Nucleus",
        date: "Feb 2026 - May 2026",
        desc: ""
      },{
        role: "Core Member – Logistics",
        org: "Saturnalia",
        date: "2025 - Present",
        desc: "Managed on-ground execution for a large-scale college festival. Coordinated resource allocation and crowd flow across multiple teams."
      },
      {
        role: "Volunteer",
        org: "PFA (People For Animals)",
        date: "2025 - Present",
        desc: "Active member of the university chapter dedicated to animal welfare and rescue operations."
      }
    ],
  };

  // --- THE NEW (MUCH BETTER) PRINT LOGIC ---
  const handlePrint = () => {
    // This will open your actual PDF file in a new browser tab.
    // The browser's native PDF viewer will allow the user to print or download it!
    window.open("/aaryaman_resume.pdf", "_blank");
  };

  const getProgress = (start: string, end: string): number => {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    const today = new Date().getTime();
    const totalDuration = endDate - startDate;
    const elapsed = today - startDate;
    const percent = (elapsed / totalDuration) * 100;
    return Math.min(Math.max(percent, 0), 100);
  };

  return (
    <>
      {/* Injecting CSS directly to avoid Next.js external chunk errors */}
      <style dangerouslySetInnerHTML={{ __html: RESUME_CSS }} />
      <div className="xp-desktop">
        <div className="xp-window">
          {/* --- Windows XP Title Bar --- */}
          <div className="xp-titlebar no-print">
            <div className="xp-titlebar-text">
              <span className="xp-icon">📄</span> Resume.doc - Microsoft Word
            </div>
            <div className="xp-titlebar-controls">
              <button className="xp-btn-min">_</button>
              <button className="xp-btn-max">□</button>
              <button className="xp-btn-close">X</button>
            </div>
          </div>

          {/* --- Classic Menu Bar --- */}
          <div className="xp-menubar no-print">
            <span>Hiiiiiii</span>
            <span className="xp-print-btn" onClick={handlePrint}>🖨️ <u>P</u>rint</span>
          </div>

          {/* --- Main Document Area --- */}
          <div className="xp-document-container">
            <div className="xp-document-page">
              
              <header className="xp-header">
                <div className="xp-header-left">
                  <h1>{resumeData.header.name}</h1>
                  <p className="xp-role-text">{resumeData.header.role}</p>
                </div>
                <div className="xp-header-right">
                  <div>📧 {resumeData.header.email}</div>
                  <div>📞 {resumeData.header.phone}</div>
                  <div>📍 {resumeData.header.location}</div>
                  <div className="xp-links">
                    <a href={`https://${resumeData.header.links.portfolio}`} target="_blank" rel="noreferrer">🌐 {resumeData.header.links.portfolio}</a>
                    <a href={`https://${resumeData.header.links.github}`} target="_blank" rel="noreferrer">👨‍💻 /Aaryaman-147</a>
                    <a href={`https://${resumeData.header.links.linkedin}`} target="_blank" rel="noreferrer">💼 /in/aaryaman-arora</a>
                  </div>
                </div>
              </header>

              <hr className="xp-divider" />

              <div className="xp-body-grid">
                {/* --- LEFT COLUMN: Main Content --- */}
                <main className="xp-main-col">

                  <fieldset className="xp-fieldset">
                    <legend className="xp-legend">💼 Experience</legend>
                    
                    {/* --- NEW INTERNSHIP CARD --- */}
                    <div className="xp-card">
  <div className="xp-card-header">
    <h4>PDL–DSP Intern — Premas Biotech</h4>
    <span className="xp-tech-text">May 2026 – June 2026</span>
  </div>
                      <p className="xp-desc">
                        • Built an AI-assisted platform to streamline chromatography workflow recommendation for protein purification.<br/>
    • Developed sequence analysis pipelines using physicochemical protein properties.<br/>
    • Worked closely with researchers to convert laboratory workflows into intuitive software tools.<br/>
    • Gained exposure to downstream process development, protein purification, and industrial bioprocess workflows.
                      </p>
                    </div>
                  </fieldset>
                  
                  <fieldset className="xp-fieldset">
                    <legend className="xp-legend">📂 Projects</legend>
                    {resumeData.projects.map((proj, index) => (
                      <div key={index} className="xp-card">
                        <div className="xp-card-header">
                          <h4>{proj.title}</h4>
                          <span className="xp-tech-text">[{proj.tech}]</span>
                        </div>
                        <div className="xp-pill-container">
                          {proj.types.map((t) => (
                            <span key={t} className="xp-pill">{t}</span>
                          ))}
                        </div>
                        <p className="xp-desc">{proj.desc}</p>
                      </div>
                    ))}
                  </fieldset>

                  <fieldset className="xp-fieldset print-new-page">
                    <legend className="xp-legend">🏆 Achievements & Hackathons</legend>
                    {resumeData.achievements.map((ach, index) => (
                      <div key={index} className="xp-card">
                        <div className="xp-card-header">
                          <h4>{ach.title}</h4>
                          <span className="xp-role-badge">{ach.role}</span>
                        </div>
                        <p className="xp-desc">{ach.desc}</p>
                        {ach.details && (
                          <ul className="xp-list">
                            {ach.details.map((d, i) => <li key={i}>{d}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </fieldset>

                  
                </main>

                {/* --- RIGHT COLUMN: Sidebar --- */}
                <aside className="xp-side-col">
                  
                  <fieldset className="xp-fieldset">
                    <legend className="xp-legend">🎓 Education</legend>
                    {resumeData.education.map((edu, idx) => {
                      const progress = getProgress(edu.startDate, edu.endDate);
                      const isCompleted = progress >= 100;
                      const startYear = new Date(edu.startDate).getFullYear();
                      const endYear = new Date(edu.endDate).getFullYear();
                      const yearRange = `${startYear} - ${endYear}`;

                      return (
                        <div key={idx} className="xp-edu-item">
                          <h4>{edu.school}</h4>
                          <p className="xp-degree">{edu.degree}</p>
                          
                          {!isCompleted ? (
                            <>
                              <div className="xp-progress-container no-print">
                                <div className="xp-progress-labels">
                                  <span>Aug &apos;{startYear.toString().slice(-2)}</span>
                                  <span>Jun &apos;{endYear.toString().slice(-2)}</span>
                                </div>
                                <div className="xp-progress-track">
                                  <div className="xp-progress-fill" style={{ width: `${progress}%` }}></div>
                                </div>
                              </div>
                              <div className="print-only xp-date-text">
                                {yearRange} (Expected)
                              </div>
                            </>
                          ) : (
                            <div className="xp-date-text">{yearRange}</div>
                          )}
                          <p className="xp-edu-details">{edu.details}</p>
                        </div>
                      );
                    })}
                  </fieldset>

                  <fieldset className="xp-fieldset">
                    <legend className="xp-legend">🤝 Leadership & Volunteering</legend>
                    {resumeData.leadership.map((lead, idx) => (
                      <div key={idx} className="xp-edu-item">
                        <h4>{lead.role}</h4>
                        <p className="xp-degree">{lead.org}</p>
                        <p className="xp-date-text">{lead.date}</p>
                        <p className="xp-desc" style={{ marginTop: '4px' }}>{lead.desc}</p>
                      </div>
                    ))}
                  </fieldset>

                  <fieldset className="xp-fieldset">
                    <legend className="xp-legend">⚙️ Technical Skills</legend>
                    
                    <div className="xp-skill-group">
                      <h5>Languages</h5>
                      <div className="xp-tags">
                        {resumeData.skills.languages.map(s => <span key={s} className="xp-tag">{s}</span>)}
                      </div>
                    </div>
                    
                    <div className="xp-skill-group">
                      <h5>Frameworks</h5>
                      <div className="xp-tags">
                        {resumeData.skills.frameworks.map(s => <span key={s} className="xp-tag">{s}</span>)}
                      </div>
                    </div>
                    
                    <div className="xp-skill-group">
                      <h5>Tools</h5>
                      <div className="xp-tags">
                        {resumeData.skills.tools.map(s => <span key={s} className="xp-tag">{s}</span>)}
                      </div>
                    </div>

                    <div className="xp-skill-group">
                      <h5>Soft Skills</h5>
                      <div className="xp-tags">
                        {resumeData.skills.soft.map(s => <span key={s} className="xp-tag">{s}</span>)}
                      </div>
                    </div>
                  </fieldset>

                </aside>
              </div>
            </div>
          </div>
          
          {/* Windows XP Status Bar */}
          <div className="xp-statusbar no-print">
            <span>Page 1 of 1</span>
            <span>Col 1</span>
            <span>English (U.S.)</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
