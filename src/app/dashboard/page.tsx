'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatSrsDate, truncateSrsText } from '@/lib/wiki-format'

interface Session {
  id: string
  name: string
  code: string
  status: string
  startDate: string
  endDate: string
}

interface PersonalStats {
  totalSessions: number
  completedExams: number
  pendingExams: number
  avgScore: number
}

export default function MemberDashboard() {
  const router = useRouter()
  const [sessions, setSessions] = useState<Session[]>([])
  const [stats, setStats] = useState<PersonalStats | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('ACTIVE')
  const [search, setSearch] = useState('')
  const [startDateFrom, setStartDateFrom] = useState('')
  const [startDateTo, setStartDateTo] = useState('')
  const [endDateFrom, setEndDateFrom] = useState('')
  const [endDateTo, setEndDateTo] = useState('')
  const [dateError, setDateError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 20

  useEffect(() => {
    if (startDateFrom && startDateTo && new Date(startDateFrom) > new Date(startDateTo)) {
      setDateError(`[NDUY_12] Ngày “From” phải nhỏ hơn ngày “To”`)
    } else if (endDateFrom && endDateTo && new Date(endDateFrom) > new Date(endDateTo)) {
      setDateError(`[NDUY_12] Ngày “From” phải nhỏ hơn ngày “To”`)
    } else {
      setDateError(null)
    }
  }, [startDateFrom, startDateTo, endDateFrom, endDateTo])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    setLoading(true)
    
    // Fetch Sessions
    fetch('/api/sessions', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => {
        if (r.status === 401 || r.status === 403) {
          router.push('/login')
          return null
        }
        if (!r.ok) throw new Error('Failed to fetch')
        return r.json()
      })
      .then(data => {
        if (data && Array.isArray(data)) {
          setSessions(data)
        }
      })
      .catch(err => console.error(err))

    // Fetch Personal Stats
    fetch('/api/reports/my-stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => setStats(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))

  }, [router])

  // Process data
  let processed = sessions.filter(s => s.status === statusFilter)
  
  if (search) {
    processed = processed.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
  }
  
  if (startDateFrom) processed = processed.filter(s => new Date(s.startDate) >= new Date(startDateFrom))
  if (startDateTo) processed = processed.filter(s => new Date(s.startDate) <= new Date(startDateTo))
  if (endDateFrom) processed = processed.filter(s => new Date(s.endDate) >= new Date(endDateFrom))
  if (endDateTo) processed = processed.filter(s => new Date(s.endDate) <= new Date(endDateTo))
  
  processed.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

  const totalPages = Math.ceil(processed.length / PAGE_SIZE) || 1
  const paginated = processed.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const userSummary = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {}

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <h2 className="page-title">Chào mừng quay trở lại, {userSummary.fullName || userSummary.username}!</h2>
        <p className="page-subtitle">Dưới đây là tóm tắt hoạt động đào tạo của bạn (Thời gian thực).</p>
      </div>

      {/* Real-time Personal Stats Cards */}
      <div className="flex gap-4 mb-8">
        {[
          { label: 'Kỳ thi đã tham gia', value: stats?.totalSessions || 0, color: 'var(--accent-blue)' },
          { label: 'Đã hoàn thành', value: stats?.completedExams || 0, color: 'var(--success)' },
          { label: 'Điểm trung bình', value: stats?.avgScore?.toFixed(1) || '0.0', color: 'var(--accent-teal)' },
        ].map(s => (
          <div key={s.label} className="glass-panel" style={{ padding: '20px 24px', flex: 1, textAlign: 'center', background: '#fff' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{loading ? '...' : s.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-panel mb-8" style={{ padding: 24, background: '#fff', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Họ và tên</span>
          <span style={{ fontSize: '1rem', fontWeight: 600 }}>{userSummary.fullName || '—'}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Vai trò</span>
          <span className="badge badge-info" style={{ width: 'fit-content' }}>{userSummary.role}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Email</span>
          <span style={{ fontSize: '1rem', fontWeight: 600 }}>{userSummary.email || '—'}</span>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Lịch thi của tôi</h3>
      </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 300 }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
              <input 
                type="text" 
                placeholder="Tìm kiếm tên kỳ thi..." 
                className="form-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 36, width: '100%' }}
              />
            </div>
            <select 
              className="form-input" 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value)}
              style={{ maxWidth: 200 }}
            >
              <option value="ACTIVE">Publish (Đang diễn ra)</option>
              <option value="DONE">Ended (Đã kết thúc)</option>
            </select>
          </div>
          {dateError && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', fontWeight: 600 }}>{dateError}</div>}
        </div>

        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Tên kỳ thi</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: 40 }}>Loading...</td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: 40 }}>Không có kỳ thi nào</td></tr>
              ) : paginated.map(s => (
                <tr key={s.id}>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{truncateSrsText(s.name)}</span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mã: {s.code}</div>
                  </td>
                  <td>{formatSrsDate(s.startDate)}</td>
                  <td>{formatSrsDate(s.endDate)}</td>
                  <td>
                    <Link href={`/session/${s.code}`} className="btn btn-secondary btn-sm" style={{ textDecoration: 'none' }}>
                      Xem chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 24px', borderTop: '1px solid var(--glass-border)', alignItems: 'center', gap: 16 }}>
            <button 
              className="btn btn-secondary" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              style={{ padding: '6px 20px', borderRadius: 4, fontWeight: 600 }}
            >
              Prev
            </button>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{currentPage} of {totalPages}</span>
            <button 
              className="btn btn-secondary" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              style={{ padding: '6px 20px', borderRadius: 4, fontWeight: 600 }}
            >
              Next
            </button>
          </div>
        </div>
    </>
  )
}
