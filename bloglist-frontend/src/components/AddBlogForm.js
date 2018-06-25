import React from 'react'
import propTypes from 'prop-types'

const AddBlogForm = ( { titleValue, authorValue, urlValue, editHandler, addHandler } ) => {
    return (
        <form>
            <table>
                <tbody>
                    <tr><td>title</td><td><input name='newTitle' value={titleValue} onChange={editHandler} /></td></tr>
                    <tr><td>author</td><td><input name='newAuthor' value={authorValue} onChange={editHandler} /></td></tr>
                    <tr><td>url</td><td><input name='newUrl' value={urlValue} onChange={editHandler} /></td></tr>
                    <tr className='buttonRow'><td></td><td><button type='submit' onClick={addHandler}>Create</button></td></tr>
                </tbody>
            </table>
        </form>
    )

}

AddBlogForm.propTypes = {
    titleValue: propTypes.string.isRequired,
    authorValue: propTypes.string.isRequired,
    urlValue: propTypes.string.isRequired,
    editHandler: propTypes.func.isRequired,
    addHandler: propTypes.func.isRequired
}

export default AddBlogForm