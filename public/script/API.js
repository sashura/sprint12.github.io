/* eslint-disable class-methods-use-this */
class API {
  constructor(authorization) {
    this.authorization = authorization;
  }

  getInitialCards() {
    return fetch(`${authorization.url}/cards`, {
      headers: {
        authorization: authorization.token,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  updateUserInfoApi(username, userjob) { // обновляет на сервере информацию о пользователе
    return fetch(`${authorization.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: authorization.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
        about: userjob,
      }),
    })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }


  getUserInfoApi() { // берет информацию о пользователе с сервера
    return fetch(`${authorization.url}/users/me`, {
      headers: {
        authorization: authorization.token,
      },
    })
      .then((res) => res.json());
  }


  delete(id) {
    fetch(`${authorization.url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: authorization.token,
        'Content-Type': 'application/json',
      },
    })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }


  postCard(link, name) {
    return fetch(`${authorization.url}/cards`, {
      method: 'POST',
      headers: {
        authorization: authorization.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  newAvatar(avatar) {
    fetch(`${authorization.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: authorization.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar,
      }),
    })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }
}
