// Example
// const API = new FetchWrapper("https://api.openweathermap.org/data/2.5/onecall");
// API.get(`?lat=${lat}&lon=${lon}&units=${units}&appid=59e64aa7985aed5ceaf658f187a92cef`).then(data => {

// })

export default class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  get(endpoint) {
    return fetch(this.baseURL + endpoint).then(response => response.json());
  }
  put(endpoint, body) {
    return this._send("put", endpoint, body);
  }
  post(endpoint, body) {
    return this._send("post", endpoint, body);
  }

  delete(endpoint, body) {
    return this._send("delete", endpoint, body);
  }

  _send(method, endpoint, body) {
    return fetch(this.baseURL + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(response => response.json());
  }
}
