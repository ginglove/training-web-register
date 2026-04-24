'use client'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import HeaderNav from '@/components/layout/HeaderNav'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPass, setIsChangingPass] = useState(false)
  const [form, setForm] = useState({ fullName: '', phone: '', idCard: '' })
  const [passForm, setPassForm] = useState({ old: '', new: '', confirm: '' })
  const [msg, setMsg] = useState({ type: '', text: '' })

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      const u = JSON.parse(stored)
      setUser(u)
      setForm({ fullName: u.fullName || '', phone: u.phone || '', idCard: u.idCard || '' })
    }
  }, [])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg({ type: 'info', text: 'Updating...' })
    // Simulate API call
    setTimeout(() => {
      const updated = { ...user, ...form }
      localStorage.setItem('user', JSON.stringify(updated))
      setUser(updated)
      setIsEditing(false)
      setMsg({ type: 'success', text: 'Cập nhật thông tin thành công' })
    }, 500)
  }

  const handleChangePass = (e: React.FormEvent) => {
    e.preventDefault()
    if (passForm.new !== passForm.confirm) {
      setMsg({ type: 'error', text: 'Mật khẩu xác nhận không khớp' })
      return
    }
    setMsg({ type: 'success', text: 'Đổi mật khẩu thành công' })
    setIsChangingPass(false)
    setPassForm({ old: '', new: '', confirm: '' })
  }

  if (!user) return <div style={{ padding: 100, textAlign: 'center' }}>Vui lòng đăng nhập...</div>

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <HeaderNav />
        <div style={{ padding: '32px 40px' }}>
          <div style={{ marginBottom: 32 }}>
            <h2 className="page-title">Thông tin cá nhân</h2>
            <p className="page-subtitle">Quản lý và cập nhật thông tin tài khoản của bạn</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 32, alignItems: 'start' }}>
            {/* Main Info Card */}
            <div className="glass-panel" style={{ background: '#fff', padding: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Thông tin cơ bản</h3>
                {!isEditing && <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Chỉnh sửa</button>}
              </div>

              {msg.text && (
                <div style={{ 
                  padding: '12px 16px', borderRadius: 8, marginBottom: 24, 
                  background: msg.type === 'success' ? '#dcfce7' : '#fee2e2',
                  color: msg.type === 'success' ? '#16a34a' : '#ef4444',
                  fontSize: '0.9rem', fontWeight: 500
                }}>
                  {msg.text}
                </div>
              )}

              <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <label className="nav-section-label" style={{ padding: 0, marginBottom: 8, display: 'block' }}>Tên đăng nhập</label>
                    <input className="form-input" value={user.username} disabled style={{ background: '#f9fafb' }} />
                  </div>
                  <div>
                    <label className="nav-section-label" style={{ padding: 0, marginBottom: 8, display: 'block' }}>Email</label>
                    <input className="form-input" value={user.email} disabled style={{ background: '#f9fafb' }} />
                  </div>
                </div>

                <div>
                  <label className="nav-section-label" style={{ padding: 0, marginBottom: 8, display: 'block' }}>Họ và tên</label>
                  <input 
                    className="form-input" 
                    value={form.fullName} 
                    onChange={e => setForm({...form, fullName: e.target.value})}
                    disabled={!isEditing} 
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <label className="nav-section-label" style={{ padding: 0, marginBottom: 8, display: 'block' }}>Số điện thoại</label>
                    <input 
                      className="form-input" 
                      value={form.phone} 
                      onChange={e => setForm({...form, phone: e.target.value})}
                      disabled={!isEditing} 
                    />
                  </div>
                  <div>
                    <label className="nav-section-label" style={{ padding: 0, marginBottom: 8, display: 'block' }}>Số CMND/CCCD</label>
                    <input 
                      className="form-input" 
                      value={form.idCard} 
                      onChange={e => setForm({...form, idCard: e.target.value})}
                      disabled={!isEditing} 
                    />
                  </div>
                </div>

                {isEditing && (
                  <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                    <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Hủy</button>
                  </div>
                )}
              </form>
            </div>

            {/* Account Security Card */}
            <div className="glass-panel" style={{ background: '#fff', padding: 32 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 24 }}>Bảo mật tài khoản</h3>
              
              {!isChangingPass ? (
                <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setIsChangingPass(true)}>
                  Đổi mật khẩu
                </button>
              ) : (
                <form onSubmit={handleChangePass} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>Mật khẩu cũ</label>
                    <input type="password" className="form-input" value={passForm.old} onChange={e => setPassForm({...passForm, old: e.target.value})} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>Mật khẩu mới</label>
                    <input type="password" className="form-input" value={passForm.new} onChange={e => setPassForm({...passForm, new: e.target.value})} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>Xác nhận mật khẩu</label>
                    <input type="password" className="form-input" value={passForm.confirm} onChange={e => setPassForm({...passForm, confirm: e.target.value})} required />
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Cập nhật</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setIsChangingPass(false)}>Hủy</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
