'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface UserGroup {
  id: string
  name: string
  createdAt: string
  createdBy: { fullName: string }
  _count: { members: number }
}

export default function UserGroupsPage() {
  const [groups, setGroups] = useState<UserGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/manage/groups')
      if (res.ok) setGroups(await res.json())
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!newGroupName) return setError('Group name is required')
    try {
      const res = await fetch('/api/manage/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newGroupName })
      })
      if (res.ok) {
        setShowModal(false)
        setNewGroupName('')
        fetchGroups()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to create group')
      }
    } catch (err) {
      setError('Network error')
    }
  }

  const filtered = groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
          Quản lý nhóm tài khoản
        </h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Tạo nhóm
        </button>
      </div>

      <div style={{ padding: '0 32px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative', width: 300 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
          <input 
            className="form-input" 
            placeholder="Tìm kiếm tên nhóm..." 
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 36, borderRadius: 20 }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflowX: 'auto', padding: '0 32px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}><input type="checkbox" /></th>
              <th>Group Name</th>
              <th>Members</th>
              <th>Creator</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40 }}>Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40 }}>No data</td></tr>
            ) : filtered.map(g => (
              <tr key={g.id}>
                <td><input type="checkbox" /></td>
                <td style={{ fontWeight: 600 }}>
                  <Link href={`/manage/groups/${g.id}`} style={{ textDecoration: 'none', color: 'var(--accent-blue)' }}>
                    {g.name}
                  </Link>
                </td>
                <td>{g._count.members}</td>
                <td>{g.createdBy.fullName}</td>
                <td>{new Date(g.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-box" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Tạo nhóm mới</h3>
            <div className="form-group" style={{ marginTop: 16 }}>
              <label className="form-label">Tên nhóm *</label>
              <input 
                className="form-input" 
                value={newGroupName} 
                onChange={e => { setNewGroupName(e.target.value); setError('') }}
                placeholder="Nhập tên nhóm"
              />
              {error && <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 4 }}>{error}</p>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={handleCreate}>Tạo nhóm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
