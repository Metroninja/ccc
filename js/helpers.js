export function getCookies(){
  let cookies = {};
  for (let cookie of document.cookie.split('; ')) {
    let [name, value] = cookie.split("=");
    cookies[name] = decodeURIComponent(value);
  }
  return cookies;
}

export function setCookie(key, value){
  let expires = new Date();
  //30 days, 24 hours, 60 minutes, 60 seconds 1000 ms;
  expires.setTime(expires.getTime() + (30*24*60*60*1000));
  document.cookie = `${key}=${value};expires=${expires.toUTCString()}; path=/`;
}
export function deleteCookie(key){
  document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}