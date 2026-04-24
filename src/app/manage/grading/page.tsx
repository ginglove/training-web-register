'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface AssignedSession {
  id: string
  name: string
  assignedBy: string
  status: string
}

export default function GradingSessionsPage() {
  const [sessions, setSessions] = useState<AssignedSession[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Chưa chấm xong')
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 20

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/sessions/assigned', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setSessions(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  let filtered = sessions.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 className="page-title">Danh sách kỳ thi được Assign</h2>
      </div>

      {/* Filters and Search */}
      <div className="glass-panel" style={{ background: '#f8fafc', padding: '20px', marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 300 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
          <input 
            className="form-input" 
            placeholder="Tìm kiếm tên kỳ thi..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 36, width: '100%', borderRadius: 20 }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Trạng thái:</span>
          <select 
            className="form-input" 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            style={{ width: 180 }}
          >
            <option value="Chưa chấm xong">Chưa chấm xong</option>
            <option value="Đã chấm">Đã chấm</option>
            <option value="All">Tất cả</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ background: '#fff', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Tên kỳ thi ↕</th>
              <th>Người assign chấm điểm ↕</th>
              <th>Trạng thái ↕</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} style={{ textAlign: 'center', padding: 40 }}>Đang tải...</td></tr>
            ) : paginated.length === 0 ? (
              <tr><td colSpan={3} style={{ textAlign: 'center', padding: 40 }}>Không có kỳ thi nào</td></tr>
            ) : paginated.map(s => (
              <tr key={s.id}>
                <td>
                  <Link href={`/manage/grading/${s.id}`} style={{ textDecoration: 'none', color: 'var(--accent-blue)', fontWeight: 600 }}>
                    {s.name}
                  </Link>
                </td>
                <td>{s.assignedBy}</td>
                <td>
                  <span className={`badge badge-${s.status === 'Đã chấm' ? 'success' : 'warning'}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 24px', borderTop: '1px solid var(--glass-border)', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {currentPage} of {totalPages}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              className="btn btn-secondary btn-sm" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Prev
            </button>
            <button 
              className="btn btn-secondary btn-sm" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
