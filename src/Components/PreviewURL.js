import React from 'react'
import { Form, Input, Button, Message } from 'semantic-ui-react'

const getURLFromRemote = async (token) => {
  const url = await 'http://example.com'
  return url
}

class PreviewURL extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      shortUrl: '',
      originalUrl: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (event) {
    const originalUrl = await getURLFromRemote(this.state.shortUrl)
    if (originalUrl !== '') {
      this.setState({ originalUrl })
    }
  }

  handleInputChange (event) {
    this.setState({
      shortUrl: event.target.value
    })
  }

  render () {
    const { shortUrl, originalUrl } = this.state
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Input
            placeholder='Enter Shortened URL...'
            onChange={this.handleInputChange}
            value={shortUrl}
          />
          <Button
            content='preview'
            onClick={this.handleSubmit}
          />
        </Form>
        <Message
          content={`Preview original URL: ${originalUrl}`}
        />
      </>
    )
  }
}

export default PreviewURL
