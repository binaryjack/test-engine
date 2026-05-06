(async () => {
  try {
    const res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'pianatadeo@hotmail.com', password: 'Admin1234!' })
    })
    const body = await res.json()
    console.log(JSON.stringify(body, null, 2))
  } catch (err) {
    console.error('ERROR', err)
    process.exit(1)
  }
})()
