import { ref, watch } from 'vue';

export function useCookie(cookieName, defaultValue = null, expiredDays = 7 ) {
  const cookieValue = ref(getCookie(cookieName) || defaultValue);
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expiredDays);

  watch(cookieValue, (newValue) => {
    setCookie(cookieName, newValue, expirationDate);
  });

  return cookieValue;
}

function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');

  for (let i = 0; i < cookies.length; i++) {
    const [cookieKey, cookieValue] = cookies[i].split('=');
    if (cookieKey === name) {
      return cookieValue;
    }
  }

  return null;
}

function setCookie(name, value, expirationDate) {
  document.cookie = `${name}=${value}; path=/; expires=${expirationDate.toUTCString()}`;
}
