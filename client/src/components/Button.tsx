import { motion } from 'motion/react'
import type { ComponentProps } from 'react'
import { Link } from 'react-router'
import styles from './Button.module.css'

type Variant = 'primary' | 'ghost'

const MotionLink = motion.create(Link)

const press = { whileHover: { y: -2 }, whileTap: { scale: 0.97 } }

function cls(variant: Variant, className?: string) {
  return [styles.button, styles[variant], className].filter(Boolean).join(' ')
}

type ButtonProps = ComponentProps<typeof motion.button> & { variant?: Variant }

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return <motion.button className={cls(variant, className)} {...press} {...props} />
}

type ButtonLinkProps = ComponentProps<typeof MotionLink> & { variant?: Variant }

export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return <MotionLink className={cls(variant, className)} {...press} {...props} />
}
