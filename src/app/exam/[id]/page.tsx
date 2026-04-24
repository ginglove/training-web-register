'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { formatSrsRemainingTime } from '@/lib/wiki-format'

interface Submission {
  id: string
  status: string
  guestName: string | null
  examPaper: {
    name: string
    durationMinutes: number
    questions: Array<{
      questionId: string
      score: number
      question: {
        content: string
        type: string
        options: Array<{ id: string; content: string }>
      }
    }>
  }
}

export default function TakeExamPage({ params }: { params: { id: string } }) {
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)
  const [phase, setPhase] = useState<'intro' | 'taking'>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, { answerText?: string, selectedOptionIds?: string[] }>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [alertMsg, setAlertMsg] = useState<{code: string, message: string} | null>(null)
  const router = useRouter()

  const alertedHalf = useRef(false)
  const alerted5Min = useRef(false)
  const alerted2Min = useRef(false)

  useEffect(() => {
    fetch(`/api/submissions/${params.id}`)
      .then(r => r.json())
      .then(data => {
        if (data.status !== 'IN_PROGRESS') {
           router.push('/')
           return
        }
        setSubmission(data)
        setTimeLeft(data.examPaper.durationMinutes * 60)
        setLoading(false)
      })
  }, [params.id, router])

  useEffect(() => {
    if (!loading && phase === 'taking' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
      const totalSeconds = submission!.examPaper.durationMinutes * 60
      const halfTime = Math.floor(totalSeconds / 2)
      
      if (timeLeft === halfTime && !alertedHalf.current) {
        setAlertMsg({ code: 'NDUY_04', message: 'Bạn đã làm bài được ½ thời gian' }); alertedHalf.current = true
      } else if (timeLeft === 300 && !alerted5Min.current) {
        setAlertMsg({ code: 'NDUY_05', message: 'Bạn còn 5 phút để làm bài' }); alerted5Min.current = true
      } else if (timeLeft === 120 && !alerted2Min.current) {
        setAlertMsg({ code: 'NDUY_06', message: 'Bạn còn 2 phút để làm bài' }); alerted2Min.current = true
      }
      return () => clearInterval(timer)
    } else if (!loading && phase === 'taking' && timeLeft === 0) {
      setAlertMsg({ code: 'NDUY_08', message: 'Bạn đã hết thời gian làm bài' })
      setTimeout(() => submitExam(), 3000)
    }
  }, [loading, phase, timeLeft, submission])

  const handleOptionToggle = (qId: string, optId: string) => {
    setAnswers(prev => {
       const curr = prev[qId]?.selectedOptionIds || []
       const next = curr.includes(optId) ? curr.filter(id => id !== optId) : [...curr, optId]
       return { ...prev, [qId]: { ...prev[qId], selectedOptionIds: next } }
    })
  }

  const handleTextChange = (qId: string, text: string) => {
    setAnswers(prev => ({ ...prev, [qId]: { ...prev[qId], answerText: text } }))
  }

  const submitExam = async () => {
    const payload = Object.entries(answers).map(([questionId, ans]) => ({
      questionId,
      answerText: ans.answerText || null,
      selectedOptionIds: ans.selectedOptionIds || []
    }))
    await fetch(`/api/submissions/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: payload, status: 'SUBMITTED' })
    })
    router.push('/dashboard')
  }

  const isAnswered = (qId: string) => {
    const ans = answers[qId]
    if (!ans) return false
    return (ans.answerText && ans.answerText.trim().length > 0) || (ans.selectedOptionIds && ans.selectedOptionIds.length > 0)
  }

  if (loading || !submission) return <div style={{ padding: 100, textAlign: 'center' }}>Loading exam...</div>

  const q = submission.examPaper.questions[currentQ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* 4.2.5.3 Header */}
      <header className="top-bar" style={{ left: 0, padding: '0 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--gradient-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🎓</div>
          <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>TrainIQ</span>
        </div>
        <div className="glass-panel" style={{ background: '#fff', padding: '6px 20px', borderRadius: 20, fontSize: '0.9rem', fontWeight: 600 }}>
          {submission.examPaper.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
           <span style={{ fontSize: '1rem', fontWeight: 700, color: timeLeft < 300 ? 'var(--accent-red)' : 'var(--accent-blue)' }}>
             {formatSrsRemainingTime(timeLeft)}
           </span>
           <button className="btn btn-primary" onClick={() => setShowSubmitConfirm(true)}>Nộp bài</button>
        </div>
      </header>

      <main style={{ flex: 1, marginTop: 'var(--header-height)', display: 'flex', position: 'relative' }}>
        {phase === 'intro' ? (
          /* Confirmation Screen */
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: 700, background: '#fff', padding: 48 }}>
              <h2 className="page-title" style={{ textAlign: 'center', marginBottom: 40 }}>Chi tiết bài thi</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span className="nav-section-label" style={{ padding: 0 }}>Tên bài thi</span>
                  <span style={{ fontWeight: 600 }}>{submission.examPaper.name}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span className="nav-section-label" style={{ padding: 0 }}>Thời gian làm bài</span>
                  <span style={{ fontWeight: 600 }}>{submission.examPaper.durationMinutes}p</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span className="nav-section-label" style={{ padding: 0 }}>Tổng số câu hỏi</span>
                  <span style={{ fontWeight: 600 }}>{submission.examPaper.questions.length} câu</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span className="nav-section-label" style={{ padding: 0 }}>Trạng thái</span>
                  <span className="badge badge-success" style={{ width: 'fit-content' }}>Sẵn sàng</span>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', padding: 16, fontSize: '1.1rem' }} onClick={() => setPhase('taking')}>
                Bắt đầu làm bài
              </button>
            </div>
          </div>
        ) : (
          /* Taking Screen with Question Navigation Sidebar */
          <>
            <div style={{ flex: 1, padding: 40, overflowY: 'auto' }}>
              <div className="glass-panel" style={{ background: '#fff', padding: 40, minHeight: '100%' }}>
                <div style={{ marginBottom: 32 }}>
                  <span className="badge badge-info" style={{ marginBottom: 12 }}>Câu {currentQ + 1}</span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                    {q.question.content}
                  </h3>
                </div>

                <div style={{ marginBottom: 48 }}>
                  {q.question.type === 'MULTIPLE_CHOICE' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {q.question.options.map((opt) => {
                        const isSelected = (answers[q.questionId]?.selectedOptionIds || []).includes(opt.id)
                        return (
                          <div 
                            key={opt.id} 
                            onClick={() => handleOptionToggle(q.questionId, opt.id)}
                            className="glass-panel"
                            style={{ 
                              cursor: 'pointer', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16,
                              background: isSelected ? '#eff6ff' : 'transparent',
                              borderColor: isSelected ? 'var(--accent-blue)' : 'var(--glass-border)',
                              transition: 'var(--transition)'
                            }}
                          >
                            <div style={{ 
                              width: 20, height: 20, borderRadius: 4, border: '2px solid', 
                              borderColor: isSelected ? 'var(--accent-blue)' : '#d1d5db',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              background: isSelected ? 'var(--accent-blue)' : 'transparent'
                            }}>
                              {isSelected && <span style={{ color: '#fff', fontSize: '0.7rem' }}>✔</span>}
                            </div>
                            <span style={{ fontSize: '1rem', color: isSelected ? 'var(--accent-blue)' : 'var(--text-primary)', fontWeight: isSelected ? 600 : 400 }}>
                              {opt.content}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <textarea 
                      className="form-input"
                      style={{ minHeight: 250, fontSize: '1rem', padding: 20 }}
                      placeholder="Nhập câu trả lời tự luận của bạn tại đây..."
                      value={answers[q.questionId]?.answerText || ''}
                      onChange={e => handleTextChange(q.questionId, e.target.value)}
                    />
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button className="btn btn-secondary" disabled={currentQ === 0} onClick={() => setCurrentQ(prev => prev - 1)}>Câu trước</button>
                  <button className="btn btn-secondary" disabled={currentQ === submission.examPaper.questions.length - 1} onClick={() => setCurrentQ(prev => prev + 1)}>Câu tiếp theo</button>
                </div>
              </div>
            </div>

            {/* Question Navigation Sidebar */}
            <aside style={{ width: 320, background: '#fff', borderLeft: '1px solid var(--glass-border)', padding: 32, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 24 }}>Danh sách câu hỏi</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, flex: 1, alignContent: 'start' }}>
                {submission.examPaper.questions.map((item, idx) => (
                  <button 
                    key={item.questionId}
                    onClick={() => setCurrentQ(idx)}
                    style={{
                      width: '100%', aspectRatio: '1', borderRadius: 8, border: '1px solid',
                      fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                      background: currentQ === idx ? 'var(--accent-blue)' : isAnswered(item.questionId) ? '#dcfce7' : '#f3f4f6',
                      borderColor: currentQ === idx ? 'var(--accent-blue)' : isAnswered(item.questionId) ? '#16a34a' : 'transparent',
                      color: currentQ === idx ? '#fff' : isAnswered(item.questionId) ? '#16a34a' : 'var(--text-muted)',
                      transition: 'var(--transition)'
                    }}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--glass-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--accent-blue)' }}></div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Đang xem</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: '#dcfce7', border: '1px solid #16a34a' }}></div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Đã làm</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: '#f3f4f6' }}></div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Chưa làm</span>
                </div>
              </div>
            </aside>
          </>
        )}
      </main>

      {/* Modals same as before */}
      {alertMsg && (
        <div className="modal-backdrop">
          <div className="modal-box" style={{ maxWidth: 400, textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-red)', marginBottom: 8 }}>{alertMsg.code}</div>
            <h3 className="modal-title">{alertMsg.message}</h3>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setAlertMsg(null)}>Đã hiểu</button>
          </div>
        </div>
      )}

      {showSubmitConfirm && (
        <div className="modal-backdrop">
          <div className="modal-box" style={{ maxWidth: 400, textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: 8 }}>NDUY_07</div>
            <h3 className="modal-title">Bạn có muốn nộp bài?</h3>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={submitExam}>Có, nộp bài</button>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowSubmitConfirm(false)}>Không</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
