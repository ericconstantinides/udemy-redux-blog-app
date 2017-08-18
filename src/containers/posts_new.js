import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'

class PostsNew extends Component {
  renderField (field) {
    const { touched, error } = field.meta
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.labelOfThis}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
        <small className='text-help'>
          {touched ? error : ''}
        </small>
      </div>
    )
  }
  // gets called after successful validation:
  onSubmit (values) {
    this.props.createPost(values, () => {
      // as long as its in the <Route>
      this.props.history.push('/')
    })
  }
  render () {
    // pull out the redux-form handleSubmit function from props:
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {/* ↑ the handleSubmit is from redux-form */}
        <Field
          labelOfThis='Title for Post'
          name='title'
          component={this.renderField}
        />
        <Field
          labelOfThis='Categories'
          name='categories'
          component={this.renderField}
        />
        <Field
          labelOfThis='Post Content'
          name='content'
          component={this.renderField}
        />
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    )
  }
}

function validate (values) {
  const errors = {}
  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = 'Enter a title'
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories'
  }
  if (!values.content) {
    errors.content = 'Enter some content please'
  }
  // if errors is still empty, we're bueno!
  return errors
}

// PostsNewForm is the _unique_ form name
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
)
