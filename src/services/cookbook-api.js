import config from '../config';

class CookBookService {
  constructor() {
    this.baseUrl = config[process.env.NODE_ENV].api;
  }

  getDeleteHeaders() {
    const headers = new Headers();
      headers.append('Authorization', `Token token=${localStorage.getItem('token')}`);

    return headers;
  }

  postPatchHeaders() {
    const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Token token=${localStorage.getItem('token')}`);

    return headers;
  }

  getCookbooks() {
    const headers = this.getDeleteHeaders();
    return fetch(`${this.baseUrl}/cookbooks`, {
      method: 'GET',
      headers: headers,
    });
  }

  createCookbook(data) {
    const headers = this.postPatchHeaders();
    data = JSON.stringify(data);
    return fetch(`${this.baseUrl}/cookbooks`, {
      method: 'POST',
      headers: headers,
      body: data,
    });
  }
}

export default CookBookService
