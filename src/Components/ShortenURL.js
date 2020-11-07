import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { constructShortUrl, getTokenFromRemote } from '../utils/request'
import { OkMessage, ErrMessage } from '../utils/message'

const isValidURL = (userInput) => {
  try {
    if (userInput.startsWith('http://') || userInput.startsWith('https://')) {
      const url = new URL(userInput)
      if (url.hostname.indexOf('.') !== -1) {
        return true
      }
    }
    return false
  } catch (e) {
    console.error(e)
    return false
  }
}

class ShortenURL extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      url: '',
      shortUrl: '',
      isReqOK: false,
      errorMsg: 'Input is empty'
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (event) {
    const { url } = this.state
    if (!isValidURL(url)) {
      this.setState({
        shortUrl: '',
        isReqOK: false,
        errorMsg: url.length > 0 ? 'Input is an invalid URL' : 'Input is empty'
      })
    } else {
      const [token, status] = await getTokenFromRemote(url)
      if (status === 200) {
        const shortUrl = constructShortUrl(token)
        this.setState({ shortUrl, isReqOK: true })
      } else {
        this.setState({
          shortUrl: '',
          isReqOK: false,
          errorMsg: `Opps! something went wrong! (code: ${status})`
        })
      }
    }
  }

  handleInputChange (event) {
    this.setState({
      url: event.target.value
    })
  }

  render () {
    const { isReqOK, errorMsg, url, shortUrl } = this.state
    return (
      <>
        <Form>
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
          isReqOK
            ? <OkMessage msg={`Shortened URL: ${shortUrl}`} />
            : <ErrMessage msg={errorMsg} />
        }
      </>
    )
  }
}

export default ShortenURL
