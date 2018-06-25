import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  try {
    const result = await axios.get(baseUrl)
    return result.data
  } catch(exc) {
    return []
  }
}

const add = async (blog, token) => {
  try {
    const result = await axios.post(baseUrl, blog, {headers: {Authorization:  `Bearer ${token}`}})
    return result.data || null

  } catch(exc) {
    const msg = exc.response && exc.response.data ? exc.response.data.error : exc.message
    return {error: msg}
  }
}

const update = async (blog) => {
  try {
    const result = await axios.put(`/api/blogs/${blog._id}`, blog)
    return result.data || null
  } catch(exc) {
    const msg = exc.response && exc.response.data ? exc.response.data.error : exc.message
    return {error: msg}
  }
}

const remove = async (id, token) => {
  try {
    const result = await axios.delete(`/api/blogs/${id}`, {headers: {Authorization:  `Bearer ${token}`}})
    return result.data || null
  } catch(exc) {
    const msg = exc.response && exc.response.data ? exc.response.data.error : exc.message
    return {error: msg}
  }

}

export default { getAll, add, update, remove }