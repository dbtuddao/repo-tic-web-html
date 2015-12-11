import superagent from 'superagent';
import config from '../config';

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class ApiClient_ {
  constructor(req) {
    ['get', 'post', 'put', 'patch', 'del'].
      forEach((method) => {
        this[method] = (path, options) => {
          return new Promise((resolve, reject) => {
            const request = superagent[method](this.formatUrl(path));
            request.set('Content-Type', 'application/json');
            if (options && options.params) {
              request.query(options.params);
            }
            if (options && options.headers) {
              request.set(options.headers);
            }
            if (options && options.attach) {
              delete request.header['Content-Type'];
              for (const i in options.attach) {
                if (options.attach.hasOwnProperty(i)) {
                  request.attach(i, options.attach[i], options.attach[i].name || null );
                }
              }
            }
            if (options && options.auth) {
              request.set('Authorization', options.auth);
            }
            if (options && options.field) {
              for (const i in options.field) {
                if (options.field.hasOwnProperty(i)) {
                  request.field(i, options.field[i]);
                }
              }
            }
            if (options && options.progress) {
              request.on('progress', options.progress);
            }
            if (__SERVER__) {
              if (req.get('cookie')) {
                request.set('cookie', req.get('cookie'));
              }
            }
            if (options && options.data) {
              request.send(options.data);
            }
            request.end((err, res) => {
              if (err) {
                const errData = res ? res.body || err : err;
                if (typeof errData === 'object') {
                  reject({status: res.status, ...errData});
                } else {
                  reject({status: res.status, message: errData});
                }
              } else {
                resolve(res.body);
              }
            });
          });
        };
      });
  }

  /* This was originally a standalone function outside of this class, but babel kept breaking, and this fixes it  */
  formatUrl(path) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    if (adjustedPath.match(/^\/_session/)) {
      if (__SERVER__) {
        return 'http://localhost:' + config.port + adjustedPath;
      }

      return adjustedPath;
    }

    if (__SERVER__) {
      return config.apiURL + adjustedPath;
      // Prepend host and port of the API server to the path.
      // return config.apiURL + adjustedPath;
    }
    // Prepend `/api` to relative URL, to proxy to API server.
    return '/_api' + adjustedPath;
  }
}
const ApiClient = ApiClient_;

export default ApiClient;
