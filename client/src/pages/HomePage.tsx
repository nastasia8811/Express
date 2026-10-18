import { motion, useScroll, useTransform, type Variants } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { NewsList } from '../news/NewsList'
import styles from './HomePage.module.css'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

const word: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const ABOUT_KEYS = ['fast', 'simple', 'yours'] as const

export default function HomePage() {
  const { t, i18n } = useTranslation()
  const { scrollY } = useScroll()
  const slow = useTransform(scrollY, [0, 900], [0, -140])
  const fast = useTransform(scrollY, [0, 900], [0, -300])
  const spin = useTransform(scrollY, [0, 900], [0, 120])

  const words = t('hero.title').split(' ')

  return (
    <>
      <section className={styles.hero} data-tone='cocoa'>
        <motion.div className={`${styles.blob} ${styles.blobPink}`} style={{ y: fast }} />
        <motion.div className={`${styles.blob} ${styles.blobRose}`} style={{ y: slow }} />
        <motion.div className={styles.ring} style={{ y: slow, rotate: spin }} />

        <div className={`container ${styles.heroContent}`}>
          <motion.p
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('hero.eyebrow')}
          </motion.p>

          <motion.h1
            key={i18n.language}
            className={styles.title}
            variants={container}
            initial='hidden'
            animate='show'
          >
            {words.map((w, i) => (
              <span key={i} className={styles.wordMask}>
                <motion.span variants={word} className={styles.word}>
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            <ButtonLink to='#news'>{t('hero.read')}</ButtonLink>
            <ButtonLink to='/news/new' variant='ghost' viewTransition>
              {t('nav.add')}
            </ButtonLink>
          </motion.div>
        </div>
      </section>

      <section id='news' className={styles.news} data-tone='wine'>
        <div className='container'>
          <Reveal>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>{t('list.title')}</h2>
              <ButtonLink to='/news/new' viewTransition>
                + {t('nav.add')}
              </ButtonLink>
            </div>
          </Reveal>
          <NewsList />
        </div>
      </section>

      <section className={styles.about} data-tone='ice'>
        <div className='container'>
          <Reveal>
            <h2 className={styles.sectionTitle}>{t('about.title')}</h2>
          </Reveal>
          <div className={styles.features}>
            {ABOUT_KEYS.map((key, index) => (
              <Reveal key={key} delay={index * 0.1}>
                <div className={styles.feature}>
                  <span className={styles.featureNumber}>0{index + 1}</span>
                  <h3>{t(`about.items.${key}.title`)}</h3>
                  <p>{t(`about.items.${key}.text`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} data-tone='rose'>
        <div className='container'>
          <Reveal>
            <h2 className={styles.ctaTitle}>{t('cta.title')}</h2>
            <p className={styles.ctaText}>{t('cta.text')}</p>
            <ButtonLink to='/news/new' viewTransition>
              + {t('nav.add')}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
