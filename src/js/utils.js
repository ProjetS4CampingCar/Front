// import { useRouter } from 'vue-router'
import axios from 'axios'

function verifConnect(router, connect) {
  if (connect) {
    console.log('ca passe')
    router.push('/info8')
  }
}

async function tokenValid() {
  const token = localStorage.getItem('token')
  let res = false
  if (token) {
    try {
      const response = await axios.post('http://localhost:3008/api/verifyToken', null)
      res = response.data
    } catch (error) {
      console.log(error)
    }
  }
  return res
}

export { verifConnect, tokenValid }
