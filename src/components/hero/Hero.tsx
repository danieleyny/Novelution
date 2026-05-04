import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '../primitives/Button'
import { Eyebrow } from '../primitives/Eyebrow'
import { HeroBackground } from './HeroBackground'
import { LiveSystemMock } from './LiveSystemMock'
import { InViewRoot } from '../primitives/InViewRoot'
import { heroCopy, trustLogos } from '../../content/copy'
import './Hero.css'

interface HeroProps {
  navigate: (href: string) => void
}

export function Hero({ navigate }: HeroProps) {
  return (
    <InViewRoot as="section" className="hero" threshold={0.05}>
      <HeroBackground />
      <div className="hero__inner container">
        <div className="hero__copy">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow icon={<Sparkles size={14} />}>{heroCopy.eyebrow}</Eyebrow>
          </motion.div>

          <motion.h1
            className="hero__headline"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroCopy.headline}
          </motion.h1>

          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroCopy.sub}
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              variant="primary"
              size="lg"
              iconRight={<ArrowRight size={18} />}
              onClick={() => navigate('/demo')}
            >
              {heroCopy.primaryCta}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              iconRight={<ChevronRight size={18} />}
              onClick={() => navigate('#modules')}
            >
              {heroCopy.secondaryCta}
            </Button>
          </motion.div>

          <motion.div
            className="hero__trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <span className="hero__trust-label">{heroCopy.trustLine}</span>
            <ul>
              {trustLogos.map((logo, i) => (
                <li
                  key={logo.short}
                  title={logo.name}
                  className={i === trustLogos.length - 1 ? 'hero__trust-item--mobile-hide' : undefined}
                >
                  {logo.logo ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${logo.logo}`}
                      alt={logo.name}
                      className="hero__trust-logo"
                      loading="lazy"
                    />
                  ) : (
                    <span>{logo.short}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <LiveSystemMock />
        </motion.div>
      </div>
    </InViewRoot>
  )
}
