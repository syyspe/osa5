import React from 'react'
import { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BlogList from './BlogList';

describe('<BlogList />', () => {
    let blogList, blogs, user, logoutHandler, likeHandler, removeBlogHandler
    beforeEach(() => {
        user = {
            username: 'pekka',
            name: 'Pekka'
        }

        blogs = [
            {
                title: 'TITLE',
                author: 'AUTHOR',
                url: 'URL',
                likes: 10,
                user: user,
                _id: '12345'
            }
        ]

        logoutHandler = jest.fn()
        likeHandler = jest.fn()
        removeBlogHandler = jest.fn()

        blogList = mount(<BlogList 
            blogs={blogs}
            user={user}
            logoutHandler={logoutHandler}
            likeHandler={likeHandler}
            removeBlogHandler={removeBlogHandler} />)

    })

    it('shows only title of blog first', () => {
       const togglable = blogList.find('#togglable')
       expect(togglable.getElement().props.style).toEqual({ display: 'none'})
    })

    it('shows other texts after clicking', () => {
        const clickText = blogList.find('.clickableText')
        clickText.simulate('click')
        const togglable = blogList.find('#togglable')
        expect(togglable.getElement().props.style).toEqual({ display: ''})
    })

})