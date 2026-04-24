'use client'
import { useEffect, useState } from 'react'
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

export default function ManageSessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => { loadSessions() }, [])

  const loadSessions = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/sessions', { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) setSessions(await res.json())
    } finally { setLoading(false) }
  }

  const handleClone = async (id: string) => {
    if (!confirm('Bạn có muốn clone kỳ thi này không?')) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/manage/sessions/${id}/clone`, { 
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        alert('Clone thành công')
        loadSessions()
      }
    } catch (err) {
      alert('Lỗi khi clone')
    }
  }

  const filtered = sessions.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
  const PAGE_SIZE = 20
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <>
      {/* Box Title area */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="page-title">QUẢN LÝ KỲ THI</h2>
          <p className="page-subtitle">Thiết lập và quản lý các phiên thi tập trung</p>
        </div>
      </div>

      {/* Search Bar and Add Button */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative', width: 300 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
            <input 
              className="form-input" 
              placeholder="Tìm kiếm kỳ thi..." 
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 40, borderRadius: 12 }}
            />
          </div>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1.2rem' }}>+</span>
          Tạo kỳ thi mới
        </button>
      </div>

      {/* Table matching SRS wireframe */}
      <div style={{ flex: 1, overflowX: 'auto', padding: '0 32px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}><input type="checkbox" /></th>
              <th>Tên kỳ thi ↕</th>
              <th>Trạng thái ↕</th>
              <th>Ngày bắt đầu ↕</th>
              <th>Ngày kết thúc ↕</th>
              <th>Người tạo ↕</th>
              <th>Mã code ↕</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40 }}>Loading...</td></tr>
            ) : paginated.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40 }}>No data</td></tr>
            ) : paginated.map((s) => (
              <tr key={s.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <Link href={`/manage/sessions/${s.id}`} style={{ textDecoration: 'none', color: 'var(--accent-blue)' }}>
                    {truncateSrsText(s.name)}
                  </Link>
                </td>
                <td>{s.status === 'ACTIVE' ? 'Publish' : 'Done'}</td>
                <td>{formatSrsDate(s.startDate)}</td>
                <td>{formatSrsDate(s.endDate)}</td>
                <td>{/* Since we don't have createdBy in interface */} Manager</td>
                <td>{s.code}</td>
                <td>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleClone(s.id)}>Clone</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
        <button className="btn btn-secondary" style={{ color: 'var(--accent-red)' }}>Xóa đã chọn</button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button 
            className="btn btn-secondary" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >Prev</button>
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{currentPage} / {totalPages}</span>
          <button 
            className="btn btn-secondary" 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >Next</button>
        </div>
      </div>
    </>
  )
}
