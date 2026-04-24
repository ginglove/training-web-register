'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ExamPaper {
  id: string
  name: string
  topic: string
  durationMinutes: number
  totalScore: number
  _count: { questions: number }
  createdBy: { fullName: string }
}

export default function ManageExamsPage() {
  const [exams, setExams] = useState<ExamPaper[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/exams', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        setExams(await res.json())
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = exams.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 className="page-title">Quản lý Đề thi</h2>
        <Link href="/manage/exams/new" className="btn btn-primary" style={{ padding: '10px 24px', textDecoration: 'none' }}>
          + Tạo đề thi mới
        </Link>
      </div>

      <div className="glass-panel" style={{ padding: '20px', marginBottom: 24, background: '#f8fafc' }}>
        <div style={{ position: 'relative', width: 300 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
          <input 
            className="form-input" 
            placeholder="Tìm kiếm đề thi..." 
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 36, borderRadius: 20, width: '100%' }}
          />
        </div>
      </div>

      <div className="glass-panel" style={{ background: '#fff', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}><input type="checkbox" /></th>
              <th>Tên đề thi ↕</th>
              <th>Thể loại ↕</th>
              <th>Số câu hỏi ↕</th>
              <th>Thời gian ↕</th>
              <th>Người tạo ↕</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40 }}>Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40 }}>No data</td></tr>
            ) : filtered.map(e => (
              <tr key={e.id}>
                <td><input type="checkbox" /></td>
                <td style={{ fontWeight: 600 }}>
                  <Link href={`/manage/exams/${e.id}`} style={{ textDecoration: 'none', color: 'var(--accent-blue)' }}>
                    {e.name}
                  </Link>
                </td>
                <td><span className="badge badge-teal">{e.topic}</span></td>
                <td>{e._count.questions}</td>
                <td>{e.durationMinutes}p</td>
                <td>{e.createdBy?.fullName || 'Manager'}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link href={`/manage/exams/${e.id}`} className="btn btn-secondary btn-sm" style={{ textDecoration: 'none' }}>Sửa</Link>
                    <button className="btn btn-danger btn-sm">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 24px', borderTop: '1px solid var(--glass-border)', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>1 of 1</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary btn-sm" disabled>Prev</button>
            <button className="btn btn-secondary btn-sm" disabled>Next</button>
          </div>
        </div>
      </div>
    </>
  )
}
