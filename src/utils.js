export const getSystemLanguage = () => {
  if (navigator)
    return ((navigator.language || navigator.userLanguage) || 'es').slice(0, 2);
  return 'es';
}