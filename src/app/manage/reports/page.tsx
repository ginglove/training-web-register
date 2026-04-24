'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ReportSummary {
  id: string
  name: string
  totalParticipants: number
  gradedCount: number
  averageScore: number
}

interface GlobalStats {
  totalSubmissions: number
  averageScore: number
  completionRate: number
}

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportSummary[]>([])
  const [stats, setStats] = useState<GlobalStats | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/reports', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.status === 401) {
        router.push('/login')
        return
      }
      if (res.ok) {
        const data = await res.json()
        setReports(data.reports)
        setStats(data.stats)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <h2 className="page-title">Báo cáo & Thống kê</h2>
        <p className="page-subtitle">Tổng hợp kết quả đào tạo và thi cử toàn hệ thống (Dữ liệu thời gian thực)</p>
      </div>

      <div className="flex gap-4 mb-6">
        {[
          { label: 'Tổng số lượt thi', value: stats?.totalSubmissions || 0, color: 'var(--accent-blue)' },
          { label: 'Điểm trung bình', value: stats?.averageScore || 0, color: 'var(--accent-teal)' },
          { label: 'Tỷ lệ hoàn thành', value: `${stats?.completionRate || 0}%`, color: 'var(--success)' },
        ].map(s => (
          <div key={s.label} className="glass-panel" style={{ padding: '20px 32px', flex: 1, textAlign: 'center', background: '#fff' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color }}>{loading ? '...' : s.value}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-panel" style={{ background: '#fff', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Danh sách báo cáo chi tiết</h3>
          <button className="btn btn-secondary btn-sm" onClick={() => fetchReports()}>Làm mới</button>
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
            ) : reports.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Chưa có dữ liệu báo cáo</td></tr>
            ) : reports.map(r => (
              <tr key={r.id}>
                <td style={{ fontWeight: 600 }}>{r.name}</td>
                <td>{r.totalParticipants}</td>
                <td>{r.gradedCount} / {r.totalParticipants}</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{r.averageScore}</td>
                <td>
                  <Link href={`/manage/grading/${r.id}`} className="btn btn-secondary btn-sm" style={{ textDecoration: 'none' }}>
                    Xem chi tiết
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
