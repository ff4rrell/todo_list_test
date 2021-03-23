class Requester {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  get(path) {
    return fetch(`${this.baseUrl}${path}`).then(it => it.json())
  }
  post(path, body) {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(it => it.json())
  }
  put(path, body) {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(it => it.json())
  }
  delete(path) {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'delete',
    }).then(it => it.json())
  }
}

const requester =  new Requester('http://localhost:4000')

export default requester;
