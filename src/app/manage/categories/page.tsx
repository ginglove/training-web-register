'use client'

import { useEffect, useState } from 'react'

interface Category {
  id: string
  name: string
  code: string
  creator: string
  createdAt: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/manage/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) setCategories(await res.json())
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch('/api/manage/categories', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    })
    if (res.ok) {
      setShowModal(false); setName(''); fetchCategories()
    }
  }

  const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
          Quản lý Danh mục câu hỏi
        </h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Tạo danh mục
        </button>
      </div>

      <div style={{ padding: '0 32px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative', width: 300 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
          <input 
            className="form-input" 
            placeholder="Tìm kiếm danh mục..." 
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 36, borderRadius: 20 }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflowX: 'auto', padding: '0 32px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Code</th>
              <th>Creator</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40 }}>Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40 }}>No data</td></tr>
            ) : filtered.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600 }}>{c.name}</td>
                <td><code style={{ fontSize: '0.85rem' }}>{c.code}</code></td>
                <td>{c.creator}</td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-secondary btn-sm">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-box" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Tạo danh mục mới</h3>
            <div className="form-group" style={{ marginTop: 16 }}>
              <label className="form-label">Tên danh mục *</label>
              <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="VD: Java, SQL..." />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={handleCreate}>Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
