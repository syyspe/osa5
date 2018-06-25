import React from 'react'
import Blog from './Blog'
import propTypes from 'prop-types'

const BlogList = ( { blogs, user, logoutHandler, likeHandler, removeBlogHandler } ) => {
    return (
        <div>
            <h2>Blogs</h2>
            <div>
                { user 
                    ?   
                    <p>{user.name} logged in <button onClick={logoutHandler}>Logout</button></p> 
                    :
                    null 
                }
                <div id='blogWrapper'>
                    <table className='blogTable'>
                        <thead>
                            <tr className='boldHeaderRow'>
                                <td>Title</td><td>Author</td><td> </td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            blogs.map(blog => <Blog key={blog._id} 
                                blog={blog} 
                                likeHandler={likeHandler} 
                                removeBlogHandler={blog.user === null || user.username === blog.user.username ? removeBlogHandler : null} />)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    )
}

BlogList.propTypes = {
    blogs: propTypes.array.isRequired,
    user: propTypes.object,
    logoutHandler: propTypes.func.isRequired,
    likeHandler: propTypes.func.isRequired,
    removeBlogHandler: propTypes.func.isRequired
}

export default BlogList