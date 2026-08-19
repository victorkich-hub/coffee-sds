import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sprout,
  ArrowLeft,
} from 'lucide-react'
import { useState } from 'react'

import useAuth from '../hooks/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const { login } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const from = location.state?.from || '/'

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

    if (!form.email || !form.password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)

    try {
      await login(form.email, form.password)

      /*
        At this point authentication was successful.

        We send the user back to the page they originally
        wanted to access, or to the home page.
      */
      navigate(from, {
        replace: true,
      })
    } catch (error) {
      setError(
        error?.message ||
        'Unable to sign in. Please check your details.'
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

        {/* Login Card */}
        <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-black text-gray-900">
              Welcome back
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign in to your Coffee Seedlings account.
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
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  onClick={() => {
                    alert(
                      'Password recovery will be connected to the backend.'
                    )
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input-field px-10"
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
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
            </div>

            {/* Remember me */}
            <div className="flex items-center">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-emerald-700 focus:ring-emerald-500"
                />

                Remember me
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
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Register */}
          <div className="mt-7 border-t border-gray-100 pt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="mt-1 inline-block font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              Create a new account
            </Link>
          </div>

          {/* Demo information */}
          <div className="mt-5 rounded-xl bg-emerald-50 p-3 text-center">
            <p className="text-xs leading-5 text-emerald-800">
              Demo mode: use any valid email and password.
            </p>
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