'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function HeaderNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  const navItems = [
    { href: '/manage/grading', label: 'Chấm điểm', icon: '🗓️' },
    { href: '/dashboard', label: 'Kỳ thi', icon: '🕒' },
  ]

  return (
    <header className="top-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 40, height: '100%' }}>
        {/* Logo area - Always show as per img_page34_1.png */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gradient-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🎓</div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Logo</div>
        </div>

        {/* Middle Nav matching wireframe */}
        <nav style={{ display: 'flex', height: '100%' }}>
          {navItems.map(item => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '0 20px', height: '100%', textDecoration: 'none',
                color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                borderBottom: isActive ? '3px solid var(--accent-blue)' : '3px solid transparent',
                transition: 'var(--transition)'
              }}>
                <span style={{ fontSize: '1.2rem', marginBottom: 2 }}>{item.icon}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Right User Area matching wireframe dropdown (img_page35_1) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {!user ? (
          <Link href="/login" className="btn btn-secondary" style={{ padding: '8px 24px', fontWeight: 600 }}>
            Đăng nhập
          </Link>
        ) : (
          <>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>🔔</button>
            <div style={{ position: 'relative' }}>
              <div 
                style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}>
                  👤
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {user.fullName || user.username} <span style={{ fontSize: '0.7rem' }}>▼</span>
                </span>
              </div>

              {showDropdown && (
                <div className="glass-panel" style={{ 
                  position: 'absolute', top: '100%', right: 0, marginTop: 12, width: 160, 
                  background: '#fff', zIndex: 1000, padding: 8, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
                }}>
                  <Link href="/profile" className="nav-item" style={{ fontSize: '0.85rem', padding: '8px 12px' }}>
                    Hồ sơ cá nhân
                  </Link>
                  <button 
                    onClick={logout} 
                    className="nav-item" 
                    style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none', fontSize: '0.85rem', padding: '8px 12px', color: 'var(--accent-red)' }}
                  >
                    <span style={{ marginRight: 8 }}>↪</span> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  )
}
