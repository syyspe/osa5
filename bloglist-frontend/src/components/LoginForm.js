import React from 'react'
import propTypes from 'prop-types'

const LoginForm = ( {usernameValue, passwordValue, loginEditHandler, loginButtonHandler} ) => {
    return (
        <div>
            <h2>Login to application</h2>
            <form>
                <table>
                    <tbody>
                        <tr><td>username</td><td><input name='username' value={usernameValue} onChange={loginEditHandler} /></td></tr>
                        <tr><td>password</td><td><input type='password' name='password' value={passwordValue} onChange={loginEditHandler} /></td></tr>
                        <tr className='buttonRow'><td></td><td><button type="submit" onClick={loginButtonHandler}>Login</button></td></tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    usernameValue: propTypes.string.isRequired,
    passwordValue: propTypes.string.isRequired,
    loginEditHandler: propTypes.func.isRequired,
    loginButtonHandler: propTypes.func.isRequired
}

export default LoginForm