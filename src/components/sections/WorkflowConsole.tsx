import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { CircleDot, Sparkles } from 'lucide-react'
import { InViewRoot } from '../primitives/InViewRoot'
import { SectionHeading } from '../primitives/SectionHeading'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { intakeScenarios, reviewRoutingNodes, liveRecordSatellites } from '../../content/workflows'
import './WorkflowConsole.css'

type ModeId = 'intake' | 'routing' | 'record'

interface ModeMeta {
  id: ModeId
  label: string
  short: string
  title: string
  body: string
}

const MODES: ModeMeta[] = [
  {
    id: 'intake',
    label: 'Adaptive Intake',
    short: 'Intake',
    title: 'Forms change with the submission.',
    body: 'Protocol type, sponsor, personnel, and risk profile determine fields, documents, and routing — before the record moves forward.',
  },
  {
    id: 'routing',
    label: 'Review Routing',
    short: 'Routing',
    title: 'Approvals move through the right path.',
    body: 'Configurable rules send work to administrators, committees, reviewers, departments, and leadership — without manual handoffs.',
  },
  {
    id: 'record',
    label: 'Live Record',
    short: 'Record',
    title: 'The institutional record stays connected.',
    body: 'Awards, protocols, disclosures, commitments, integrations, and reporting views stay aligned across the research lifecycle.',
  },
]

