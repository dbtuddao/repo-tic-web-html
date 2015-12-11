export default function errorRedirect(status, transition) {
  switch (status) {
    case 403:
      transition.to('/403');
      break;
    case 404:
      transition.to('/404');
      break;
    case 500:
      transition.to('/500');
      break;
    default:
  }
}
