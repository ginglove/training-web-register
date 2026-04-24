'use client'

import { useEffect, useState } from 'react'

interface ReportSummary {
  id: string
  name: string
  totalParticipants: number
  gradedCount: number
  averageScore: number
}

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Placeholder fetch
    setTimeout(() => {
      setReports([
        { id: '1', name: 'Kỳ thi Java Cơ bản Q2', totalParticipants: 45, gradedCount: 45, averageScore: 8.2 },
        { id: '2', name: 'Kiểm tra SQL nâng cao', totalParticipants: 30, gradedCount: 12, averageScore: 7.5 },
        { id: '3', name: 'Đào tạo Soft Skills 2024', totalParticipants: 120, gradedCount: 120, averageScore: 9.0 },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <h2 className="page-title">Báo cáo & Thống kê</h2>
        <p className="page-subtitle">Tổng hợp kết quả đào tạo và thi cử toàn hệ thống</p>
      </div>

      <div className="flex gap-4 mb-6">
        {[
          { label: 'Tổng số lượt thi', value: '195', color: 'var(--accent-blue)' },
          { label: 'Điểm trung bình', value: '8.4', color: 'var(--accent-teal)' },
          { label: 'Tỷ lệ hoàn thành', value: '92%', color: 'var(--success)' },
        ].map(s => (
          <div key={s.label} className="glass-panel" style={{ padding: '20px 32px', flex: 1, textAlign: 'center', background: '#fff' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-panel" style={{ background: '#fff', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--glass-border)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Danh sách báo cáo chi tiết</h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Tên kỳ thi</th>
              <th>Số người tham gia</th>
              <th>Đã chấm điểm</th>
              <th>Điểm trung bình</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40 }}>Đang tải báo cáo...</td></tr>
            ) : reports.map(r => (
              <tr key={r.id}>
                <td style={{ fontWeight: 600 }}>{r.name}</td>
                <td>{r.totalParticipants}</td>
                <td>{r.gradedCount} / {r.totalParticipants}</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{r.averageScore}</td>
                <td>
                  <button className="btn btn-secondary btn-sm">Xem chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
