'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import HeaderNav from '@/components/layout/HeaderNav'
import Sidebar from '@/components/layout/Sidebar'

export default function HomePage() {
  const [code, setCode] = useState('')
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const handleTest = () => {
    if (code.trim()) {
      router.push(`/session/${code.trim()}`)
    }
  }

  const content = (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: 24 }}>
            <input 
              type="text" 
              placeholder="Nhập mã code bài thi" 
              value={code}
              onChange={e => setCode(e.target.value)}
              className="glass-panel"
              style={{ 
                width: 400, padding: '16px 24px', fontSize: '1.2rem', textAlign: 'center', 
                border: '2px solid var(--glass-border)', outline: 'none', background: '#fff'
              }} 
            />
          </div>
          <button 
            onClick={handleTest}
            className="btn btn-primary" 
            style={{ 
              padding: '12px 60px', fontSize: '1.1rem', fontWeight: 700, 
              boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)' 
            }}
          >
            Test
          </button>
        </div>
      </main>

      <footer style={{ 
        textAlign: 'center', padding: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', 
        borderTop: '1px solid var(--glass-border)', background: '#fff' 
      }}>
        Power by CMC Global © 2017
      </footer>
    </div>
  )

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
        <HeaderNav />
        {content}
      </div>
    )
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
        <HeaderNav />
        <div style={{ flex: 1, marginTop: 'var(--header-height)' }}>
          {content}
        </div>
      </main>
    </div>
  )
}
