import React from 'react'
import { Form, Input, Button, Message } from 'semantic-ui-react'

// for demo, not for production
const BACKEND_SERVER = 'http://127.0.0.1:12345'
const BACKEND_SHORENURL_API = `${BACKEND_SERVER}/shortenURL`

const constructShortUrl = (token) => {
  return `${BACKEND_SERVER}/${token}`
}

const getTokenFromRemote = async (url) => {
  try {
    const resp = await fetch(
      `${BACKEND_SHORENURL_API}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url
        })
      }
    )
    const { status } = resp
    if (status === 200) {
      const respj = await resp.json()
      const { token } = respj
      return [token, status]
    } else {
      return ['', status]
    }
  } catch (e) {
    return ['', -1]
  }
}

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
