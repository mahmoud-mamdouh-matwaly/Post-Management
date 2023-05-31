export function isNetworkError(error) {
  return !navigator.onLine || error.message === 'Network Error';
}
