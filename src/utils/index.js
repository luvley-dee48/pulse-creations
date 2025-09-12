export const createPageUrl = (path) => {
  if (!path) return '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (cleanPath.includes('?')) {
    const [page, query] = cleanPath.split('?');
    return `/${page.toLowerCase()}?${query}`;
  }
  return `/${cleanPath.toLowerCase()}`;
};