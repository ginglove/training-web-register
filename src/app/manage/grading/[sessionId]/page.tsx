'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface SubmissionGrading {
  id: string
  candidateName: string
  paperName: string
  essayToGrade: number
  ungradedCount: number
  status: string
}

export default function SessionGradingPage() {
  const params = useParams()
  const sessionId = params.sessionId as string
  const [submissions, setSubmissions] = useState<SubmissionGrading[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchSubmissions()
  }, [sessionId])

  const fetchSubmissions = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/manage/grading/${sessionId}`)
      if (res.ok) {
        const data = await res.json()
        setSubmissions(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = submissions.filter(s => 
    s.candidateName.toLowerCase().includes(search.toLowerCase()) ||
    s.paperName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <Link href="/manage/grading" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
          ← Quay lại danh sách kỳ thi
        </Link>
        <h2 className="page-title" style={{ marginTop: 8 }}>
          Danh sách bài thi cần chấm điểm
        </h2>
      </div>

      {/* Search */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: 24, background: '#f8fafc' }}>
        <div style={{ position: 'relative', width: 400 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
          <input 
            className="form-input" 
            placeholder="Tìm tên thí sinh hoặc tên đề thi..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 36, width: '100%', borderRadius: 20 }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ background: '#fff', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Tên bài thi (Thí sinh)</th>
              <th>Tên đề thi</th>
              <th>Số câu hỏi cần chấm</th>
              <th>Trạng thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40 }}>Đang tải...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40 }}>Không có bài thi nào</td></tr>
            ) : filtered.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 600 }}>{s.candidateName}</td>
                <td>{s.paperName}</td>
                <td>{s.ungradedCount} / {s.essayToGrade}</td>
                <td>
                  <span className={`badge badge-${s.status === 'Đã chấm' ? 'success' : 'warning'}`}>
                    {s.status}
                  </span>
                </td>
                <td>
                  <Link href={`/manage/grading/${sessionId}/${s.id}`} className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>
                    Chấm điểm
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
