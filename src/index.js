require('dotenv').config()

const app =require('./server')
require('./database');




const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${server.address().port}/`)
})
server.on('error', (error) => console.log(`Server error: ${error}`))