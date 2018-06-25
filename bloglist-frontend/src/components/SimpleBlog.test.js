import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

const blog = {
    title: 'testiblogi',
    author: 'testaaja',
    url: 'http://google.com',
    likes: 10000
}

describe('<SimpleBlog />', () => {
    it('renders content', () => {
        const simpleBlogObject = shallow(<SimpleBlog blog={blog} onClick={null} />)
        const titleAndAuthor = simpleBlogObject.find('#titleAndAuthor')
        const likesAndOnClickHandler = simpleBlogObject.find('#likesAndOnClickHandler')
        expect(titleAndAuthor.text()).toContain(blog.title)
        expect(titleAndAuthor.text()).toContain(blog.author)
    })

    it('calls clickhandler correctly', () => {
        const mockClickHandler = jest.fn()
        const simpleBlogObject = shallow(<SimpleBlog blog={blog} onClick={mockClickHandler} />)
        const button = simpleBlogObject.find('button')
        button.simulate('click')
        button.simulate('click')
        expect(mockClickHandler.mock.calls.length).toBe(2)
    })

    
})