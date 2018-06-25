import React from 'react'
import propTypes from 'prop-types'

class TogglableText extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    isVisible = () => {
        return this.state.visible
    }

    render() {
        const hidden = () => {
            return { display: '' }
        }
    
        const visible = () => {
            return { display: 'none' }
        }

        return (
            <div id='togglableWrapper'>
                <div className='clickableText' onClick={this.toggleVisibility}>
                    {this.props.clickableText}
                </div>
                <div id='togglable' style={this.isVisible() ? hidden() : visible()}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

TogglableText.propTypes = {
    clickableText: propTypes.string.isRequired
}

export default TogglableText