import React from 'react'
import { Form, Input, Button, Message } from 'semantic-ui-react'

const getTokenFromRemote = async (url) => {
  const token = await 'asdfg'
  return token
}

class ShortenURL extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      url: '',
      token: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (event) {
    console.log(`handleSubmit (url): ${this.state.url}`)
    const token = await getTokenFromRemote(this.state.url)
    console.log(`handleSubmit (token): ${token}`)
    if (token !== '') {
      this.setState({ token })
    }
  }

  handleInputChange (event) {
    this.setState({
      url: event.target.value
    })
  }

  render () {
    const { url, token } = this.state
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Input
            placeholder='Enter URL...'
            onChange={this.handleInputChange}
            value={url}
          />
          <Button
            content='shorten'
            onClick={this.handleSubmit}
          />
        </Form>
        <Message
          content={`Shortened URL: ${token}`}
        />
      </>
    )
  }
}

export default ShortenURL
