// for demo, not for production
const BACKEND_SERVER = 'http://127.0.0.1:12345'
const BACKEND_SHORTENURL_API = `${BACKEND_SERVER}/shortenURL`
const BACKEND_GETURL_API = `${BACKEND_SERVER}/getURL`

const _request = async (api, body) => {
  try {
    const resp = await fetch(
            `${api}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body
            }
    )
    const { status } = resp
    if (status === 200) {
      const respj = await resp.json()
      return [respj, status]
    } else {
      return ['', status]
    }
  } catch (e) {
    return ['', -1]
  }
}

export const getUrlFromRemote = async (token) => {
  const body = JSON.stringify({ token })
  const [respj, status] = await _request(BACKEND_GETURL_API, body)
  return [respj.url, status]
}

export const getTokenFromRemote = async (url) => {
  const body = JSON.stringify({ url })
  const [respj, status] = await _request(BACKEND_SHORTENURL_API, body)
  return [respj.token, status]
}

export const constructShortUrl = (token) => {
  return `${BACKEND_SERVER}/${token}`
}
