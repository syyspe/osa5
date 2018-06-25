import React from 'react'
import propTypes from 'prop-types'

const Message = ( {message, type} ) => {
    return (
        <div className={type}>{message}</div>
    )
}

Message.propTypes = {
    message: propTypes.string.isRequired,
    type: propTypes.string.isRequired
}

export default Message