import { Router } from 'express'
import passport from 'passport'
import { ajv, validateRegistration, validateAuthentification } from '../validation/validation.ts'
import { findUserByEmail, createUser } from '../repositories/users.repository.ts'
import { hashPassword, createToken } from '../auth.ts'
import type { UserSchema } from '../interfaces/interfaces.ts'
import type { RegisterBody, AuthenBody } from '../types/types.ts'

const router = Router()

const validateRegister = ajv.compile<RegisterBody>(validateRegistration)
const validateLogin = ajv.compile<AuthenBody>(validateAuthentification)

router.post('/auth/register', (req, res) => {
  if (!validateRegister(req.body)) {
    res.status(400).json({ errors: validateRegister.errors })
    return
  }

  const { email, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    res.status(400).json({ message: 'Passwords do not match' })
    return
  }

  if (findUserByEmail(email)) {
    res.status(409).json({ message: 'User already exists' })
    return
  }

  const user = createUser(email, hashPassword(password))
  res.status(201).json({ token: createToken(user) })
})

router.post('/auth/login', (req, res) => {
  if (!validateLogin(req.body)) {
    res.status(400).json({ errors: validateLogin.errors })
    return
  }

  const { email, password } = req.body
  const user = findUserByEmail(email)

  if (!user || user.password !== hashPassword(password)) {
    res.status(401).json({ message: 'Invalid email or password' })
    return
  }

  res.json({ token: createToken(user) })
})

router.get('/user', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err: unknown, user: UserSchema | false) => {
    if (err) return next(err)

    if (!user) {
      res.status(401).json({ message: 'Unauthorized request' })
      return
    }

    res.json({ id: user.id, email: user.email, createDate: user.createDate })
  })(req, res, next)
})

export default router
