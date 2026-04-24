'use client'

import { useEffect, useState } from 'react'

interface UserAccount {
  id: string
  username: string
  email: string
  fullName: string
  role: string
  status: string
  department?: string
  position?: string
}

export default function AccountManagementPage() {
  const [accounts, setAccounts] = useState<UserAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/manage/accounts', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        setAccounts(await res.json())
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = accounts.filter(a => 
    a.username.toLowerCase().includes(search.toLowerCase()) ||
    a.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 className="page-title">Quản lý Tài khoản</h2>
        <button className="btn btn-primary">
          + Thêm tài khoản
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '20px', marginBottom: 24, background: '#f8fafc' }}>
        <div style={{ position: 'relative', width: 300 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
          <input 
            className="form-input" 
            placeholder="Search email, username..." 
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 36, borderRadius: 20, width: '100%' }}
          />
        </div>
      </div>

      <div className="glass-panel" style={{ background: '#fff', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Position</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: 40 }}>Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: 40 }}>No data</td></tr>
            ) : filtered.map(a => (
              <tr key={a.id}>
                <td style={{ fontWeight: 600 }}>{a.username}</td>
                <td>{a.email}</td>
                <td>{a.fullName}</td>
                <td>
                  <span className={`badge ${a.role === 'ADMIN' ? 'badge-danger' : a.role === 'MANAGER' ? 'badge-warning' : 'badge-info'}`}>
                    {a.role}
                  </span>
                </td>
                <td>{a.department || '—'}</td>
                <td>{a.position || '—'}</td>
                <td>
                  <span className={`badge badge-${a.status === 'ACTIVE' ? 'success' : 'danger'}`}>
                    {a.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-secondary btn-sm">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
