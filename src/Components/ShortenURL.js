import React from 'react'
import { Form, Input, Button, Message } from 'semantic-ui-react'
import { constructShortUrl, getTokenFromRemote } from '../utils/request'

const OkMessage = ({ shortUrl }) => {
  return (
    <Message
      info
      content={`Shortened URL: ${shortUrl}`}
    />
  )
}

const ErrMessage = ({ status }) => {
  return (
    <Message
      error
      content={`Error! ... status code: ${status}`}
    />
  )
}

class ShortenURL extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      url: '',
      shortUrl: '',
      isReqOk: true,
      status: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (event) {
    // should check if valid
    const [token, status] = await getTokenFromRemote(this.state.url)
    if (status === 200) {
      const shortUrl = constructShortUrl(token)
      this.setState({ shortUrl, status, isReqOk: true })
    } else {
      this.setState({ status, isReqOk: false })
    }
  }

  handleInputChange (event) {
    this.setState({
      url: event.target.value
    })
  }

  render () {
    const { url, shortUrl } = this.state
    const { isReqOk, status } = this.state
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
        {
          isReqOk
            ? <OkMessage shortUrl={shortUrl} />
            : <ErrMessage status={status} />
        }
      </>
    )
  }
}

export default ShortenURL
