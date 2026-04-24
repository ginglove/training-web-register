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

export default function MemberDashboard() {
  const router = useRouter()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('ACTIVE') // ACTIVE maps to Publish
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
        } else {
          setSessions([])
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Dashboard fetch error:', err)
        setLoading(false)
        // Optionally set an error state here to show a message to the user
      })
  }, [router])

  // Process data (Filter -> Search -> Sort -> Paginate) per 4.2.5
  let processed = sessions.filter(s => s.status === statusFilter)
  
  if (search) {
    processed = processed.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
  }
  
  if (startDateFrom && startDateTo && new Date(startDateFrom) > new Date(startDateTo)) {
    // We can't easily return a Message here without state, so let's use an effect or local check
  }
  
  if (startDateFrom) processed = processed.filter(s => new Date(s.startDate) >= new Date(startDateFrom))
  if (startDateTo) processed = processed.filter(s => new Date(s.startDate) <= new Date(startDateTo))
  if (endDateFrom) processed = processed.filter(s => new Date(s.endDate) >= new Date(endDateFrom))
  if (endDateTo) processed = processed.filter(s => new Date(s.endDate) <= new Date(endDateTo))
  
  // Default Sort: Ngày bắt đầu giảm dần (4.2.5 Default)
  processed.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

  const totalPages = Math.ceil(processed.length / PAGE_SIZE) || 1
  const paginated = processed.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const userSummary = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {}

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <h2 className="page-title">Chào mừng quay trở lại, {userSummary.fullName || userSummary.username}!</h2>
        <p className="page-subtitle">Bạn có thể quản lý thông tin và xem các kỳ thi của mình tại đây.</p>
      </div>

      {/* 4.2.1 Personal Info Summary */}
      <div className="glass-panel" style={{ padding: 24, background: '#fff', marginBottom: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Họ và tên</span>
          <span style={{ fontSize: '1rem', fontWeight: 600 }}>{userSummary.fullName || '—'}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Email</span>
          <span style={{ fontSize: '1rem', fontWeight: 600 }}>{userSummary.email || '—'}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Vai trò</span>
          <span className="badge badge-info" style={{ width: 'fit-content' }}>{userSummary.role}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Trạng thái</span>
          <span className="badge badge-success" style={{ width: 'fit-content' }}>ACTIVE</span>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Kỳ thi đã tham gia</h3>
      </div>
        
        {/* Filters and Search Bar matching SRS 4.2.5.1 and 4.2.5.2 */}
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
              <option value="HIDDEN">Hidden (Đã ẩn)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Ngày bắt đầu:</span>
              <input type="date" className="form-input" style={{ width: 130 }} value={startDateFrom} onChange={e => setStartDateFrom(e.target.value)} />
              <span style={{ color: 'var(--text-muted)' }}>-</span>
              <input type="date" className="form-input" style={{ width: 130 }} value={startDateTo} onChange={e => setStartDateTo(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Ngày kết thúc:</span>
              <input type="date" className="form-input" style={{ width: 130 }} value={endDateFrom} onChange={e => setEndDateFrom(e.target.value)} />
              <span style={{ color: 'var(--text-muted)' }}>-</span>
              <input type="date" className="form-input" style={{ width: 130 }} value={endDateTo} onChange={e => setEndDateTo(e.target.value)} />
            </div>
            <button className="btn btn-secondary" style={{ padding: '6px 16px', background: 'var(--bg-primary)', fontSize: '0.85rem' }} onClick={() => {
              setStartDateFrom(''); setStartDateTo(''); setEndDateFrom(''); setEndDateTo(''); setSearch(''); setStatusFilter('ACTIVE');
            }}>Xóa filter</button>
          </div>
          {dateError && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', fontWeight: 600 }}>{dateError}</div>}
        </div>

        {/* List of Sessions */}
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Tên kỳ thi</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Trạng thái</th>
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
                    <Link href={`/session/${s.code}`} style={{ textDecoration: 'none', color: 'var(--accent-blue)', fontWeight: 500 }}>
                      {truncateSrsText(s.name)}
                    </Link>
                  </td>
                  <td>{formatSrsDate(s.startDate)}</td>
                  <td>{formatSrsDate(s.endDate)}</td>
                  <td>{s.status === 'ACTIVE' ? 'Publish' : 'Done'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination 4.2.5 / 7.3.1 */}
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
