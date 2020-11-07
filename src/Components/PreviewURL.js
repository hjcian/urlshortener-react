import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { getUrlFromRemote } from '../utils/request'
import { OkMessage, ErrMessage } from '../utils/message'

const EXPECTED_TOKEN_LENGTH = 5

const extractToken = (userInput) => {
  if (userInput.length === EXPECTED_TOKEN_LENGTH) {
    return userInput
  }
  if (userInput.startsWith('http')) {
    const url = new URL(userInput)
    const token = url.pathname.slice(1) // trim leading slash
    if (token.length === EXPECTED_TOKEN_LENGTH) {
      return token
    }
  }
  return null
}

class PreviewURL extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      shortUrl: '',
      originalUrl: '',
      isReqOK: false,
      errorMsg: 'Input is empty'
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (event) {
    const token = extractToken(this.state.shortUrl)
    if (token === null) {
      this.setState({
        originalUrl: '',
        isReqOK: false,
        errorMsg: this.state.shortUrl.length > 0 ? 'Input is invalid' : 'Input is empty'
      })
    } else {
      const [originalUrl, status] = await getUrlFromRemote(token)
      if (status === 200) {
        this.setState({ originalUrl, isReqOK: true })
      } else if (status === 404) {
        this.setState({
          originalUrl: '',
          isReqOK: false,
          errorMsg: 'Token not found!'
        })
      } else {
        this.setState({
          originalUrl: '',
          isReqOK: false,
          errorMsg: `Opps! something went wrong! (code: ${status})`
        })
      }
    }
  }

  handleInputChange (event) {
    const input = event.target.value
    this.setState({
      shortUrl: input
    })
  }

  render () {
    const { isReqOK, errorMsg, shortUrl, originalUrl } = this.state

    return (
      <>
        <Form>
          <Input
            placeholder='Enter Shortened URL or token...'
            onChange={this.handleInputChange}
            value={shortUrl}
          />
          <Button
            content='preview'
            onClick={this.handleSubmit}
          />
        </Form>
        {
          isReqOK
            ? <OkMessage msg={`Original URL is: ${originalUrl}`} />
            : <ErrMessage msg={errorMsg} />
        }
      </>
    )
  }
}

export default PreviewURL
