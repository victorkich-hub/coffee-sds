import { Link, useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sprout,
  User,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'
import { useState } from 'react'

import useAuth from '../hooks/useAuth'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (error) {
      setError('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError('Please complete all fields.')
      return
    }

    if (form.password.length < 6) {
      setError(
        'Password must contain at least 6 characters.'
      )
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!agreeToTerms) {
      setError(
        'Please agree to the terms and conditions.'
      )
      return
    }

    setLoading(true)

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      })

      navigate('/', {
        replace: true,
      })
    } catch (error) {
      setError(
        error?.message ||
        'Unable to create your account. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-background min-h-screen px-4 py-10">

      {/* Back to website */}
      <div className="mx-auto mb-6 max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-emerald-100"
        >
          <ArrowLeft size={17} />
          Back to website
        </Link>
      </div>

      <div className="mx-auto w-full max-w-md">

        {/* Logo */}
        <div className="mb-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-white"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-800 shadow-lg">
              <Sprout size={27} />
            </div>

            <div className="text-left">
              <h1 className="text-xl font-black">
                Coffee Seedlings
              </h1>

              <p className="text-xs text-emerald-100">
                Grow Better Coffee
              </p>
            </div>
          </Link>
        </div>

        {/* Register Card */}
        <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-black text-gray-900">
              Create an account
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Join Coffee Seedlings and start ordering quality
              seedlings.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >

            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full name
              </label>

              <div className="relative">
                <User
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="input-field pl-10"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input-field pl-10"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="input-field px-10"
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Use at least 6 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Confirm password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className="input-field px-10"
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  aria-label={
                    showConfirmPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(event) =>
                    setAgreeToTerms(
                      event.target.checked
                    )
                  }
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-700 focus:ring-emerald-500"
                />

                <span className="text-sm leading-5 text-gray-600">
                  I agree to the{' '}
                  <Link
                    to="/terms"
                    className="font-semibold text-emerald-700 hover:underline"
                  >
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/privacy"
                    className="font-semibold text-emerald-700 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
            <p className="text-sm font-bold text-emerald-900">
              Why create an account?
            </p>

            <div className="mt-3 space-y-2">
              <p className="flex items-center gap-2 text-xs text-emerald-800">
                <CheckCircle2 size={15} />
                Track your orders
              </p>

              <p className="flex items-center gap-2 text-xs text-emerald-800">
                <CheckCircle2 size={15} />
                Faster checkout
              </p>

              <p className="flex items-center gap-2 text-xs text-emerald-800">
                <CheckCircle2 size={15} />
                Manage your profile
              </p>
            </div>
          </div>

          {/* Login */}
          <div className="mt-7 border-t border-gray-100 pt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="mt-1 inline-block font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-center text-xs text-white/80">
          © {new Date().getFullYear()} Coffee Seedlings
        </p>
      </div>
    </div>
  )
}