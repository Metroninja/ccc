import request from "superagent";
import routes from "./routes";


export function authenticate(email, callback){
  console.log('routes are ', routes);
  request
    .post(routes.path)
    .send({action: routes.actions.auth, email})
    .set("Content-Type", "application/json")
    .end( (err, res) => {
      console.log('return on request');
      console.log(err, res);
    });

}