class Facebook {
  login(scope) {
    return new Promise((resolve, reject) => {
      // TODO: Wait for FB object to fully initialize.
      //   Sometimes Facbeook SDK will load slowly so the FB object would be 'undefined'.
      FB.login((response) => {
        if (!response.authResponse) {
          return reject({ success: false });
        }

        return resolve({
          success: true,
          facebookToken: response.authResponse.accessToken,
          facebookId: response.authResponse.userID
        });
      }, {scope: scope});
    });
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          return resolve(response.authResponse.accessToken);
        }
        return reject(response);
      });
    });
  }
}

export default new Facebook();
