import React, { useState, useEffect, useRef } from 'react';
import { 
  Bug, 
  Terminal, 
  FileText, 
  User, 
  Cpu, 
  Database, 
  Smartphone, 
  Globe, 
  Award, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink, 
  ShieldCheck, 
  Download, 
  Sliders, 
  Clock, 
  Sun, 
  Moon, 
  Zap, 
  ArrowRight,
  Send,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { SKILLS, SERVICES, STATS } from './data';
import JiraBoard from './components/JiraBoard';
import ProjectsSlider from './components/ProjectsSlider';
import { jsPDF } from 'jspdf';

export default function App() {
  // Theme Toggle: Defaults to light mode for rich technical aesthetic
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);



  // Hero Live Console Ticker state
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'Initializing automated manual testing sandbox...',
    'Mock web headless engine booted successfully... OK',
    'Checking relational database rules... Complete',
  ]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Contact Form States
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCategory, setContactCategory] = useState('Website Testing');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Scroll handler for styling navbar & spying scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      
      const sections = ['hero', 'portfolio', 'projects', 'skills', 'services', 'contact'];
      const scrollPos = window.scrollY + 120;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ticker Logs Simulation
  useEffect(() => {
    const logs = [
      '⚡ [API VERIFICATION] GET /api/v1/auth - status: 200 OK (52ms)',
      '🛡️ [SECURITY AUDIT] XSS prevention rule check... PASS',
      '📱 [DEVICE COMPATIBILITY] Responsive layout rendering verified on 320px, 768px, 1200px',
      '📦 [CACHE INTEGRITY] Session cookie attributes check: HttpOnly & Secure flags - Verified',
      '🌐 [CROSS BROWSER] Webkit, Gecko, and Chromium engine layout match: 100% compliant',
      '💾 [SQL CHECK] Verification query executed: leads_table matches primary key schema',
      '🐛 [INTERCEPTOR] Discovered unhandled negative item checkout bounds on cart page',
      '⚡ [API VERIFICATION] POST /api/v1/charge - status: 201 Created (114ms)',
      '🧪 [SANITY CHECK] Single action double-click triggers debounced correctly'
    ];

    const interval = setInterval(() => {
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setConsoleLogs((prev) => {
        const updated = [...prev, `[${new Date().toLocaleTimeString()}] ${randomLog}`];
        if (updated.length > 25) updated.shift();
        return updated;
      });
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  const handleDownloadCV = () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // A4 size: 210 x 297 mm
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);

      let y = 18;

      const addHeader = (pageNum: number) => {
        // Minimal header for page 2+, full header for page 1
        if (pageNum === 1) {
          // Name
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(22);
          doc.setTextColor(15, 23, 42); // slate-900
          doc.text('SAQLAIN AHMAD', margin, y);
          y += 6;

          // Subtitle
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(124, 58, 237); // purple-600
          doc.text('MANUAL QA & API TESTER / SOFTWARE QA ENGINEER', margin, y);
          y += 5;

          // Info bar
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(71, 85, 105); // slate-600
          doc.text('Phone: (+92) 306-0695405  |  Email: saqlainlive331@gmail.com  |  Location: Lahore, Pakistan', margin, y);
          y += 4.5;
          doc.text('LinkedIn: www.linkedin.com/in/saqlain-a-0774191a0/', margin, y);
          y += 5;

          // Border Line
          doc.setDrawColor(226, 232, 240); // slate-200
          doc.setLineWidth(0.5);
          doc.line(margin, y, pageWidth - margin, y);
          y += 7;
        } else {
          // Page 2+ header
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(100, 116, 139); // slate-500
          doc.text('SAQLAIN AHMAD  |  PROFESSIONAL QA RESUME', margin, y);
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(8);
          doc.text(`Page ${pageNum}`, pageWidth - margin - 10, y);
          
          doc.setDrawColor(241, 245, 249); // slate-100
          doc.setLineWidth(0.3);
          doc.line(margin, y + 2, pageWidth - margin, y + 2);
          y += 8;
        }
      };

      const addSectionTitle = (title: string) => {
        y += 2;
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text(title, margin, y);
        y += 2.5;
        // Accent bar underneath title
        doc.setDrawColor(124, 58, 237); // purple-600
        doc.setLineWidth(0.5);
        doc.line(margin, y, margin + 25, y);
        
        // Light separator across full width
        doc.setDrawColor(241, 245, 249); // slate-100
        doc.setLineWidth(0.2);
        doc.line(margin + 25, y, pageWidth - margin, y);

        y += 5;
      };

      // PAGE 1 SETUP
      addHeader(1);

      // SECTION: SUMMARY
      addSectionTitle('SUMMARY & CLINICAL EXPERTISE');
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85); // slate-700
      
      const summaryText = "4+ years of experience in reviewing and improving software development processes, from design to testing and maintenance. Skilled in black, white, and grey box testing methodologies. Expertise in creating and executing test plans, documenting defects, and identifying use cases. Strong background in supporting teams to meet project deadlines while ensuring software quality across the entire SDLC.";
      
      const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
      doc.text(splitSummary, margin, y);
      y += (splitSummary.length * 4.5) + 3;

      // SECTION: WORK EXPERIENCE
      addSectionTitle('WORK EXPERIENCE');

      const experiences = [
        {
          role: 'Software QA Engineer',
          company: 'Pocket Systems, Lahore',
          duration: 'Jan 2026 – Present',
          bullets: [
            'Apply QA methodologies across test planning, execution, and reporting phases.',
            'Perform manual testing for web and mobile applications to validate logic, responsive layouts, and UX flows.',
            'Report defects and track test results using Jira, Trello, and integrated diagnostic consoles.',
            'Collaborate in Agile standards and sprint reviews to enhance overall QA process quality.',
            'Developed and maintained Cypress automation scripts for regression and visual regression testing.'
          ]
        },
        {
          role: 'Software QA Engineer',
          company: 'CODEXIA TECHNOLOGY, Lahore',
          duration: 'Jan 2022 – 2026',
          bullets: [
            'Led functional and regression testing, designing and executing comprehensive test plans.',
            'Applied advanced QA methodologies across the entire testing lifecycle.',
            'Developed and maintained Cypress automation scripts for regression testing.',
            'Documented test scenarios, bug reports, and QA findings using Jira and Trello.',
            'Contributed to Agile/Scrum environments, actively engaging in sprint activities.'
          ]
        },
        {
          role: 'QA Analyst',
          company: 'BEYOND LOGICS INC',
          duration: 'Jan 2021 – Jan 2022',
          bullets: [
            'Identified, recorded, and tracked bugs throughout the Software Development Life Cycle (SDLC).',
            'Executed critical regression testing to verify bug fixes, hotfixes, and system stability.',
            'Authored detailed test plans and test cases from functional business requirements.',
            'Applied basic SQL for database auditing, back-end query testing, and data validation.',
            'Participated in Agile/Scrum environments, contributing to sprint activities.',
            'Demonstrated strong understanding of the Software Development Life Cycle (SDLC).'
          ]
        }
      ];

      experiences.forEach((exp) => {
        // Prevent overflow check
        if (y > pageHeight - 30) {
          doc.addPage();
          y = 18;
          addHeader(2);
        }

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text(`${exp.role}  |  ${exp.company}`, margin, y);
        
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139); // slate-500
        const durationWidth = doc.getTextWidth(exp.duration);
        doc.text(exp.duration, pageWidth - margin - durationWidth, y);
        
        y += 4;

        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85); // slate-700
        
        exp.bullets.forEach((bullet) => {
          if (y > pageHeight - 15) {
            doc.addPage();
            y = 18;
            addHeader(2);
          }
          // draw bullet point dot
          doc.setFont('Helvetica', 'bold');
          doc.setTextColor(124, 58, 237); // purple-600
          doc.text('•', margin + 2, y);
          
          doc.setFont('Helvetica', 'normal');
          doc.setTextColor(51, 65, 85); // slate-700
          
          const splitBullet = doc.splitTextToSize(bullet, contentWidth - 6);
          doc.text(splitBullet, margin + 6, y);
          y += (splitBullet.length * 4) + 1;
        });
        
        y += 3;
      });

      // PAGE 2 SETUP
      doc.addPage();
      y = 18;
      addHeader(2);

      // SECTION: TECHNICAL SKILLS
      addSectionTitle('TECHNICAL SKILLS');

      const skillsData = [
        { label: 'Testing Types', desc: 'Regression, White Box, Black Box, Load, Stress, Security, Manual, Database (SQL), Firebase, and API Testing.' },
        { label: 'Automation & Tools', desc: 'Cypress, Postman, JMeter, Apptim, Atlassian Jira, Trello, TestRail, and OWASP.' },
        { label: 'Design & Collaboration', desc: 'Zeplin, Adobe XD, Confluence, GitHub, and VSCode.' },
        { label: 'Platforms', desc: 'BrowserStack, Firebase, AWS Cloud Infrastructure.' }
      ];

      skillsData.forEach((skill) => {
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.text(`${skill.label}: `, margin, y);
        const labelWidth = doc.getTextWidth(`${skill.label}: `);
        
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);
        
        const descText = skill.desc;
        const splitDesc = doc.splitTextToSize(descText, contentWidth - labelWidth);
        doc.text(splitDesc, margin + labelWidth, y);
        y += (splitDesc.length * 4.2) + 2;
      });

      y += 2;

      // SECTION: AWARDS & ACHIEVEMENTS
      addSectionTitle('AWARDS & ACHIEVEMENTS');
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text('•  Best QA Engineer of the Year (2025)', margin, y);
      y += 4;
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text('   Awarded by CODEXIA TECHNOLOGY in recognition of zero-leak regression validation and test efficiency.', margin, y);
      y += 8;

      // SECTION: RECENT PROJECTS
      addSectionTitle('KEY PORTFOLIO PROJECTS');

      const projectsData = [
        {
          name: 'BuyMyStuff (E-commerce App & Web)',
          tech: 'Tech: IONIC, Firebase, Angular, AWS',
          desc: 'Seamless buyer-seller marketplace featuring secure payment triggers, location detection, and nearby contextual promotion modules.'
        },
        {
          name: 'BodyF1rst (Fitness App & Web)',
          tech: 'Tech: Angular, IONIC, PHP, MySQL, AWS',
          desc: 'Connects specialized athletic coaches and users for personalized workout scheduling, fitness program mapping, and automated nutrition logging.'
        },
        {
          name: 'Save Coach (Finance & Tax App)',
          tech: 'Tech: PHP, Flutter, React JS, Laravel, MySQL',
          desc: 'End-to-end personal finance management tool used for tracking active expenses, allocating budgets, and processing secure tax calculations.'
        },
        {
          name: 'Mr.Gig Courier App (Logistics App)',
          tech: 'Tech: Flutter, Firebase',
          desc: 'Innovative on-demand logistics delivery platform simplifying operations and routing flows for modern enterprises and local couriers.'
        },
        {
          name: 'Cope (Staff Management Solution)',
          tech: 'Tech: Angular, Firebase',
          desc: 'Comprehensive all-in-one staff monitoring and workspace coordination tool optimizing business team productivity, roster tracking, and logs.'
        }
      ];

      projectsData.forEach((project) => {
        if (y > pageHeight - 30) {
          doc.addPage();
          y = 18;
          addHeader(3);
        }

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.text(project.name, margin, y);
        
        doc.setFont('Helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(124, 58, 237); // purple
        const techWidth = doc.getTextWidth(project.tech);
        doc.text(project.tech, pageWidth - margin - techWidth, y);
        
        y += 4;

        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);
        const splitDesc = doc.splitTextToSize(project.desc, contentWidth - 4);
        doc.text(splitDesc, margin + 4, y);
        
        y += (splitDesc.length * 4) + 3;
      });

      // Footer notice
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text("Generated dynamically via Saqlain Ahmad's Interactive QA Sandbox", margin, pageHeight - 10);

      // Save PDF trigger
      doc.save('Saqlain_Ahmad_Resume.pdf');
    } catch (error) {
      console.error("Failed to generate PDF resume:", error);
      alert("Error generating PDF resume. Fallback download triggered.");
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-all duration-500 overflow-x-hidden antialiased ${isDarkMode ? 'bg-[#090514] text-slate-100 selection:bg-purple-600 selection:text-white' : 'bg-[#FAF5FF] text-slate-900 selection:bg-purple-300 selection:text-purple-950'}`}>
      
      {/* AMBIENT FLOATING LIGHT GLOWS */}
      {isDarkMode ? (
        <>
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-[35%] right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[15%] left-1/3 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-0 left-1/3 w-[450px] h-[450px] bg-purple-200/50 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-[45%] right-1/3 w-[350px] h-[350px] bg-indigo-100/50 rounded-full blur-[90px] pointer-events-none" />
        </>
      )}

      {/* FIXED FLOATING NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? (isDarkMode ? 'bg-[#090514]/90 backdrop-blur-md border-b border-purple-950/40 shadow-lg py-3' : 'bg-[#FAF5FF]/90 backdrop-blur-md border-b border-purple-100 shadow-md py-3') : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand & Dynamic Ping */}
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-xl shadow-md shadow-purple-500/20 text-white">
              <Bug className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-bold tracking-tight block text-sm sm:text-base">Saqlain Ahmad</span>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} font-mono tracking-wider`}>Diagnostic Agent Active</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 font-medium text-xs font-mono uppercase tracking-wider">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'portfolio', label: 'Projects' },
              { id: 'projects', label: 'Jira Sprint' },
              { id: 'skills', label: 'Skills' },
              { id: 'services', label: 'Services' },
              { id: 'contact', label: 'Connect' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection(link.id);
                }}
                className={`px-3 py-2 rounded-lg transition-colors duration-200 ${activeSection === link.id ? 'bg-purple-600/15 text-purple-500 font-bold' : (isDarkMode ? 'text-slate-400 hover:text-purple-400' : 'text-slate-600 hover:text-purple-600')}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Header Controls (Theme Switcher + Hire CTA) */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all ${isDarkMode ? 'bg-[#150F30] border-purple-950 text-purple-400 hover:text-white' : 'bg-purple-100 border-purple-200 text-purple-700 hover:bg-purple-200'}`}
              aria-label="Toggle Theme"
              type="button"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection('contact');
              }}
              className="px-4 py-2 text-xs font-mono font-bold uppercase bg-gradient-to-r from-purple-600 to-indigo-500 text-white hover:opacity-90 transition-all rounded-lg shadow-md shadow-purple-500/25"
            >
              Hire Me
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6d28d90c_1px,transparent_1px),linear-gradient(to_bottom,#6d28d90c_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Info */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className={`inline-flex items-center space-x-2 px-3 py-1 border rounded-full text-xs font-mono ${isDarkMode ? 'bg-[#150F30] border-purple-950 text-purple-400' : 'bg-purple-100 border-purple-200 text-purple-800'}`}>
              <Award className="w-4 h-4 animate-spin text-purple-500" />
              <span>Certified Professional Manual QA & API Tester</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Flawless Code. <br />
              <span className="text-purple-600 bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">Uncompromised</span> <br />
              Software Security.
            </h1>

            {/* Impressed at first sight tagline requirement */}
            <div className={`p-4 border-l-4 border-purple-600 rounded-r-xl max-w-xl text-left ${isDarkMode ? 'bg-[#120E2A]/60' : 'bg-purple-50'}`}>
              <p className={`text-xs font-bold font-mono tracking-wide ${isDarkMode ? 'text-purple-300' : 'text-purple-900'}`}>
                "Every application should be flawless, so the client is impressed at first sight."
              </p>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-purple-800/80'}`}>
                I combine exploratory manual execution, robust REST checks, and detailed bug ticketing to build confidence in every build.
              </p>
            </div>

            <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-purple-950/80'}`}>
              Hello! I'm <strong className="text-purple-500">Saqlain Ahmad</strong>. I help startups and enterprise businesses deploy bug-free platforms. By thinking like an end-user and auditing edge cases, I ensure complete system reliability.
            </p>

            {/* Quick capabilities indicators */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {['Manual QA', 'API Validation', 'Regression Testing', 'Mobile App Testing', 'Database Auditing'].map((skill) => (
                <span 
                  key={skill} 
                  className={`px-3 py-1.5 border rounded-lg text-xs font-semibold shadow-sm transition-all hover:scale-105 duration-200 ${isDarkMode ? 'bg-[#140F2D] border-purple-950/50 text-slate-300' : 'bg-white border-purple-100 text-purple-900'}`}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection('projects');
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-purple-600 hover:bg-purple-700 active:translate-y-0.5 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 text-xs font-mono uppercase tracking-wider text-center flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4 text-purple-200 animate-bounce" />
                <span>Browse Jira Sprint</span>
              </a>

              <button
                onClick={handleDownloadCV}
                className={`w-full sm:w-auto px-6 py-3.5 border font-semibold rounded-xl transition-all text-xs flex items-center justify-center space-x-2 ${isDarkMode ? 'bg-[#150F30] border-purple-950 text-slate-300 hover:border-purple-600 hover:bg-slate-900' : 'bg-white border-purple-200 text-purple-950 hover:bg-purple-50'}`}
              >
                <Download className="w-4 h-4 text-purple-500" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-2xl blur-lg opacity-25 animate-pulse" />
            
            <div className={`relative border rounded-2xl p-6 shadow-2xl space-y-6 ${isDarkMode ? 'bg-[#120E2C] border-purple-950/70' : 'bg-white border-purple-200/80'}`}>
              {/* Profile Spotlight Block */}
              <div className="text-center space-y-4 pb-6 border-b border-purple-950/10">
                {/* Clean Dynamic Status Tag */}
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-mono font-semibold mx-auto ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-800'}`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>SYSTEM STATUS: ACTIVE & VERIFIED</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className={`font-extrabold text-3xl tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Saqlain Ahmad</h3>
                  <p className="text-xs text-purple-500 font-mono font-bold uppercase tracking-wider">Manual QA & API Tester</p>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Available Immediately for Contract / Full-Time Roles</p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                    <span className={`px-2.5 py-1 text-sm font-bold font-mono rounded border ${isDarkMode ? 'bg-purple-950/50 text-purple-300 border-purple-900/30' : 'bg-purple-100 text-purple-700 border-purple-200'}`}>Manual Testing</span>
                    <span className={`px-2.5 py-1 text-sm font-bold font-mono rounded border ${isDarkMode ? 'bg-purple-950/50 text-purple-300 border-purple-900/30' : 'bg-purple-100 text-purple-700 border-purple-200'}`}>API Automation</span>
                    <span className={`px-2.5 py-1 text-sm font-bold font-mono rounded border ${isDarkMode ? 'bg-purple-950/50 text-purple-300 border-purple-900/30' : 'bg-purple-100 text-purple-700 border-purple-200'}`}>Mobile Lab</span>
                  </div>
                </div>
              </div>

              {/* QA Professional Audit Scorecard */}
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xs font-mono uppercase tracking-wider font-extrabold ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                    QA Professional Audit Scorecard
                  </h4>
                  <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-900/30' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'}`}>
                    EXECUTIVE SUMMARY
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* Metric 1: Defect Leakage Rate */}
                  <div className={`p-3 rounded-xl border flex flex-col justify-between transition-all hover:scale-[1.02] duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-950/60 border-purple-900/20 hover:border-purple-800/40' 
                      : 'bg-slate-50 border-purple-200/60 hover:border-purple-300'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider`}>Defect Leakage</span>
                        <span className="flex h-1.5 w-1.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                      </div>
                      <span className={`text-xl font-black font-mono tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        &lt; 0.5%
                      </span>
                    </div>
                    <p className={`text-xs mt-1 leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Production-safe delivery.
                    </p>
                  </div>

                  {/* Metric 2: Test Cases Drafted & Run */}
                  <div className={`p-3 rounded-xl border flex flex-col justify-between transition-all hover:scale-[1.02] duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-950/60 border-purple-900/20 hover:border-purple-800/40' 
                      : 'bg-slate-50 border-purple-200/60 hover:border-purple-300'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider`}>Test Suite Size</span>
                        <span className="text-xs font-mono text-purple-500 font-extrabold uppercase">VERIFIED</span>
                      </div>
                      <span className={`text-xl font-black font-mono tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        1,200+
                      </span>
                    </div>
                    <p className={`text-xs mt-1 leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Drafted, executed & cataloged.
                    </p>
                  </div>

                  {/* Metric 3: API Coverage */}
                  <div className={`p-3 rounded-xl border flex flex-col justify-between transition-all hover:scale-[1.02] duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-950/60 border-purple-900/20 hover:border-purple-800/40' 
                      : 'bg-slate-50 border-purple-200/60 hover:border-purple-300'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider`}>API Coverage</span>
                        <span className="text-xs font-mono text-emerald-500 font-extrabold uppercase">95%+</span>
                      </div>
                      <span className={`text-xl font-black font-mono tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        95%+
                      </span>
                    </div>
                    <p className={`text-xs mt-1 leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      End-to-end payload audits.
                    </p>
                  </div>

                  {/* Metric 4: Agile Sprint Cycles */}
                  <div className={`p-3 rounded-xl border flex flex-col justify-between transition-all hover:scale-[1.02] duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-950/60 border-purple-900/20 hover:border-purple-800/40' 
                      : 'bg-slate-50 border-purple-200/60 hover:border-purple-300'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider`}>Sprint Cycles</span>
                        <span className="text-xs font-mono text-indigo-500 font-extrabold uppercase">AGILE</span>
                      </div>
                      <span className={`text-xl font-black font-mono tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        20+
                      </span>
                    </div>
                    <p className={`text-xs mt-1 leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Successful production cycles.
                    </p>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border text-sm leading-relaxed text-slate-500 dark:text-slate-400 ${isDarkMode ? 'bg-purple-950/10 border-purple-900/20' : 'bg-purple-50/40 border-purple-100'}`}>
                  <span className="font-bold text-purple-600 dark:text-purple-400 block mb-0.5">🚀 Strategic Value Add</span>
                  Translating manual & automated validation precision into highly stable, business-focused production releases.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className={`border-y py-10 ${isDarkMode ? 'bg-[#110B25]/40 border-purple-950/40' : 'bg-purple-50/50 border-purple-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((st, i) => (
              <div 
                key={i} 
                className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 text-left flex items-center space-x-4 ${isDarkMode ? 'bg-[#150F30]/40 border-purple-950/30' : 'bg-white border-purple-100 shadow-sm'}`}
              >
                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-purple-950/30 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                  {st.icon === 'FileText' ? <FileText className="w-5 h-5" /> : 
                   st.icon === 'Bug' ? <Bug className="w-5 h-5" /> : 
                   st.icon === 'Terminal' ? <Terminal className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">{st.value}</span>
                  <span className={`text-sm font-bold uppercase tracking-wider block mt-0.5 leading-tight ${isDarkMode ? 'text-slate-400' : 'text-purple-800'}`}>{st.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>






      {/* PORTFOLIO SLIDER */}
      <section id="portfolio" className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className={`inline-flex px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest border shadow-sm ${isDarkMode ? 'bg-purple-950/20 text-purple-400 border-purple-800/30' : 'bg-purple-100 text-purple-700 border-purple-200'}`}>
            My Portfolio
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">Showcase Projects</h2>
          <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-purple-800/80'}`}>A selection of applications and platforms I have validated.</p>
        </div>
        <ProjectsSlider isDarkMode={isDarkMode} />
      </section>

      {/* AGILE JIRA CLONE KANBAN SPRINT PLANNER */}
      <section id="projects" className="py-20 lg:py-24 border-t max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-purple-950/10">
        <JiraBoard isDarkMode={isDarkMode} />
      </section>

      {/* TECHNICAL SKILLS MATRIX */}
      <section id="skills" className="py-20 lg:py-24 border-t relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-purple-950/10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className={`inline-flex px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest border shadow-sm ${isDarkMode ? 'bg-purple-950/20 text-purple-400 border-purple-800/30' : 'bg-purple-100 text-purple-700 border-purple-200'}`}>
            My Toolbox
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">Technical Skills & Disciplines</h2>
          <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-purple-800/80'}`}>A comprehensive breakdown of technical methodologies and software test kits I use daily to certify product releases.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch text-left">
          {/* Methodologies */}
          <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#150F30]/60 border-purple-950/30' : 'bg-white border-purple-100 shadow-sm'} space-y-5`}>
            <h3 className="font-bold text-base flex items-center space-x-2 border-b border-purple-950/10 pb-3">
              <Sliders className="w-5 h-5 text-purple-500" />
              <span>Testing Methodology Credentials</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS.filter(s => s.category === 'Testing').map((s, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border ${isDarkMode ? 'bg-slate-950/40 border-slate-900' : 'bg-purple-50/40 border-purple-100'}`}>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="font-bold">{s.name}</span>
                    <span className="text-purple-500 font-bold">{s.proficiency}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full rounded-full" style={{ width: `${s.proficiency}%` }} />
                  </div>
                  <p className="text-sm text-slate-500 font-mono mt-1.5 leading-normal">{s.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Software Tools */}
          <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#150F30]/60 border-purple-950/30' : 'bg-white border-purple-100 shadow-sm'} space-y-5`}>
            <h3 className="font-bold text-base flex items-center space-x-2 border-b border-purple-950/10 pb-3">
              <Cpu className="w-5 h-5 text-indigo-500" />
              <span>Diagnostics & Agile Infrastructure Stack</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS.filter(s => s.category === 'Tools').map((s, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border ${isDarkMode ? 'bg-slate-950/40 border-slate-900' : 'bg-purple-50/40 border-purple-100'}`}>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="font-bold">{s.name}</span>
                    <span className="text-purple-500 font-bold">{s.proficiency}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full rounded-full" style={{ width: `${s.proficiency}%` }} />
                  </div>
                  <p className="text-sm text-slate-500 font-mono mt-1.5 leading-normal">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENTO SERVICES GRID */}
      <section id="services" className="py-20 lg:py-24 border-t relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-purple-950/10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className={`inline-flex px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest border shadow-sm ${isDarkMode ? 'bg-purple-950/20 text-purple-400 border-purple-800/30' : 'bg-purple-100 text-purple-700 border-purple-200'}`}>
            My Services
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">Professional Testing Deliverables</h2>
          <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-purple-800/80'}`}>Targeted testing services to isolate errors, secure vulnerabilities, and protect margins.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
          {SERVICES.map((s, idx) => {
            const IconComp = s.icon === 'Globe' ? Globe :
                             s.icon === 'Smartphone' ? Smartphone :
                             s.icon === 'Terminal' ? Terminal : Bug;
            return (
              <div 
                key={idx}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] ${isDarkMode ? 'bg-[#150F30]/80 border-purple-950/30 hover:border-purple-500/40' : 'bg-white border-purple-200 hover:border-purple-300 shadow-sm'}`}
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl w-fit ${isDarkMode ? 'bg-purple-950/30 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-lg">{s.title}</h4>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-purple-950/80'}`}>{s.description}</p>
                </div>

                <div className="border-t border-purple-950/10 mt-6 pt-4 space-y-2">
                  <span className="text-sm uppercase font-mono text-slate-500 font-bold tracking-wider">Sub-domain Audit:</span>
                  <div className={`grid grid-cols-1 xl:grid-cols-2 gap-2 text-sm font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {s.items.map((it, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                        <span className="leading-tight break-words">{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY HIRE ME */}
      <section className={`py-20 border-t ${isDarkMode ? 'bg-[#110B25]/30 border-purple-950/40' : 'bg-purple-50/30 border-purple-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className={`inline-flex px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest border shadow-sm ${isDarkMode ? 'bg-purple-950/20 text-purple-400 border-purple-800/30' : 'bg-purple-100 text-purple-700 border-purple-200'}`}>
              Axioms
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">Why Choose Me?</h2>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-purple-800/80'}`}>I believe manual software validation is not a checklist—it is an investigative craft.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {[
              { title: 'Rigorous Reproducible Logs', desc: 'I construct Jira tickets detailing complete preconditions, reproducible step-by-step instructions, actual outcomes, expected results, and diagnostics environment settings to help programmers fix code immediately.' },
              { title: 'Accelerated Sprint Timelines', desc: 'By writing fast sanity loops and exploratory checks, I certify hotfixes and core releases quickly, helping your team scale features securely without operational bottlenecks.' },
              { title: 'Clear Business Alignment', desc: 'I speak fluent English and communicate engineering complexities simple and direct, ensuring project leaders and stakeholders remain in perfect lockstep.' }
            ].map((el, i) => (
              <div key={i} className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#150F30] border-purple-950/30' : 'bg-white border-purple-200 shadow-sm'} space-y-3`}>
                <div className="w-9 h-9 rounded-xl bg-purple-600/10 text-purple-500 font-mono font-bold flex items-center justify-center border border-purple-500/20">{i+1}</div>
                <h4 className="font-extrabold text-base">{el.title}</h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-purple-950/80'}`}>{el.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECT SECTION */}
      <section id="contact" className="py-20 lg:py-24 border-t max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-purple-950/10 text-center">
        <div className="max-w-2xl mx-auto flex flex-col space-y-8 items-center">
          <div className="space-y-4">
            <span className={`inline-flex px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest border shadow-sm ${isDarkMode ? 'bg-purple-950/20 text-purple-400 border-purple-800/30' : 'bg-purple-100 text-purple-700 border-purple-200'}`}>
              Scoping
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">Let's Establish Software Trust</h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-purple-950/80'}`}>
              Have a platform, web application, or custom API that needs validation before release? Let's chat and map out a comprehensive manual testing plan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 text-center ${isDarkMode ? 'bg-slate-950/50 border-slate-900' : 'bg-purple-50 border-purple-200'}`}>
              <div className="p-2 bg-purple-600/10 text-purple-500 border border-purple-500/10 rounded-lg">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono text-slate-500 block font-bold">Direct Inquiries</span>
                <a href="mailto:saqlainlive331@gmail.com" className="text-xs font-bold font-mono hover:underline block mt-0.5">saqlainlive331@gmail.com</a>
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 text-center ${isDarkMode ? 'bg-slate-950/50 border-slate-900' : 'bg-purple-50 border-purple-200'}`}>
              <div className="p-2 bg-emerald-600/10 text-emerald-400 border border-emerald-500/10 rounded-lg">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono text-slate-500 block font-bold">Phone / WhatsApp</span>
                <a href="tel:+923060695405" className="text-xs font-bold font-mono block mt-0.5 hover:underline">+923060695405</a>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <span className="text-sm uppercase font-mono font-bold tracking-wider text-slate-500 block">Freelance Platforms & Social Links</span>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/saqlain-a-0774191a0/' }
              ].map((s) => (
                <a 
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold flex items-center space-x-2 transition-all ${isDarkMode ? 'bg-slate-950 border-slate-900 text-slate-300 hover:bg-slate-900 hover:text-white' : 'bg-white border-purple-200 hover:bg-purple-50 text-purple-950'}`}
                >
                  <s.icon className="w-4 h-4 text-purple-500" />
                  <span>{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className={`flex items-center justify-center space-x-2 font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <Bug className="w-4 h-4 text-purple-500 animate-bounce" />
            <span>SAQLAIN AHMAD // QA CERTIFIED SPECIALIST</span>
          </div>
          <p className="max-w-md mx-auto text-sm text-slate-500 leading-relaxed">
            I help businesses establish trust in their systems by identifying critical vulnerabilities, optimizing REST payloads, and validating UI layouts.
          </p>
          <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <span>© {new Date().getFullYear()} Saqlain Ahmad. All rights reserved.</span>
            <div className="flex space-x-3">
              <a href="#hero" className="hover:text-purple-500">Back to Top</a>
              <span>//</span>
              <span className="text-emerald-500 flex items-center space-x-1.5 font-bold">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>ALL SPRINT TICKETS SIGNED OFF</span>
              </span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
