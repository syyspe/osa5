import React from 'react'
import TogglableText from './TogglableText'
import propTypes from 'prop-types'

const Blog = ( { blog, likeHandler, removeBlogHandler } ) => (
  <tr>
    <td className='nonWrapping'>
      <TogglableText clickableText={blog.title}>
        <div className='indented'><a href={blog.url}>{blog.url}</a></div>
        <div className='indented'>
          likes: {blog.likes} 
          <button className='likeButton' id={blog._id} onClick={likeHandler}>Like</button>
        </div>
      </TogglableText>
    </td>
    <td>{blog.author}</td>
    <td>
      {
        removeBlogHandler ?
        <button id={blog._id + '_remove'} onClick={removeBlogHandler}>Remove</button>
        : null
      }
      </td>
  </tr>  
)

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  likeHandler: propTypes.func.isRequired,
  removeBlogHandler: propTypes.func
}

export default Blog