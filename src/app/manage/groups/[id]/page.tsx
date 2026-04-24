'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function GroupDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [group, setGroup] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`/api/manage/groups/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => {
        if (r.status === 401) {
          router.push('/login')
          return null
        }
        return r.json()
      })
      .then(data => { 
        if (data) setGroup(data)
        setLoading(false) 
      })
      .catch(() => setLoading(false))
  }, [id, router])

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>
  if (!group) return <div style={{ padding: 40, textAlign: 'center' }}>Group not found</div>

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <button onClick={() => router.back()} className="btn btn-secondary btn-sm" style={{ marginBottom: 8 }}>
          ← Quay lại
        </button>
        <h2 className="page-title">{group.name}</h2>
        <p className="page-subtitle">Quản lý thành viên và quyền hạn trong nhóm</p>
      </div>

      <div className="glass-panel" style={{ padding: 24, marginBottom: 32, background: '#f8fafc' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>Thành viên ({group.members?.length || 0})</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Họ và tên</th>
              <th>Username</th>
              <th>Vai trò</th>
            </tr>
          </thead>
          <tbody>
            {group.members?.map((m: any) => (
              <tr key={m.user.id}>
                <td style={{ fontWeight: 600 }}>{m.user.fullName}</td>
                <td>{m.user.username}</td>
                <td><span className="badge badge-info">{m.user.role}</span></td>
              </tr>
            ))}
            {(!group.members || group.members.length === 0) && (
              <tr><td colSpan={3} style={{ textAlign: 'center', padding: 24 }}>Chưa có thành viên nào</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
