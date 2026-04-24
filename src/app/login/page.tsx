'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<{code: string, message: string} | null>(null)
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Validate format per SRS 7.2.6 & 7.2.7
    if (username.length < 5 || username.length > 15) {
      setError({ code: 'NDUY_09', message: 'User name không đúng định dạng' })
      return
    }
    if (password.length < 5 || password.length > 15) {
      setError({ code: 'NDUY_10', message: 'Password không đúng định dạng' })
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()

      if (!res.ok) {
        // NDUY_11 per SRS 7.1
        setError({ code: 'NDUY_11', message: 'User name và password không hợp lệ' })
        setLoading(false)
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      router.push('/manage/sessions')
    } catch (err) {
      setError({ code: 'SYS_ERR', message: 'An error occurred. Please try again.' })
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Header matching SRS wireframe */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: '64px',
        background: 'rgba(255, 255, 255, 0.9)', borderBottom: '1px solid var(--glass-border)',
        backdropFilter: 'blur(10px)', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gradient-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🎓</div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Logo</div>
        </div>
      </header>

      {/* Main Content matching SRS wireframe login box */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px' }}>
        <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="glass-panel" style={{ 
             background: 'var(--bg-secondary)', padding: '40px 32px', borderRadius: 8, 
          }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: 24, textAlign: 'center', fontWeight: 600 }}>
              Đăng nhập Staff
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Tên đăng nhập</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input" 
                  style={{ background: 'var(--bg-primary)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Mật khẩu</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input" 
                  style={{ background: 'var(--bg-primary)' }}
                />
              </div>
            </div>
            
            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #f87171', borderRadius: 6, padding: '10px', marginTop: 16, textAlign: 'center' }}>
                <div style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 700 }}>{error.code}</div>
                <div style={{ color: '#ef4444', fontSize: '0.85rem' }}>{error.message}</div>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
              style={{ width: '100%', padding: '12px', fontSize: '1rem', fontWeight: 600, borderRadius: 6, marginTop: 24 }}
            >
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Link href="/" style={{ color: 'var(--accent-blue)', fontSize: '0.85rem', textDecoration: 'none' }}>
                ← Quay lại trang chủ
              </Link>
            </div>
          </div>
        </form>
      </main>

      <footer style={{
        textAlign: 'center', padding: '12px', fontSize: '0.75rem',
        color: 'var(--text-muted)', borderTop: '1px solid var(--glass-border)',
        background: 'var(--bg-primary)'
      }}>
        Power by CMC Global © 2017
      </footer>
    </div>
  )
}
