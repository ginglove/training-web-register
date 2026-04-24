import Sidebar from '@/components/layout/Sidebar'
import HeaderNav from '@/components/layout/HeaderNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <HeaderNav />
        <div style={{ padding: '32px 40px', flex: 1 }}>
          {children}
        </div>
        
        <footer style={{
          textAlign: 'center', padding: '16px', fontSize: '0.75rem',
          color: 'var(--text-muted)', borderTop: '1px solid var(--glass-border)',
          background: 'rgba(255,255,255,0.5)'
        }}>
          Power by CMC Global © 2017
        </footer>
      </main>
    </div>
  )
}
