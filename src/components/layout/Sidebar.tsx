'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface NavItem {
  href: string
  label: string
  icon: string
  role?: string[]
}

export default function Sidebar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const navItems: NavItem[] = [
    { href: '/dashboard', label: 'Dashboard', icon: '🔥' },
    { href: '/manage/sessions', label: 'Quản lý kỳ thi', icon: '🏢' },
    { href: '/manage/exams', label: 'Quản lý đề thi', icon: '📄' },
    { href: '/manage/questions', label: 'Quản lý câu hỏi', icon: '☰' },
    { href: '/manage/categories', label: 'Quản lý DMCH', icon: '🎯' },
    { href: '/manage/reports', label: 'Báo cáo', icon: '🏁' },
    { href: '/manage/accounts', label: 'Quản lý tài khoản', icon: '⬛', role: ['ADMIN'] },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <aside className="sidebar">
      <div style={{ padding: '32px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--gradient-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', boxShadow: '0 8px 16px -4px rgba(37, 99, 235, 0.4)' }}>🎓</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>TrainIQ</div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', marginTop: 2, textTransform: 'uppercase' }}>Training System</div>
        </div>
      </div>

      <nav style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map(item => {
          if (item.role && (!user || !item.role.includes(user.role))) return null
          
          const active = isActive(item.href)
          return (
            <Link key={item.href} href={item.href} className={`nav-item ${active ? 'active' : ''}`}>
              <span className="nav-icon" style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              <span className="nav-label" style={{ fontWeight: active ? 700 : 500 }}>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
