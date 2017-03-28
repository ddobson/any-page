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

  getCookbook(id) {
    const headers = this.getDeleteHeaders();
    return fetch(`${this.baseUrl}/cookbooks/${id}`, {
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

  createRecipe(id, data) {
    const headers = this.postPatchHeaders();
    data = JSON.stringify(data);
    return fetch(`${this.baseUrl}/cookbooks/${id}/recipes`, {
      method: 'POST',
      headers: headers,
      body: data,
    });
  }

  getRecipe(id) {
    const headers = this.getDeleteHeaders();
    return fetch(`${this.baseUrl}/recipes/${id}`, {
      method: 'GET',
      headers: headers,
    });
  }
}

export default CookBookService
