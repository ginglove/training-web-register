'use client'

import { useEffect, useState } from 'react'

interface Notification {
  id: string
  title: string
  content: string
  type: string
  createdAt: string
  isRead: boolean
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>([
    { id: '1', title: 'Hệ thống', content: 'Kỳ thi "SQL Basic" đã kết thúc. Vui lòng chấm điểm tự luận.', type: 'SYSTEM', createdAt: new Date().toISOString(), isRead: false },
    { id: '2', title: 'User Sync', content: 'Đồng bộ dữ liệu người dùng từ hệ thống thành công.', type: 'SYNC', createdAt: new Date().toISOString(), isRead: true },
  ])

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 24 }}>Thông báo hệ thống</h2>
      
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {notifs.map(n => (
          <div key={n.id} style={{ 
            padding: '20px 24px', borderBottom: '1px solid var(--glass-border)',
            background: n.isRead ? 'transparent' : 'rgba(79, 142, 247, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{n.title}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(n.createdAt).toLocaleString()}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{n.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
