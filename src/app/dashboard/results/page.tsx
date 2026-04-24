'use client'

import { useEffect, useState } from 'react'
import { formatSrsDate, formatSrsScore } from '@/lib/wiki-format'
import Link from 'next/link'

export default function ResultsPage() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('/api/submissions/my', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setSubmissions(data)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <h2 className="page-title">Kết quả thi</h2>
        <p className="page-subtitle">Xem lại điểm số và lịch sử các bài thi đã thực hiện</p>
      </div>

      <div className="glass-panel" style={{ background: '#fff', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Tên bài thi</th>
              <th>Kỳ thi</th>
              <th>Ngày nộp</th>
              <th>Trạng thái</th>
              <th>Điểm số</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40 }}>Đang tải kết quả...</td></tr>
            ) : submissions.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40 }}>Bạn chưa thực hiện bài thi nào</td></tr>
            ) : submissions.map(sub => (
              <tr key={sub.id}>
                <td style={{ fontWeight: 600 }}>{sub.examPaper.name}</td>
                <td>{sub.examSession.name}</td>
                <td>{formatSrsDate(sub.submittedAt || sub.updatedAt)}</td>
                <td>
                  <span className={`badge badge-${sub.status === 'GRADED' ? 'success' : 'warning'}`}>
                    {sub.status === 'GRADED' ? 'Đã chấm' : 'Đang chấm'}
                  </span>
                </td>
                <td style={{ fontWeight: 700, color: 'var(--accent-blue)', fontSize: '1.1rem' }}>
                  {sub.status === 'GRADED' ? formatSrsScore(sub.totalScore) : '—'}
                </td>
                <td>
                  <Link href={`/dashboard/results/${sub.id}`} className="btn btn-secondary btn-sm" style={{ fontSize: '0.8rem' }}>
                    Chi tiết
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
