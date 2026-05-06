(async () => {
  const BASE = 'http://localhost:3001/api'
  const EMAIL = 'pianatadeo@hotmail.com'
  const PASSWORD = 'Admin1234!'
  try {
    console.log('Resetting password...')
    let r = await fetch(`${BASE}/auth/reset-password`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: EMAIL, password: PASSWORD })
    })
    const resetBody = await r.json().catch(() => ({}))
    console.log('reset:', resetBody)

    console.log('Logging in...')
    r = await fetch(`${BASE}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: EMAIL, password: PASSWORD })
    })
    const login = await r.json()
    console.log('login:', login)
    if (!login.success) return process.exit(1)
    const token = login.data.token

    console.log('Getting technologies...')
    r = await fetch(`${BASE}/technologies`, { headers: { Authorization: `Bearer ${token}` } })
    const techs = await r.json()
    console.log('techs count', techs.data?.length)
    const techId = techs.data?.[0]?.id
    if (!techId) { console.error('No technology found'); return }

    console.log('Generating exam...')
    r = await fetch(`${BASE}/exams/generate`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ technologyId: techId, level: 'FUNDAMENTALS', count: 3 })
    })
    const gen = await r.json()
    console.log('generate:', gen)
    if (!gen.success) return process.exit(1)
    const session = gen.data

    console.log('Submitting intentionally wrong answers...')
    const answers = (session.questionIds || []).map((qid) => ({ questionId: qid, userAnswer: 'INCORRECT_ANSWER' }))
    r = await fetch(`${BASE}/exams/${session.id}/submit`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ answers })
    })
    const submitRes = await r.json()
    console.log('submit:', submitRes)
    if (!submitRes.success) return process.exit(1)

    const result = submitRes.data
    const failedCount = result.totalQuestions - result.correctAnswers
    console.log('failedCount', failedCount)

    console.log('Requesting retake for failed questions...')
    r = await fetch(`${BASE}/exams/${session.id}/retake-failed`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    })
    const retakeRes = await r.json()
    console.log('retake:', retakeRes)

    if (retakeRes.success) {
      const newSession = retakeRes.data
      console.log('newSession.questionIds', newSession.questionIds)
      console.log('original failed ids:', result.questions.filter(q => {
        // find answers for q
        const ans = result.answers.find(a => a.questionId === q.id)
        return !ans?.isCorrect
      }).map(q => q.id))
    }
  } catch (err) {
    console.error('ERROR', err)
    process.exit(1)
  }
})()
