'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import HeaderNav from '@/components/layout/HeaderNav'
import { formatSrsDate, formatSrsDuration } from '@/lib/wiki-format'

interface SessionData {
  id: string
  name: string
  code: string
  status: string
  startDate: string
  endDate: string
  examPapers: Array<{
    id: string
    paper: {
      id: string
      name: string
      topic: string
      durationMinutes: number
      totalScore: number
    }
  }>
}

export default function ViewSessionPage({ params }: { params: { code: string } }) {
  const [session, setSession] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showConfirm, setShowConfirm] = useState<{paperId: string, name: string} | null>(null)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))

    const token = localStorage.getItem('token')
    fetch(`/api/sessions/by-code/${params.code}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) setError(data.error)
        else setSession(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Lỗi khi tải dữ liệu kỳ thi')
        setLoading(false)
      })
  }, [params.code])

  const handleStartTest = async () => {
    if (!showConfirm || !session) return
    setLoading(true)
    
    try {
      const token = localStorage.getItem('token')
      // Use member-friendly endpoint
      const res = await fetch('/api/submissions/start', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ sessionId: session.id, examPaperId: showConfirm.paperId })
      })
      const data = await res.json()
      if (data.submissionId) {
        router.push(`/exam/${data.submissionId}`)
      } else {
        alert(data.error || 'Không thể bắt đầu bài thi')
        setLoading(false)
        setShowConfirm(null)
      }
    } catch (e) {
      alert('Lỗi kết nối máy chủ')
      setLoading(false)
    }
  }

  if (loading) return <div style={{ padding: 100, textAlign: 'center' }}>Đang tải thông tin...</div>
  if (error || !session) return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <HeaderNav />
        <div style={{ padding: 100, textAlign: 'center' }}>
           <div className="badge badge-danger" style={{ padding: '12px 24px', fontSize: '1rem' }}>{error || 'Không tìm thấy kỳ thi'}</div>
        </div>
      </main>
    </div>
  )

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <HeaderNav />
        <div style={{ padding: '32px 40px' }}>
          
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <button className="btn btn-secondary btn-sm" onClick={() => router.back()}>← Quay lại</button>
              <span className="badge badge-info">Mã: {session.code}</span>
            </div>
            <h2 className="page-title">{session.name}</h2>
            <p className="page-subtitle">Chi tiết lịch trình và các bài thi thành phần</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>
            
            {/* Exam Papers Table */}
            <div className="glass-panel" style={{ background: '#fff' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--glass-border)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Danh sách bài thi</h3>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Tên bài thi</th>
                    <th>Chủ đề</th>
                    <th>Thời lượng</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {session.examPapers.map(({ paper }) => (
                    <tr key={paper.id}>
                      <td style={{ fontWeight: 600 }}>{paper.name}</td>
                      <td><span className="badge badge-teal">{paper.topic}</span></td>
                      <td>{formatSrsDuration(paper.durationMinutes)}</td>
                      <td>
                        <span className="badge badge-warning">Chưa thực hiện</span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => setShowConfirm({ paperId: paper.id, name: paper.name })}
                        >
                          Vào thi
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Session Sidebar Info */}
            <div className="glass-panel" style={{ background: '#fff', padding: 24 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>Thông tin kỳ thi</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label className="nav-section-label" style={{ padding: 0, marginBottom: 4, display: 'block' }}>Thời gian bắt đầu</label>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{formatSrsDate(session.startDate)}</div>
                </div>
                <div>
                  <label className="nav-section-label" style={{ padding: 0, marginBottom: 4, display: 'block' }}>Thời gian kết thúc</label>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{formatSrsDate(session.endDate)}</div>
                </div>
                <div>
                  <label className="nav-section-label" style={{ padding: 0, marginBottom: 4, display: 'block' }}>Trạng thái hệ thống</label>
                  <span className={`badge badge-${session.status === 'ACTIVE' ? 'success' : 'danger'}`}>
                    {session.status === 'ACTIVE' ? 'Đang mở' : 'Đã đóng'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* NDUY_03 Confirm Modal */}
      {showConfirm && (
        <div className="modal-backdrop">
          <div className="modal-box" style={{ maxWidth: 450, textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: 8 }}>NDUY_03</div>
            <h3 className="modal-title">Bạn có muốn thực hiện bài thi "{showConfirm.name}" không?</h3>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleStartTest}>Có, bắt đầu</button>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowConfirm(null)}>Hủy bỏ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
