import config from '../config';

class CookBookService {
  constructor() {
    this.baseUrl = config[process.env.NODE_ENV].api;
  }

  postPatchHeaders() {
    const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Token token=${localStorage.getItem('token')}`);

    return headers;
  }

  createCookbook(data) {
    const headers = this.postPatchHeaders();
    data = JSON.stringify(data);
    return fetch(`${this.baseUrl}/cookbooks`, {
      method: 'POST',
      headers: headers,
      body: data,
    })
  }
}

export default CookBookService
