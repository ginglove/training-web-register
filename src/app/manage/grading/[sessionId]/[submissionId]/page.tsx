'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { formatSrsScore } from '@/lib/wiki-format'

interface EssayAnswer {
  id: string
  answerText: string
  score: number | null
  maxScore: number
  question: {
    content: string
  }
}

export default function GradingDetailPage() {
  const params = useParams()
  const submissionId = params.submissionId as string
  const sessionId = params.sessionId as string
  const router = useRouter()
  
  const [submission, setSubmission] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [phase, setPhase] = useState<'intro' | 'grading'>('intro')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [grades, setGrades] = useState<Record<string, number>>({})
  const [saving, setSaving] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    fetchDetail()
  }, [submissionId])

  const fetchDetail = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/manage/grading/submission/${submissionId}`)
      if (res.ok) {
        const data = await res.json()
        setSubmission(data)
        const initialGrades: Record<string, number> = {}
        data.answers.forEach((a: any) => {
          if (a.score !== null) initialGrades[a.id] = a.score
        })
        setGrades(initialGrades)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleScoreChange = (answerId: string, value: string) => {
    const score = parseFloat(value)
    setGrades(prev => ({ ...prev, [answerId]: score }))
  }

  const handleSubmit = async () => {
    setSaving(true)
    try {
      const payload = {
        grades: Object.entries(grades).map(([id, score]) => ({ answerId: id, score }))
      }
      const res = await fetch(`/api/manage/grading/submission/${submissionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        // NDUY_13 Success
        router.push(`/manage/grading/${sessionId}`)
      }
    } catch (err) {
      console.error(err)
      alert('Lỗi khi lưu điểm')
    } finally {
      setSaving(false)
      setShowConfirm(false)
    }
  }

  if (loading) return <div style={{ padding: 100, textAlign: 'center' }}>Đang tải...</div>
  if (!submission) return <div style={{ padding: 100, textAlign: 'center' }}>Không tìm thấy bài thi</div>

  const currentAns = submission.answers[currentIdx]
  const isLast = currentIdx === submission.answers.length - 1

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', width: '100%' }}>
      
      {phase === 'intro' ? (
          /* 4.2.6.3 Intro Screen */
          <div className="glass-panel" style={{ padding: 40, background: 'var(--bg-secondary)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 32, textAlign: 'center' }}>
              Thông tin chi tiết của bài thi
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>User name / Mã code</label>
                <span style={{ fontWeight: 600 }}>{submission.user?.username || submission.guestCode || '—'}</span>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Tên kỳ thi</label>
                <span style={{ fontWeight: 600 }}>{submission.examPaper.name}</span>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Tên thí sinh</label>
                <span style={{ fontWeight: 600 }}>{submission.guestName || submission.user?.fullName}</span>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Chủ đề thi</label>
                <span style={{ fontWeight: 600 }}>General</span>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Số câu hỏi tự luận</label>
                <span style={{ fontWeight: 600 }}>{submission.answers.length}</span>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Tổng điểm tự luận</label>
                <span style={{ fontWeight: 600 }}>{submission.answers.reduce((s: any, a: any) => s + a.maxScore, 0)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="btn btn-primary" style={{ padding: '14px 60px', fontSize: '1.1rem' }} onClick={() => setPhase('grading')}>
                Bắt đầu chấm bài
              </button>
            </div>
          </div>
        ) : (
          /* 4.2.6.4 Grading Page */
          <div>
            <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                Câu hỏi {currentIdx + 1} / {submission.answers.length}
              </h2>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {submission.guestName || submission.user?.fullName}
              </span>
            </div>

            <div className="glass-panel" style={{ padding: 32, background: 'var(--bg-secondary)', marginBottom: 24 }}>
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {currentAns.question.content}
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: 20, borderRadius: 8, borderLeft: '4px solid var(--accent-blue)', marginBottom: 32 }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Câu trả lời:</label>
                <p style={{ fontSize: '1rem', color: 'var(--text-primary)', marginTop: 12, whiteSpace: 'pre-wrap' }}>
                  {currentAns.answerText || '(Trống)'}
                </p>
              </div>

              {/* SeekBar for Grading */}
              <div style={{ padding: '0 20px' }}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 16 }}>Chấm điểm: <span style={{ color: 'var(--accent-blue)', fontSize: '1.2rem' }}>{formatSrsScore(grades[currentAns.id] || 0)}</span> / {currentAns.maxScore}</label>
                <input 
                  type="range" 
                  min="0" 
                  max={currentAns.maxScore} 
                  step="0.25" 
                  value={grades[currentAns.id] || 0}
                  onChange={(e) => handleScoreChange(currentAns.id, e.target.value)}
                  style={{ width: '100%', cursor: 'pointer', height: 8, borderRadius: 4, appearance: 'none', background: '#e2e8f0' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>0</span>
                  <span>{currentAns.maxScore / 2}</span>
                  <span>{currentAns.maxScore}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
              <button 
                className="btn btn-secondary" 
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                style={{ padding: '12px 32px' }}
              >
                Prev
              </button>

              {isLast ? (
                <button className="btn btn-primary" onClick={() => setShowConfirm(true)} style={{ padding: '12px 48px' }}>
                  Submit
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => setCurrentIdx(prev => prev + 1)} style={{ padding: '12px 32px' }}>
                  Next
                </button>
              )}
            </div>
          </div>
        )}

        {/* NDUY_13 Confirm Popup */}
        {showConfirm && (
          <div className="glass-panel" style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)'
          }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '32px', borderRadius: 8, width: 400, textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)', marginBottom: 8 }}>NDUY_13</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 24, color: 'var(--text-primary)' }}>
                Bạn có muốn Submit Điểm không
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Không</button>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
                  {saving ? 'Đang lưu...' : 'Có'}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
