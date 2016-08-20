export function getCookies(){
  let cookies = {};
  for (let cookie of document.cookie.split('; ')) {
    let [name, value] = cookie.split("=");
    cookies[name] = decodeURIComponent(value);
  }
  return cookies;
}

export function deleteCookie(key){
  document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}