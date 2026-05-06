(async () => {
  try {
    const login = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'pianatadeo@hotmail.com', password: 'Admin1234!' })
    })
    const loginBody = await login.json()
    console.log('login:', JSON.stringify(loginBody, null, 2))
    const token = loginBody?.data?.token
    if (!token) return

    const q = await fetch('http://localhost:3001/api/questions', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const qbody = await q.json()
    console.log('\n/questions response summary:')
    if (qbody.success && Array.isArray(qbody.data)) {
      console.log('  questions returned:', qbody.data.length)
    } else {
      console.log('  failed:', JSON.stringify(qbody, null, 2))
    }

    const stats = await fetch('http://localhost:3001/api/questions/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const statsBody = await stats.json()
    console.log('\n/questions/stats (admin-only):', JSON.stringify(statsBody, null, 2))

  } catch (err) {
    console.error(err)
  }
})()
