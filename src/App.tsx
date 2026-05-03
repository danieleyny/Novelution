import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardCheck,
  Cpu,
  Database,
  FileCheck2,
  FileText,
  FlaskConical,
  GitBranch,
  HeartPulse,
  Layers3,
  Menu,
  Network,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react'
import './App.css'

const modules = [
  {
    title: 'Grants & Contracts',
    icon: FileText,
    body: 'Manage sponsored research from proposal through award, post-award actions, subawards, agreements, and closeout.',
    bullets: ['Pre-award and post-award workflows', 'Budget development and routing', 'Subawards and non-financial agreements'],
  },
  {
    title: 'IRB',
    icon: HeartPulse,
    body: 'Support human subjects research review with configurable forms, routing, review logic, amendments, and committee workflows.',
    bullets: ['Review type determination', 'Amendment and continuing review workflows', 'Committee and administrative review support'],
  },
  {
    title: 'IACUC',
    icon: ClipboardCheck,
    body: 'Manage animal research protocols, species details, experimental procedures, housing, transportation, and review workflows.',
    bullets: ['Species and protocol management', 'Experimental detail capture', 'Animal ordering and housing workflows'],
  },
  {
    title: 'IBC',
    icon: FlaskConical,
    body: 'Manage biosafety review processes for biological agents, viral vectors, human tissues, containment, PPE, and related needs.',
    bullets: ['Biosafety protocol workflows', 'Risk and containment details', 'Committee review support'],
  },
  {
    title: 'COI / COC',
    icon: Scale,
    body: 'Capture, route, review, and manage disclosures involving financial interests, outside activities, IP, travel, and plans.',
    bullets: ['SFI and relatedness questionnaires', 'Management plan documentation', 'Configurable disclosure workflows'],
  },
  {
    title: 'Current & Pending',
    icon: FileCheck2,
    body: 'Help faculty and administrators prepare sponsor-specific reports and visualize project effort, active support, and pending support.',
    bullets: ['Sponsor-specific report generation', 'Editable goals, effort, and cost fields', 'Integrated source system data'],
  },
  {
    title: 'Effort Reporting',
    icon: UsersRound,
    body: 'Support institutional effort reporting and review workflows with configurable periods, approvals, dashboards, and transparency.',
    bullets: ['Faculty and administrator workflows', 'Commitment visibility', 'Reporting and review tools'],
  },
  {
    title: 'Dashboards & Integrations',
    icon: BarChart3,
    body: 'Surface information across modules, systems of record, personnel data, financial systems, training systems, and reporting tools.',
    bullets: ['Cross-module visibility', 'Configurable dashboards', 'Integration-ready architecture'],
  },
]

const testimonials = [
  {
    institution: 'University of Pennsylvania',
    name: 'Barak Zahavy',
    role: 'Director of Information Systems, Office of the Vice Provost for Research',
    tag: 'Responsive Partner',
    quote:
      'Novelution is deeply committed to helping clients be successful. The team is tirelessly responsive and creative. They are thoughtful, excellent problem solvers and demonstrate a deep commitment to quality, user-friendly solutions.',
  },
  {
    institution: 'Cornell University',
    name: 'Zachary Jacques',
    role: 'Director, Research Admin. Info. Services',
    tag: 'Modern Architecture',
    quote:
      'We were fortunate to find Novelution. Their research management system is comprehensive, modern, and easy to use on desktop computers and mobile devices. The system architecture was well thought out, which makes it efficient to customize and to integrate with.',
  },
  {
    institution: 'Florida Atlantic University',
    name: 'Miriam Campo',
    role: 'Director, Sponsored Programs',
    tag: 'User-Friendly',
    quote:
      'The Novelution team is wonderful to work with. They make sure every research administration item is taken into account as they are building the system for FAU. I have been involved in system implementations previously, and this one by far is the best.',
  },
  {
    institution: 'North Dakota University System',
    name: 'Patricia Johnson',
    role: 'Project Manager',
    tag: 'Complex Implementation',
    quote:
      'My organization has been working with Novelution on a complex, long range implementation for multiple campuses. Their performance has been outstanding.',
  },
]

