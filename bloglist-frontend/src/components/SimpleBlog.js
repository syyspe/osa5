import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div id="titleAndAuthor">
      {blog.title} {blog.author}
    </div>
    <div id='likesAndOnClickHandler'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
    
  </div>
)

export default SimpleBlog