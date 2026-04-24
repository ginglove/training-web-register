'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Question {
  id: string
  content: string
  type: string
  difficulty: string
  category: { name: string }
}

export default function ExamEditorPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const isNew = id === 'new'

  const [form, setForm] = useState({
    name: '',
    topic: 'General',
    durationMinutes: 60,
    status: 'DRAFT',
    note: ''
  })
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
  const [bank, setBank] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'info' | 'questions'>('info')
  const [qTab, setQTab] = useState<'MCQ' | 'ESSAY'>('MCQ')

  useEffect(() => {
    Promise.all([
      fetchBank(),
      isNew ? Promise.resolve(null) : fetchExamDetail()
    ]).finally(() => setLoading(false))
  }, [id])

  const fetchBank = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/questions', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) setBank(await res.json())
    } catch (err) {
      console.error(err)
    }
  }

  const fetchExamDetail = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/exams/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setForm({
          name: data.name,
          topic: data.topic,
          durationMinutes: data.durationMinutes,
          status: data.status,
          note: data.note || ''
        })
        setSelectedQuestions(data.questions?.map((q: any) => q.questionId) || [])
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSave = async () => {
    if (!form.name) return alert('Vui lòng nhập tên đề thi')
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(isNew ? '/api/exams' : `/api/exams/${id}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...form, questionIds: selectedQuestions })
      })
      if (res.ok) {
        alert('Lưu đề thi thành công')
        router.push('/manage/exams')
      }
    } catch (err) {
      console.error(err)
      alert('Có lỗi xảy ra khi lưu')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 className="page-title">{isNew ? 'Tạo đề thi mới' : 'Chỉnh sửa đề thi'}</h2>
          <p className="page-subtitle">Thiết lập cấu trúc và câu hỏi cho đề thi</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-secondary" onClick={() => router.push('/manage/exams')}>Hủy</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Đang lưu...' : 'Lưu đề thi'}
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div style={{ width: 300 }}>
          <div className="glass-panel" style={{ padding: 20, background: '#fff' }}>
            <div className={`nav-item ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')} style={{ cursor: 'pointer', marginBottom: 8 }}>
              <span className="nav-label">Thông tin chung</span>
            </div>
            <div className={`nav-item ${activeTab === 'questions' ? 'active' : ''}`} onClick={() => setActiveTab('questions')} style={{ cursor: 'pointer' }}>
              <span className="nav-label">Ngân hàng câu hỏi ({selectedQuestions.length})</span>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          {activeTab === 'info' ? (
            <div className="glass-panel" style={{ padding: 32, background: '#fff' }}>
              <div style={{ display: 'grid', gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Tên đề thi *</label>
                  <input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="VD: Kiểm tra Java cuối kỳ" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label className="form-label">Thể loại</label>
                    <input className="form-input" value={form.topic} onChange={e => setForm({...form, topic: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Thời gian làm bài (phút)</label>
                    <input type="number" className="form-input" value={form.durationMinutes} onChange={e => setForm({...form, durationMinutes: parseInt(e.target.value)})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Trạng thái</label>
                  <select className="form-input" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                    <option value="DRAFT">Nháp</option>
                    <option value="PUBLISHED">Công khai</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: 0, background: '#fff', overflow: 'hidden' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)' }}>
                <div style={{ padding: '16px 24px', cursor: 'pointer', borderBottom: qTab === 'MCQ' ? '2px solid var(--accent-blue)' : 'none', fontWeight: qTab === 'MCQ' ? 700 : 500 }} onClick={() => setQTab('MCQ')}>Trắc nghiệm</div>
                <div style={{ padding: '16px 24px', cursor: 'pointer', borderBottom: qTab === 'ESSAY' ? '2px solid var(--accent-blue)' : 'none', fontWeight: qTab === 'ESSAY' ? 700 : 500 }} onClick={() => setQTab('ESSAY')}>Tự luận</div>
              </div>
              <div style={{ maxHeight: 600, overflowY: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}></th>
                      <th>Nội dung câu hỏi</th>
                      <th>Mức độ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bank.filter(q => q.type === (qTab === 'MCQ' ? 'MULTIPLE_CHOICE' : 'ESSAY')).map(q => (
                      <tr key={q.id}>
                        <td>
                          <input type="checkbox" checked={selectedQuestions.includes(q.id)} onChange={e => {
                            if (e.target.checked) setSelectedQuestions([...selectedQuestions, q.id])
                            else setSelectedQuestions(selectedQuestions.filter(id => id !== q.id))
                          }} />
                        </td>
                        <td style={{ maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.content}</td>
                        <td><span className="badge badge-info">{q.difficulty}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
