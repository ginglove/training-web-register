'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SessionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [session, setSession] = useState<any>(null)
  const [bank, setBank] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    if (id) {
      fetchDetail()
      fetchExamBank()
    }
  }, [id])

  const fetchDetail = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/manage/sessions/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.status === 401) {
        router.push('/login')
        return
      }
      if (res.ok) setSession(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchExamBank = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/exams', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) setBank(await res.json())
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddPaper = async (paperId: string) => {
    // Check if paper already exists in session to prevent UI errors
    if (session.examPapers?.some((p: any) => p.paperId === paperId)) {
      alert('Đề thi này đã có trong phiên thi này rồi.')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/manage/sessions/${id}/papers`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ paperId })
      })
      if (res.ok) {
        setShowAddModal(false)
        fetchDetail()
      } else {
        const errorData = await res.json()
        alert(errorData.error || 'Có lỗi xảy ra')
      }
    } catch (err) {
      console.error(err)
      alert('Lỗi kết nối')
    }
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>
  if (!session) return <div style={{ padding: 40, textAlign: 'center' }}>Session not found</div>

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 8, color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 8 }}>
          <Link href="/manage/sessions" style={{ color: 'inherit', textDecoration: 'none' }}>Kỳ thi</Link>
          <span>/</span>
          <span>{session.name}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="page-title">{session.name}</h2>
            <p className="page-subtitle">Mã phiên thi: <code style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{session.code}</code></p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-secondary" onClick={() => fetchDetail()}>Làm mới</button>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>+ Thêm đề thi</button>
          </div>
        </div>
      </div>

      <div className="glass-panel mb-6" style={{ background: '#fff', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--glass-border)', background: '#f8fafc' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Danh sách đề thi trong phiên</h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Tên đề thi</th>
              <th>Thời gian</th>
              <th>Số câu hỏi</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {!session.examPapers || session.examPapers.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Chưa có đề thi nào</td></tr>
            ) : session.examPapers.map((p: any) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600 }}>{p.paper.name}</td>
                <td>{p.paper.durationMinutes} phút</td>
                <td>{p.paper._count?.questions || 0} câu</td>
                <td>
                  <button className="btn btn-danger btn-sm">Gỡ bỏ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-box" style={{ maxWidth: 600 }} onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Thêm đề thi vào phiên</h3>
            <div style={{ maxHeight: 400, overflowY: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Tên đề thi</th>
                    <th>Thể loại</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {bank.map(b => {
                    const isAdded = session.examPapers?.some((p: any) => p.paperId === b.id)
                    return (
                      <tr key={b.id}>
                        <td style={{ fontWeight: 600 }}>{b.name}</td>
                        <td>{b.topic}</td>
                        <td>
                          {isAdded ? (
                            <span className="badge badge-success">Đã thêm</span>
                          ) : (
                            <button className="btn btn-primary btn-sm" onClick={() => handleAddPaper(b.id)}>Chọn</button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
