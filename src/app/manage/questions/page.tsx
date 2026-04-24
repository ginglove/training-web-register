'use client'
import { useEffect, useState } from 'react'

interface Question {
  id: string
  content: string
  type: string
  difficulty: string
  category: { name: string }
  _count: { options: number }
  createdAt: string
}

const DIFFICULTIES = ['ALL', 'EASY', 'MEDIUM', 'HARD']
const TYPES = ['ALL', 'MULTIPLE_CHOICE', 'ESSAY']

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState('ALL')
  const [type, setType] = useState('ALL')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)

  useEffect(() => {
    loadQuestions()
  }, [])

  const loadQuestions = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/questions', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) setQuestions(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSelected = async () => {
    if (!confirm(`Bạn có chắc muốn xóa ${selectedIds.length} câu hỏi?`)) return
    try {
      const res = await fetch('/api/questions/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds })
      })
      if (res.ok) {
        setSelectedIds([])
        loadQuestions()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const filtered = questions.filter(q => {
    const matchesSearch = q.content.toLowerCase().includes(search.toLowerCase()) || 
                          q.category.name.toLowerCase().includes(search.toLowerCase())
    const matchesDiff = difficulty === 'ALL' || q.difficulty === difficulty
    const matchesType = type === 'ALL' || q.type === type
    return matchesSearch && matchesDiff && matchesType
  })

  const getDiffBadge = (diff: string) => {
    if (diff === 'EASY') return 'badge-success'
    if (diff === 'MEDIUM') return 'badge-warning'
    return 'badge-danger'
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="page-title">Ngân hàng câu hỏi</h2>
          <p className="page-subtitle">Quản lý và tổ chức các câu hỏi cho đề thi</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary" onClick={() => setShowImportModal(true)}>
            Import Excel
          </button>
          <button className="btn btn-danger" onClick={handleDeleteSelected} disabled={selectedIds.length === 0}>
            Xóa mục đã chọn
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Thêm câu hỏi
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {[
          { label: 'Tổng số', value: questions.length, color: 'var(--accent-blue)' },
          { label: 'Trắc nghiệm', value: questions.filter(q => q.type === 'MULTIPLE_CHOICE').length, color: 'var(--accent-teal)' },
          { label: 'Tự luận', value: questions.filter(q => q.type === 'ESSAY').length, color: 'var(--accent-purple)' },
          { label: 'Dễ', value: questions.filter(q => q.difficulty === 'EASY').length, color: 'var(--success)' },
          { label: 'Trung bình', value: questions.filter(q => q.difficulty === 'MEDIUM').length, color: 'var(--warning)' },
          { label: 'Khó', value: questions.filter(q => q.difficulty === 'HARD').length, color: 'var(--danger)' },
        ].map(s => (
          <div key={s.label} className="glass-panel" style={{ padding: '16px 24px', textAlign: 'center', flex: 1, minWidth: 120, background: '#fff' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{loading ? '—' : s.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="glass-panel mb-6" style={{ padding: '20px', background: '#f8fafc', display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
          <input 
            className="form-input" 
            placeholder="Tìm kiếm nội dung hoặc danh mục..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 36, borderRadius: 20 }}
          />
        </div>
        <select className="form-input" value={type} onChange={e => setType(e.target.value)} style={{ width: 200 }}>
          <option value="ALL">Tất cả thể loại</option>
          <option value="MULTIPLE_CHOICE">Trắc nghiệm</option>
          <option value="ESSAY">Tự luận</option>
        </select>
        <select className="form-input" value={difficulty} onChange={e => setDifficulty(e.target.value)} style={{ width: 160 }}>
          <option value="ALL">Mọi cấp độ</option>
          <option value="EASY">Dễ</option>
          <option value="MEDIUM">Trung bình</option>
          <option value="HARD">Khó</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ background: '#fff', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <input type="checkbox" onChange={(e) => setSelectedIds(e.target.checked ? filtered.map(q => q.id) : [])} checked={selectedIds.length === filtered.length && filtered.length > 0} />
              </th>
              <th>Nội dung câu hỏi ↕</th>
              <th>Danh mục ↕</th>
              <th>Thể loại ↕</th>
              <th>Mức độ ↕</th>
              <th>Đáp án ↕</th>
              <th>Ngày tạo ↕</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: 40 }}>Đang tải...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: 40 }}>Không tìm thấy câu hỏi nào</td></tr>
            ) : filtered.map(q => (
              <tr key={q.id}>
                <td>
                  <input type="checkbox" checked={selectedIds.includes(q.id)} onChange={() => toggleSelect(q.id)} />
                </td>
                <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600 }}>
                  {q.content}
                </td>
                <td><span className="badge badge-info">{q.category.name}</span></td>
                <td>
                  <span className={`badge ${q.type === 'MULTIPLE_CHOICE' ? 'badge-teal' : 'badge-purple'}`}>
                    {q.type === 'MULTIPLE_CHOICE' ? 'MCQ' : 'Essay'}
                  </span>
                </td>
                <td><span className={`badge ${getDiffBadge(q.difficulty)}`}>{q.difficulty}</span></td>
                <td style={{ textAlign: 'center' }}>{q._count.options}</td>
                <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-secondary btn-sm">Sửa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <AddQuestionModal onClose={() => setShowModal(false)} onSuccess={() => { setShowModal(false); loadQuestions() }} />}
      {showImportModal && <ImportQuestionsModal onClose={() => setShowImportModal(false)} onSuccess={() => { setShowImportModal(false); loadQuestions() }} />}
    </>
  )
}

function ImportQuestionsModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleImport = async () => {
    if (!file) return setError('Vui lòng chọn file')
    setUploading(true)
    setTimeout(() => {
      setUploading(false)
      alert('Import thành công')
      onSuccess()
    }, 1500)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 450 }} onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">Import Câu hỏi từ Excel</h3>
        <div style={{ padding: '20px 0' }}>
          <input type="file" accept=".xlsx,.xls" onChange={e => setFile(e.target.files?.[0] || null)} style={{ width: '100%' }} />
          {error && <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 8 }}>{error}</p>}
        </div>
        <div className="flex justify-between gap-3">
          <button className="btn btn-secondary w-full" onClick={onClose}>Hủy</button>
          <button className="btn btn-primary w-full" onClick={handleImport} disabled={uploading}>
            {uploading ? 'Đang xử lý...' : 'Tải lên'}
          </button>
        </div>
      </div>
    </div>
  )
}

function AddQuestionModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ content: '', type: 'MULTIPLE_CHOICE', difficulty: 'MEDIUM', categoryName: '' })
  const [options, setOptions] = useState([
    { content: '', isCorrect: false },
    { content: '', isCorrect: false },
    { content: '', isCorrect: false },
    { content: '', isCorrect: false },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, options: form.type === 'MULTIPLE_CHOICE' ? options.filter(o => o.content) : [] }),
      })
      if (res.ok) onSuccess()
      else setError('Có lỗi xảy ra')
    } catch { setError('Lỗi kết nối') } finally { setLoading(false) }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 700 }}>
        <h3 className="modal-title">Thêm câu hỏi mới</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="form-group">
            <label className="form-label">Nội dung câu hỏi *</label>
            <textarea className="form-textarea" rows={3} value={form.content} onChange={e => setForm({...form, content: e.target.value})} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label className="form-label">Thể loại</label>
              <select className="form-input" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option value="MULTIPLE_CHOICE">Trắc nghiệm</option>
                <option value="ESSAY">Tự luận</option>
              </select>
            </div>
            <div>
              <label className="form-label">Mức độ</label>
              <select className="form-input" value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})}>
                <option value="EASY">Dễ</option>
                <option value="MEDIUM">Trung bình</option>
                <option value="HARD">Khó</option>
              </select>
            </div>
            <div>
              <label className="form-label">Danh mục *</label>
              <input className="form-input" value={form.categoryName} onChange={e => setForm({...form, categoryName: e.target.value})} required />
            </div>
          </div>

          {form.type === 'MULTIPLE_CHOICE' && (
            <div className="flex flex-col gap-2">
              <label className="form-label">Các phương án trả lời (tick nếu đúng)</label>
              {options.map((opt, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <input type="checkbox" checked={opt.isCorrect} onChange={e => {
                    const newOpts = [...options]; newOpts[i].isCorrect = e.target.checked; setOptions(newOpts)
                  }} />
                  <input className="form-input" placeholder={`Phương án ${i+1}`} value={opt.content} onChange={e => {
                    const newOpts = [...options]; newOpts[i].content = e.target.value; setOptions(newOpts)
                  }} />
                </div>
              ))}
            </div>
          )}

          {error && <p style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{error}</p>}
          <div className="flex gap-4" style={{ marginTop: 12 }}>
            <button type="button" className="btn btn-secondary w-full" onClick={onClose}>Hủy</button>
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu câu hỏi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
