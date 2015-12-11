import Qs from 'qs';

export default function(query, name) {
  if (typeof query === 'string') {
    const obj = Qs.parse(query.substring(1));
    return obj[name] || '';
  }

  return query[name] || '';
}
