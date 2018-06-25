import React from 'react'
import BlogList from './components/BlogList'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'

const ERROR = "error"
const INFO = "info"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      notificationType: '',
      notificationMessage: '',
      user: null,
      newTitle: '',
      newAuthor: '',
      newUrl: '',
    }
  }

  async componentDidMount() {
    /*
    * calling setState for the stored user separately first seems 
    * to help with the login screen being displayed for a short
    * time when the user is in local storage. If I do setState( {user, blogs} )
    * the login screen is unnecessarily shown for a while because fetching 
    * the blogs takes some time.
    */    
    const user = this.getStoredUser()
    this.setState({ user })
    await this.getBlogsFromServer()
  }

  async getBlogsFromServer() {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    this.setState({ blogs })
  }

  setNotification(message, type, timeout=5000) {
    this.setState({notificationType: type, notificationMessage: message})
    
    setTimeout(() => {
        this.setState({notificationType: '', notificationMessage: ''})
    }, timeout)
  }
  
  editHandler = (event) => {
    event.preventDefault()
    this.setState({[event.target.name]: event.target.value})
  }

  loginButtonHandler = async (event) => {
    event.preventDefault()
    const user = await loginService.login({
      username: this.state.username,
      password: this.state.password
    })

    if(user.error) {
      this.setState({user: null})
      const msg = `login failed: ${user.error}`
      this.setNotification(msg, ERROR)
      return
    } 

    this.setState({ user: user, username: '', password: '' })
    this.storeUser()
  }

  addBlogHandler = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newTitle, 
      author: this.state.newAuthor, 
      url: this.state.newUrl
    }
    const result = await blogService.add(blogObject, this.state.user.token)
    if(result.error) {
      this.setNotification(`adding blog failed: ${result.error}`, ERROR)
      return
    }

    this.setNotification(`a new blog '${this.state.newTitle}' was added`, INFO)
    await this.getBlogsFromServer()
    this.blogForm.toggleVisibility()
  }

  likeBlogHandler = async (event) => {
    event.preventDefault()
    const blogId = event.target.id
    const toUpdate = this.state.blogs.find(blog => blog._id === blogId)
    if(toUpdate) {
      const copy = {...toUpdate}
      copy.likes += 1
      const result = await blogService.update(copy)
      if(result.error) {
        this.setNotification(`updating blog failed: ${result.error}`, ERROR)
        return
      }
      await this.getBlogsFromServer()
    }
  }

  removeBlogHandler = async (event) => {
    event.preventDefault()
    const id = event.target.id.split('_')
    if(id.length === 2) {
      const blog = this.state.blogs.find(b => b._id === id[0])
      if( !window.confirm(`remove blog '${blog.title}' by ${blog.author}?`) ) {
        return
      }
      const result = await blogService.remove(id[0], this.state.user.token)
      if(result && result.error) {
        this.setNotification(`removing blog failed: ${result.error}`, ERROR)
        return
      }
      await this.getBlogsFromServer()
    }
  }

  storeUser = () => {
    window.localStorage.setItem('loggedInUser', JSON.stringify(this.state.user))
  }

  getStoredUser = () => {
    const user = window.localStorage.getItem('loggedInUser')
    return user ? JSON.parse(user) : null
  }

  removeStoredUser = () => {
    window.localStorage.removeItem('loggedInUser')
  }

  loggedIn = () => {
    return this.state.user !== null
  }

  logout = (event) => {
    event.preventDefault()
    this.setState({user: null})
    this.removeStoredUser()
  }

  render() {
    return (
      <div>
        <Message message={this.state.notificationMessage} type={this.state.notificationType} />
          <div>
            {
            this.loggedIn() ?
            <div>
                <BlogList
                  blogs={this.state.blogs}
                  user={this.state.user}
                  logoutHandler={this.logout}
                  likeHandler={this.likeBlogHandler}
                  removeBlogHandler={this.removeBlogHandler} />
                <Togglable buttonLabel='New blog' ref={component => this.blogForm = component}>
                  <AddBlogForm
                    titleValue={this.state.newTitle}
                    authorValue={this.state.newAuthor}
                    urlValue={this.state.newUrl}
                    editHandler={this.editHandler}
                    addHandler={this.addBlogHandler} />
                </Togglable>
            </div>
            :
            <LoginForm 
              usernameValue={this.state.username} 
              passwordValue={this.state.password} 
              loginEditHandler={this.editHandler} 
              loginButtonHandler={this.loginButtonHandler} />
            }
          </div>
      </div>
    )
  }
}

export default App
