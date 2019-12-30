export const navigate = (url) => {
   history.pushState(null, 'title', url);
   window.dispatchEvent(new Event('popstate'));
}
