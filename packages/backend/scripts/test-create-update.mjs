(async () => {
  try {
    // Login
    const login = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'pianatadeo@hotmail.com', password: 'Admin1234!' })
    })
    const body = await login.json()
    if (!body.success) { console.error('login failed', body); process.exit(1) }
    const token = body.data.token
    console.log('logged in')

    // Create a question
    const createRes = await fetch('http://localhost:3001/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        technologyId: (await (await fetch('http://localhost:3001/api/technologies', { headers: { Authorization: `Bearer ${token}` } })).json()).data[0].id,
        level: 'FUNDAMENTALS',
        topic: 'Automated Test',
        subtopic: 'Scripting',
        type: 'mcq',
        prompt: 'Is this a test question?',
        options: ['Yes', 'No'],
        answer: 'Yes',
        difficulty: 3,
        estimatedTime: 30,
        explanation: 'Created by test script',
        references: []
      })
    })
    const createBody = await createRes.json()
    console.log('create:', createBody)
    if (!createBody.success) process.exit(1)
    const qid = createBody.data.id

    // Update the question
    const updateRes = await fetch(`http://localhost:3001/api/questions/${qid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ prompt: 'Is this an updated test question?' })
    })
    const updateBody = await updateRes.json()
    console.log('update:', updateBody)

    // Fetch question
    const getRes = await fetch(`http://localhost:3001/api/questions/${qid}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const getBody = await getRes.json()
    console.log('get:', getBody)

  } catch (err) {
    console.error(err)
  }
})()
