import request from "superagent";
import routes from "./routes";


export function authenticate(email, password, callback) {
  console.log('routes are ', routes);
  request
    .get(`${routes.path}?action=${routes.actions.auth}&email=${email}&password=${password}`)
    .set('Accept', 'application/json')
    .end( (err, res) => {
      if(callback){
        callback(res);
      }
  });
}
export function removeTeam(guid, callback) {
    request
    .get(`${routes.path}?action=${routes.actions.remove}&guid=${guid}`)
    .set('Accept', 'application/json')
    .end( (err, res) => {
      if(callback){
        callback(res);
      }
  });
}
export function getTeams(tournament, callback) {
  request
    .get(`${routes.path}?action=${routes.actions.get}&tournament=${tournament}`)
    .set('Accept', 'application/json')
    .end( (err, res) => {
      if(callback){
        callback(res);
      }
  });
}
export function add(payload, callback) {
  console.log('add with payload', payload);
  let path = `${routes.path}?action=${routes.actions.add}`;
  path += `&name=${payload.name}&tournament=${payload.tournament}`;
  path += `&division=${payload.division}&key=${payload.key}`;
  request
    .get(path)
    .set('Accept', 'application/json')
    .end( (err, res) => {
      if(callback){
        callback(res);
      }
  });
}
export function addScore(params, callback) {
  let path = `${routes.path}?action=${routes.actions.score}`;
  path += `&score=${params.score}&guid=${params.guid}&workout=${params.workout}`;
  path += `&division=${params.division}&tournament=${params.tournament}`;
  path += `&key=${params.key}`;
  request
    .get(path)
    .end( (err, res) => {
      if(callback){
        callback(res);
      }
  });
}