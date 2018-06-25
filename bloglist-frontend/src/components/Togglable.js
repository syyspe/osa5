import React from 'react'
import propTypes from 'prop-types'

class Togglable extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false
      }
    }
  
    toggleVisibility = () => {
      this.setState({visible: !this.state.visible})
    }
  
    render() {
      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }
  
      return (
        <div>
          <div style={hideWhenVisible} id='hide'>
            {
              this.props.buttonLabel 
                ? <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button> 
                : <div className='clickableText' onClick={this.toggleVisibility}>{this.props.clickableText}</div>
            }
          </div>
          <div style={showWhenVisible} id='show'>
            {
              this.props.clickableText 
                ? <div className='clickableText' onClick={this.toggleVisibility}>{this.props.clickableText}</div> 
                : null
            }
            {
              this.props.children
            }
            {
              this.props.buttonLabel 
                ? <button onClick={this.toggleVisibility}>Cancel</button> 
                : null
            }
          </div>
        </div>
      )
    }
  }

  Togglable.propTypes = {
    buttonLabel: propTypes.string,
    clickableText: propTypes.string
  }

  export default Togglable