const workflowModes = [
  {
    label: 'Adaptive intake',
    stage: 'mode-intake',
    title: 'Forms change with the submission.',
    body: 'Protocol type, sponsor, personnel, and risk profile determine fields, documents, and routing before the record moves forward.',
    metrics: ['Required docs', 'Review type', 'Office route'],
    cards: [
      ['If', 'Human subjects research'],
      ['Then', 'IRB logic appears'],
      ['And', 'Only required fields show'],
    ],
    chips: ['Risk profile', 'Sponsor rules', 'Documents'],
  },
  {
    label: 'Review routing',
    stage: 'mode-routing',
    title: 'Approvals move through the right path.',
    body: 'Configurable rules send work to administrators, committees, reviewers, departments, or leadership without manual handoffs.',
    metrics: ['Admin check', 'Committee review', 'Final approval'],
    cards: [
      ['If', 'Department approves'],
      ['Then', 'Committee queue opens'],
      ['And', 'Leadership sees status'],
    ],
    chips: ['Dept chair', 'Compliance office', 'Committee'],
  },
  {
    label: 'Live record',
    stage: 'mode-record',
    title: 'The institutional record stays connected.',
    body: 'Awards, protocols, disclosures, commitments, integrations, and reporting views stay aligned across the research lifecycle.',
    metrics: ['Source systems', 'Audit trail', 'Leadership view'],
    cards: [
      ['If', 'Award or protocol updates'],
      ['Then', 'Related records refresh'],
      ['And', 'Dashboards stay current'],
    ],
    chips: ['Award', 'Disclosure', 'Report'],
  },
]

const interestOptions = [
  'Full research administration platform',
  'Grants & Contracts',
  'IRB',
  'IACUC',
  'IBC',
  'COI / Conflict of Commitment',
  'Current & Pending / Other Support',
  'Effort Reporting',
  'Integrations / Reporting',
  'Not sure yet',
]

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (href: string) => {
    if (href.startsWith('/')) {
      window.history.pushState({}, '', href)
      setPath(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header navigate={navigate} />
      {path === '/demo' ? <DemoPage /> : <HomePage navigate={navigate} />}
      <Footer navigate={navigate} />
    </>
  )
}

function Header({ navigate }: { navigate: (href: string) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const links = [
    ['Platform', '#platform'],
    ['Modules', '#modules'],
    ['Why Novelution', '#why'],
    ['Clients', '#clients'],
    ['Resources', '#resources'],
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    navigate(href)
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="/" onClick={(event) => (event.preventDefault(), go('/'))} aria-label="Novelution home">
        <BrandLogo />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <button key={label} onClick={() => go(href)}>
            {label}
          </button>
        ))}
      </nav>
      <div className="header-actions">
        <button className="text-link" onClick={() => go('#platform')}>
          Explore Platform
        </button>
        <button className="primary small" onClick={() => go('/demo')}>
          Request Demo
        </button>
        <button className="menu-toggle" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div className={`mobile-panel ${open ? 'open' : ''}`}>
        {links.map(([label, href]) => (
          <button key={label} onClick={() => go(href)}>
            {label}
          </button>
        ))}
        <button className="primary" onClick={() => go('/demo')}>
          Request Demo
        </button>
      </div>
    </header>
  )
}

function BrandLogo() {
  return (
    <span className="brand-logo" aria-hidden="true">
      <span className="brand-mark">
        <i className="dot dot-1" />
        <i className="dot dot-2" />
        <i className="dot dot-3" />
        <i className="dot dot-4" />
        <i className="dot dot-5" />
        <i className="dot dot-6" />
        <i className="dot dot-7" />
      </span>
      <span className="brand-word">NOVELUTION</span>
    </span>
  )
}