export function WorkflowConsole() {
  const [active, setActive] = useState<ModeId>('intake')
  const [autoMode, setAutoMode] = useState(true)
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 })
  const tabRefs = useRef<Record<ModeId, HTMLButtonElement | null>>({ intake: null, routing: null, record: null })
  const [indicator, setIndicator] = useState<{ left: number; top: number; width: number; height: number }>({ left: 0, top: 0, width: 0, height: 0 })

  useEffect(() => {
    const update = () => {
      const el = tabRefs.current[active]
      if (!el || !el.parentElement) return
      setIndicator({
        left: el.offsetLeft,
        top: el.offsetTop,
        width: el.offsetWidth,
        height: el.offsetHeight,
      })
    }
    update()
    const ro = new ResizeObserver(update)
    Object.values(tabRefs.current).forEach((el) => el && ro.observe(el))
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [active])

  useEffect(() => {
    if (!autoMode || !inView || reduced) return
    const id = setInterval(() => {
      setActive((cur) => {
        const idx = MODES.findIndex((m) => m.id === cur)
        return MODES[(idx + 1) % MODES.length].id
      })
    }, 8000)
    return () => clearInterval(id)
  }, [autoMode, inView, reduced])

  const meta = MODES.find((m) => m.id === active)!

  return (
    <InViewRoot as="section" id="workflow" className="wfc section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Workflow Console"
          title="Configurable logic, visible end to end."
          body="Every workflow in Novelution is built on three pillars: adaptive intake, intelligent routing, and a live institutional record."
        />

        <div className="wfc__shell" ref={ref}>
          <div className="wfc__tabs" role="tablist" aria-label="Workflow modes">
            <span
              className="wfc__indicator"
              aria-hidden="true"
              style={{
                transform: `translate(${indicator.left}px, ${indicator.top}px)`,
                width: indicator.width,
                height: indicator.height,
              }}
            />
            {MODES.map((m) => (
              <button
                key={m.id}
                ref={(el) => {
                  tabRefs.current[m.id] = el
                }}
                role="tab"
                aria-selected={active === m.id}
                aria-controls={`wfc-panel-${m.id}`}
                id={`wfc-tab-${m.id}`}
                className={clsx('wfc__tab', active === m.id && 'is-active')}
                onClick={() => {
                  setActive(m.id)
                  setAutoMode(false)
                }}
              >
                <span className="wfc__tab-long">{m.label}</span>
                <span className="wfc__tab-short">{m.short}</span>
              </button>
            ))}
            <button
              className={clsx('wfc__auto', autoMode && 'is-on')}
              onClick={() => setAutoMode((v) => !v)}
              aria-label={autoMode ? 'Pause auto-cycle' : 'Resume auto-cycle'}
              title={autoMode ? 'Auto: on' : 'Auto: off'}
            >
              <CircleDot size={12} /> Auto
            </button>
          </div>

          <div
            id={`wfc-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`wfc-tab-${active}`}
            className="wfc__stage"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="wfc__panel"
              >
                {active === 'intake' && <IntakePanel />}
                {active === 'routing' && <RoutingPanel inView={inView} />}
                {active === 'record' && <RecordPanel inView={inView} />}
              </motion.div>
            </AnimatePresence>

            <div className="wfc__copy">
              <div className="wfc__copy-eyebrow">
                <Sparkles size={14} /> {meta.label}
              </div>
              <h3>{meta.title}</h3>
              <p>{meta.body}</p>
            </div>
          </div>
        </div>
      </div>
    </InViewRoot>
  )
}

/* ---------- Intake ---------- */

function IntakePanel() {
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setScenarioIdx((i) => (i + 1) % intakeScenarios.length), 6000)
    return () => clearInterval(id)
  }, [reduced])

  const scenario = intakeScenarios[scenarioIdx]

  return (
    <div className="wfc__intake">
      <div className="wfc__intake-trigger">
        <span className="wfc__mono">Submission type</span>
        <AnimatePresence mode="wait">
          <motion.strong
            key={scenario.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {scenario.trigger}
          </motion.strong>
        </AnimatePresence>
      </div>

      <div className="wfc__intake-grid">
        <div className="wfc__intake-block">
          <span className="wfc__mono">Required fields</span>
          <ul>
            <AnimatePresence mode="popLayout">
              {scenario.fields.map((field, i) => (
                <motion.li
                  key={`${scenario.id}-f-${field}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <span className="wfc__field-dot" />
                  {field}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        <div className="wfc__intake-block">
          <span className="wfc__mono">Required documents</span>
          <ul>
            <AnimatePresence mode="popLayout">
              {scenario.docs.map((doc, i) => (
                <motion.li
                  key={`${scenario.id}-d-${doc}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <span className="wfc__field-dot wfc__field-dot--purple" />
                  {doc}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>

      <div className="wfc__intake-route">
        <span className="wfc__mono">Routes to</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={scenario.routeChip}
            className="wfc__route-chip"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            → {scenario.routeChip}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="wfc__intake-dots">
        {intakeScenarios.map((s, i) => (
          <button
            key={s.id}
            className={clsx('wfc__dot', i === scenarioIdx && 'is-active')}
            onClick={() => setScenarioIdx(i)}
            aria-label={`Show scenario ${s.trigger}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------- Routing ---------- */

function RoutingPanel({ inView }: { inView: boolean }) {
  const reduced = useReducedMotion()
  const [activeNode, setActiveNode] = useState(0)

  useEffect(() => {
    if (reduced || !inView) return
    const id = setInterval(() => setActiveNode((i) => (i + 1) % reviewRoutingNodes.length), 1400)
    return () => clearInterval(id)
  }, [reduced, inView])

  const messages = [
    'Department approves',
    'Committee queue opens',
    'Compliance review complete',
    'Leadership sees status',
  ]

  return (
    <div className="wfc__routing">
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="wfc__routing-svg" aria-hidden="true">
        <defs>
          <linearGradient id="routeLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#4cc9f0" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <line x1="6" y1="12" x2="94" y2="12" stroke="rgba(255,255,255,0.1)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <line
          x1="6"
          y1="12"
          x2={6 + ((94 - 6) * (activeNode + 1)) / reviewRoutingNodes.length}
          y2="12"
          stroke="url(#routeLine)"
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
          style={{ transition: 'all 0.6s var(--ease-default)' }}
        />
      </svg>

      <ol className="wfc__routing-nodes">
        {reviewRoutingNodes.map((node, i) => (
          <li key={node} className={clsx('wfc__route-node', activeNode === i && 'is-active', i < activeNode && 'is-done')}>
            <span className="wfc__route-pulse" />
            <span className="wfc__route-pin">{i + 1}</span>
            <strong>{node}</strong>
          </li>
        ))}
      </ol>

      <div className="wfc__routing-log">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode}
            className="wfc__log-line"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
          >
            <span className="wfc__log-check">✓</span>
            <span>{messages[activeNode]}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------- Live Record ---------- */

const SAT_STATUSES: Record<string, string> = {
  Personnel: 'Connected',
  Disclosures: 'Synced',
  Commitments: 'Live',
  Reports: 'Connected',
  Integrations: 'Synced',
  'Audit Trail': 'Recording',
}

function RecordPanel({ inView }: { inView: boolean }) {
  const reduced = useReducedMotion()
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const isMobile = vw < 768
  if (isMobile) return <RecordMobile inView={inView} reduced={reduced} />
  return <RecordOrbital inView={inView} reduced={reduced} />
}

function RecordOrbital({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const [pulseTick, setPulseTick] = useState(0)

  useEffect(() => {
    if (reduced || !inView) return
    const id = setInterval(() => setPulseTick((t) => t + 1), 5000)
    return () => clearInterval(id)
  }, [reduced, inView])

  return (
    <div className="wfc__record">
      <svg viewBox="0 0 600 400" className="wfc__record-svg" aria-hidden="true">
        <defs>
          <linearGradient id="recordLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#4cc9f0" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        {liveRecordSatellites.map((_, i) => {
          const angle = (i / liveRecordSatellites.length) * Math.PI * 2 - Math.PI / 2
          const r = 150
          const x = 300 + Math.cos(angle) * r
          const y = 200 + Math.sin(angle) * r
          return (
            <line
              key={i}
              x1="300"
              y1="200"
              x2={x}
              y2={y}
              stroke="url(#recordLine)"
              strokeWidth="1.4"
              strokeDasharray="6 8"
              opacity={0.55}
              className="wfc__record-edge"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          )
        })}
        <circle cx="300" cy="200" r="56" fill="rgba(76,201,240,0.08)" stroke="rgba(76,201,240,0.4)" strokeWidth="1" />
        <circle cx="300" cy="200" r="80" fill="none" stroke="rgba(76,201,240,0.18)" strokeWidth="1" strokeDasharray="2 4" />
      </svg>

      <div className="wfc__record-center">
        <small>Award · Protocol</small>
        <strong>Institutional Record</strong>
        <span>Updated · {pulseTick % 60}s ago</span>
      </div>

      {liveRecordSatellites.map((sat, i) => {
        const angle = (i / liveRecordSatellites.length) * Math.PI * 2 - Math.PI / 2
        const x = 50 + Math.cos(angle) * 38
        const y = 50 + Math.sin(angle) * 38
        return (
          <motion.div
            key={sat}
            className="wfc__record-sat"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={{ scale: pulseTick > 0 ? [1, 1.04, 1] : 1 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <span className="wfc__sat-dot" />
            <strong>{sat}</strong>
          </motion.div>
        )
      })}
    </div>
  )
}

function RecordMobile({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (reduced || !inView) return
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % liveRecordSatellites.length)
      setTick((t) => t + 1)
    }, 1500)
    return () => clearInterval(id)
  }, [reduced, inView])

  return (
    <div className="wfc__rec-m">
      {/* Center: Institutional Record card */}
      <div className="wfc__rec-m-card">
        <div className="wfc__rec-m-card-head">
          <span className="wfc__mono">Award · Protocol</span>
          <span className="wfc__rec-m-live">
            <span className="wfc__rec-m-live-dot" /> Live
          </span>
        </div>
        <strong className="wfc__rec-m-id">RX-2407-118</strong>
        <span className="wfc__rec-m-name">Institutional Record</span>
        <span className="wfc__rec-m-meta">
          <span className="wfc__rec-m-meta-dot" />
          Updated · {tick % 60}s ago
        </span>
      </div>

      {/* Connection rail with flowing data particles */}
      <div className="wfc__rec-m-rail" aria-hidden="true">
        <span className="wfc__rec-m-rail-line" />
        <span className="wfc__rec-m-rail-flow wfc__rec-m-rail-flow--a" />
        <span className="wfc__rec-m-rail-flow wfc__rec-m-rail-flow--b" />
        <span className="wfc__rec-m-rail-flow wfc__rec-m-rail-flow--c" />
        <span className="wfc__rec-m-rail-fan" />
      </div>

      {/* Connected satellites */}
      <ul className="wfc__rec-m-list" role="list">
        {liveRecordSatellites.map((sat, i) => {
          const isActive = activeIdx === i
          return (
            <li
              key={sat}
              className={clsx('wfc__rec-m-row', isActive && 'is-active')}
            >
              <span className="wfc__rec-m-row-dot" aria-hidden="true" />
              <strong>{sat}</strong>
              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.span
                    key="active"
                    className="wfc__rec-m-status wfc__rec-m-status--active"
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {SAT_STATUSES[sat] || 'Synced'}
                  </motion.span>
                ) : (
                  <span className="wfc__rec-m-status">Connected</span>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