function HomePage({ navigate }: { navigate: (href: string) => void }) {
  return (
    <main>
      <Hero navigate={navigate} />
      <ProblemCards />
      <PlatformOverview />
      <LifecycleTimeline />
      <ModuleGrid />
      <WhyNovelutionCards />
      <FeatureSpotlight />
      <Testimonials />
      <CompetitivePositioning />
      <DemoCTA navigate={navigate} />
    </main>
  )
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Hero({ navigate }: { navigate: (href: string) => void }) {
  return (
    <section className="hero-section">
      <div className="hero-bg" />
      <div className="hero-inner">
        <Reveal className="hero-copy">
          <div className="eyebrow"><Sparkles size={16} /> Enterprise research operations</div>
          <h1>Research administration, redesigned.</h1>
          <strong className="hero-thesis">Grants. Compliance. Disclosures. Reporting. One configurable platform.</strong>
          <p>
            Novelution connects the workflows, approvals, records, and reports behind modern university research operations.
          </p>
          <div className="hero-buttons">
            <button className="primary" onClick={() => navigate('/demo')}>
              Request a Demo <ArrowRight size={18} />
            </button>
            <button className="secondary" onClick={() => navigate('#platform')}>
              Explore the Platform
            </button>
          </div>
          <span className="proof-line">Trusted by research institutions to modernize sponsored programs, compliance, disclosures, and reporting.</span>
        </Reveal>
        <HeroMockup />
      </div>
    </section>
  )
}

function HeroMockup() {
  const reduceMotion = useReducedMotion()
  const nodes = ['Grants', 'IRB', 'IACUC', 'IBC', 'COI', 'C&P', 'Effort', 'Reporting']
  return (
    <Reveal className="hero-visual" aria-hidden="true">
      <div className="command-deck">
        <div className="deck-topline">
          <span>Research operations graph</span>
          <strong>Live institutional record</strong>
        </div>
        <div className="deck-grid">
          <div className="signal-panel">
            <span>Active workflow</span>
            <strong>IRB amendment</strong>
            <em>Conditional route detected</em>
          </div>
          <div className="signal-panel muted-panel">
            <span>Visibility</span>
            <strong>8 modules</strong>
            <em>Connected to source data</em>
          </div>
        </div>
        <div className="orbital-map">
          <svg viewBox="0 0 620 430" className="connection-map">
            <defs>
              <linearGradient id="line" x1="0" x2="1">
                <stop offset="0%" stopColor="#4cc9f0" />
                <stop offset="52%" stopColor="#62e6c8" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path className="mesh-line" d="M310 214 L128 96 M310 214 L312 72 M310 214 L498 118 M310 214 L534 284 M310 214 L382 356 M310 214 L188 360 M310 214 L86 258" />
            <path className="mesh-orbit" d="M120 254 C178 88 431 62 518 178 C603 291 467 401 278 371 C104 344 55 300 120 254Z" />
            <path className="mesh-orbit secondary-orbit" d="M190 126 C290 52 455 122 470 251 C485 370 308 405 202 314 C116 239 116 181 190 126Z" />
            <circle className="pulse-ring" cx="310" cy="214" r="76" />
          </svg>
          <motion.div className="center-node" animate={reduceMotion ? {} : { y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <Database size={25} />
            <small>Unified</small>
            <span>Research Record</span>
          </motion.div>
          {nodes.map((node, index) => (
            <motion.div
              className={`module-node node-${index}`}
              key={node}
              animate={reduceMotion ? {} : { y: [0, index % 2 ? 7 : -7, 0] }}
              transition={{ duration: 5 + index * 0.25, repeat: Infinity, ease: 'easeInOut' }}
            >
              {node}
            </motion.div>
          ))}
          <motion.div className="data-ribbon ribbon-a" animate={reduceMotion ? {} : { x: [0, 16, 0] }} transition={{ duration: 6, repeat: Infinity }}>
            Source data synced
          </motion.div>
          <motion.div className="data-ribbon ribbon-b" animate={reduceMotion ? {} : { x: [0, -14, 0] }} transition={{ duration: 7, repeat: Infinity }}>
            Approval path resolved
          </motion.div>
        </div>
      </div>
    </Reveal>
  )
}

function SectionHeading({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return (
    <Reveal className="section-heading">
      {eyebrow && <span className="eyebrow muted">{eyebrow}</span>}
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </Reveal>
  )
}

function ProblemCards() {
  const problems = [
    ['Fragmented Systems', 'Data and decisions are spread across disconnected tools, creating duplicate work and limited visibility.', Network],
    ['Compliance Complexity', 'Changing sponsor, federal, and institutional requirements make manual tracking increasingly risky.', ShieldCheck],
    ['Administrative Burden', 'Faculty, reviewers, and administrators lose time navigating forms, routing, approvals, and reporting.', Layers3],
  ] as const
  return (
    <section className="section light">
      <SectionHeading
        title="Research administration should not feel fragmented."
        body="Research institutions manage complex workflows across proposals, awards, compliance reviews, disclosures, reporting, and sponsor requirements. Too often, these processes live in disconnected systems, static forms, spreadsheets, email chains, and rigid platforms that do not match local workflows."
      />
      <div className="card-grid three">
        {problems.map(([title, body, Icon]) => (
          <Reveal className="problem-card card" key={title}>
            <Icon size={24} />
            <h3>{title}</h3>
            <p>{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function PlatformOverview() {
  return (
    <section id="platform" className="section platform-overview">
      <SectionHeading
        eyebrow="Platform"
        title="One connected platform for the full research lifecycle."
        body="Novelution brings research administration workflows into a unified, configurable platform. From proposal development to compliance review, from disclosures to reporting, Novelution helps institutions manage complexity without forcing every office into the same rigid process."
      />
      <Reveal className="overview-panel">
        <div>
          <GitBranch size={28} />
          <h3>Configurable workflows, connected records, institutional visibility.</h3>
        </div>
        <p>
          Offices can start with the modules they need now, then expand into a broader research administration ecosystem
          as priorities evolve.
        </p>
      </Reveal>
    </section>
  )
}

function LifecycleTimeline() {
  const steps = [
    ['Capture', 'Collect the right information once.'],
    ['Route', 'Send it through local policy paths.'],
    ['Review', 'Coordinate offices, reviewers, and committees.'],
    ['Connect', 'Link awards, protocols, people, and disclosures.'],
    ['Report', 'Give administrators and leaders usable visibility.'],
  ]
  return (
    <section className="section compact dark-band lifecycle-section">
      <div className="lifecycle-head">
        <Reveal>
          <span className="eyebrow">Research lifecycle</span>
          <h2>Every submission becomes part of one operational record.</h2>
        </Reveal>
        <Reveal>
          <p>Novelution helps institutions move from intake to review to reporting without losing context between offices, modules, or systems of record.</p>
        </Reveal>
      </div>
      <div className="lifecycle-map">
        {steps.map(([step, body], index) => (
          <Reveal className="life-step" key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
            <p>{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ModuleGrid() {
  return (
    <section id="modules" className="section light">
      <SectionHeading
        eyebrow="Modules"
        title="Integrated modules for modern research administration."
        body="Start with the modules your institution needs now, then expand as your research administration ecosystem evolves."
      />
      <div className="module-grid">
        {modules.map(({ title, body, bullets, icon: Icon }) => (
          <Reveal className="module-card card" key={title}>
            <div className="card-top">
              <Icon size={24} />
              <h3>{title}</h3>
            </div>
            <p>{body}</p>
            <ul>
              {bullets.map((bullet) => (
                <li key={bullet}><Check size={16} /> {bullet}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function WhyNovelutionCards() {
  const items = [
    ['Configurable by Design', 'Adapt forms, routing, logic, permissions, and workflows around institutional policies and office-specific needs.'],
    ['Integrated Across the Research Enterprise', 'Connect grants, compliance, disclosures, personnel, reports, and project records in one research administration ecosystem.'],
    ['Designed to Reduce Burden', 'Give faculty, reviewers, and administrators a smoother experience with fewer duplicative steps and clearer workflows.'],
    ['Implementation as Partnership', 'Novelution works closely with institutions to understand local language, workflows, policies, and operational realities.'],
    ['Built to Evolve', 'Support changing sponsor requirements, federal expectations, institutional policies, and future module expansion.'],
  ]
  return (
    <section id="why" className="section why-section">
      <SectionHeading eyebrow="Why Novelution" title="Built for institutions that need flexibility without losing control." />
      <div className="why-grid">
        {items.map(([title, body], index) => (
          <Reveal className={`why-card card span-${index === 0 || index === 1 ? 'wide' : 'normal'}`} key={title}>
            <span className="index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function FeatureSpotlight() {
  const [active, setActive] = useState(0)
  const mode = workflowModes[active]
  const features = [
    'Conditional logic for forms, documents, and routing',
    'Side-by-side version comparison',
    'Cross-module visibility and sponsor-specific reporting',
    'Fewer manual handoffs and duplicate entries',
  ]
  return (
    <section className="section light feature-spotlight">
      <Reveal className="workflow-console">
        <div className="workflow-tabs" role="tablist" aria-label="Workflow intelligence views">
          {workflowModes.map((item, index) => (
            <button
              aria-selected={active === index}
              className={active === index ? 'active' : ''}
              key={item.label}
              onClick={() => setActive(index)}
              role="tab"
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className={`console-stage ${mode.stage}`}>
          <motion.div
            className="stage-glow"
            key={`glow-${active}`}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
          />
          <div className="logic-core">
            <Cpu size={25} />
            <span>{mode.label}</span>
          </div>
          <div className="chip-stack">
            {mode.chips.map((chip) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
              >
                {chip}
              </motion.span>
            ))}
          </div>
          <div className="rule-card rule-left">
            <small>{mode.cards[0][0]}</small>
            <strong>{mode.cards[0][1]}</strong>
          </div>
          <div className="rule-card rule-right">
            <small>{mode.cards[1][0]}</small>
            <strong>{mode.cards[1][1]}</strong>
          </div>
          <div className="rule-card rule-bottom">
            <small>{mode.cards[2][0]}</small>
            <strong>{mode.cards[2][1]}</strong>
          </div>
          <svg viewBox="0 0 540 320" className="logic-lines" key={`lines-${active}`}>
            <defs>
              <linearGradient id="logicLine" x1="0" x2="1">
                <stop offset="0%" stopColor="#4cc9f0" />
                <stop offset="55%" stopColor="#62e6c8" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path className="path-left" d="M270 160 C190 110 150 92 98 92" />
            <path className="path-right" d="M270 160 C354 112 398 92 448 92" />
            <path className="path-bottom" d="M270 160 C270 228 260 255 270 286" />
            {active === 2 && <path className="record-loop" d="M98 92 C164 30 376 30 448 92 C510 150 468 270 270 286 C88 274 40 158 98 92" />}
          </svg>
        </div>
      </Reveal>
      <Reveal className="feature-copy">
        <span className="eyebrow muted">Workflow intelligence</span>
        <h2>{mode.title}</h2>
        <p>{mode.body}</p>
        <div className="metric-row">
          {mode.metrics.map((metric) => <span key={metric}>{metric}</span>)}
        </div>
        <ul className="feature-list">
          {features.map((feature) => (
            <li key={feature}><Check size={18} /> {feature}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  const selected = testimonials[active]
  return (
    <section id="clients" className="section testimonials-section">
      <div className="proof-shell">
        <Reveal className="proof-copy">
          <span className="eyebrow">Institution proof</span>
          <h2>Built with research offices that manage real complexity.</h2>
          <p>Research administration teams choose Novelution when they need a responsive partner, modern architecture, and implementation that respects institutional complexity.</p>
        </Reveal>
        <Reveal className="quote-stage">
          <Quote size={38} />
          <blockquote>{selected.quote}</blockquote>
          <div className="person">
            <strong>{selected.name}</strong>
            <span>{selected.role}</span>
          </div>
        </Reveal>
        <div className="institution-rail">
          {testimonials.map((testimonial, index) => (
            <button className={active === index ? 'active' : ''} key={testimonial.name} onClick={() => setActive(index)}>
              <span>{testimonial.institution}</span>
              <em>{testimonial.tag}</em>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function CompetitivePositioning() {
  const items = [
    ['Workflow model', 'Rigid paths', 'Configurable institutional logic'],
    ['System shape', 'Disconnected point tools', 'Connected research lifecycle'],
    ['Implementation', 'Vendor handoff', 'Partnership around local operations'],
    ['Change readiness', 'Static forms', 'Evolving workflows and requirements'],
    ['User experience', 'Administrative burden', 'Guided faculty and administrator paths'],
  ]
  return (
    <section id="resources" className="section positioning">
      <div className="positioning-shell">
        <Reveal className="positioning-copy">
          <span className="eyebrow muted">Different by design</span>
          <h2>A platform for institutions that refuse one-size-fits-all research administration.</h2>
          <p>Novelution is not just a module catalog. It is a configurable operating layer for sponsored programs, compliance, disclosures, reporting, and institutional workflows.</p>
        </Reveal>
        <Reveal className="comparison-console">
          <div className="console-labels">
            <span>Typical systems</span>
            <strong>Novelution</strong>
          </div>
          {items.map(([theme, before, after]) => (
            <div className="comparison-row" key={theme}>
              <small>{theme}</small>
              <span>{before}</span>
              <ArrowRight size={17} />
              <strong>{after}</strong>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function DemoCTA({ navigate }: { navigate: (href: string) => void }) {
  return (
    <section className="demo-cta">
      <Reveal>
        <h2>See how Novelution can fit your institution.</h2>
        <p>
          Schedule a focused demo around your institution's research administration priorities: sponsored programs,
          compliance, disclosures, Current & Pending, effort reporting, integrations, or full-platform implementation.
        </p>
        <button className="primary" onClick={() => navigate('/demo')}>
          Request a Demo <ArrowRight size={18} />
        </button>
        <span>Tell us which workflows matter most. We will tailor the conversation around your institution's needs.</span>
      </Reveal>
    </section>
  )
}

function DemoPage() {
  const [submitted, setSubmitted] = useState(false)
  const expectations = [
    "We will learn about your institution's research administration priorities.",
    'We will discuss the modules and workflows most relevant to your team.',
    'We will show how Novelution can be configured around your institutional needs.',
  ]
  const formId = 'demo-request-form'

  return (
    <main className="demo-page">
      <section className="demo-hero">
        <Reveal className="demo-intro">
          <span className="eyebrow">Request Demo</span>
          <h1>See Novelution around the workflows that matter most.</h1>
          <p>
            Share a few details and the Novelution team can tailor the conversation around your institution's research
            administration priorities.
          </p>
          <div className="expectations card">
            <h2>What to expect</h2>
            {expectations.map((item, index) => (
              <div className="expectation" key={item}>
                <span>{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="demo-form-wrap">
          <form
            className="demo-form"
            aria-labelledby={`${formId}-heading`}
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <h2 id={`${formId}-heading`}>Tell us about your institution</h2>
            <div className="field-grid">
              <label>Name<input required name="name" autoComplete="name" /></label>
              <label>Email<input required name="email" type="email" autoComplete="email" /></label>
              <label>Institution / Organization<input required name="organization" autoComplete="organization" /></label>
              <label>Role<input name="role" autoComplete="organization-title" /></label>
              <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
              <label>
                Area of interest
                <select name="interest" defaultValue="Full research administration platform">
                  {interestOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>Message<textarea name="message" rows={5} placeholder="Tell us which workflows, modules, or integrations matter most." /></label>
            <button className="primary" type="submit">
              Request a Demo <ArrowRight size={18} />
            </button>
            {submitted && <p className="form-note">Thanks. This front-end demo captured the request locally; connect the form to Novelution's CRM or email workflow before launch.</p>}
          </form>
        </Reveal>
      </section>
    </main>
  )
}

function Footer({ navigate }: { navigate: (href: string) => void }) {
  return (
    <footer className="footer">
      <div>
        <BrandLogo />
        <p>Novel and evolving solutions for research management</p>
      </div>
      <nav aria-label="Footer navigation">
        <button onClick={() => navigate('#platform')}>Platform</button>
        <button onClick={() => navigate('#modules')}>Modules</button>
        <button onClick={() => navigate('#why')}>Why Novelution</button>
        <button onClick={() => navigate('/demo')}>Request Demo</button>
      </nav>
      <address>
        <a href="mailto:demo-request@novelution.com">demo-request@novelution.com</a>
        <span>147 W. 105th Suite 2E, New York, NY 10025, USA</span>
      </address>
      <small>© 2026 Novelution Corp. All rights reserved.</small>
    </footer>
  )
}

export default App
