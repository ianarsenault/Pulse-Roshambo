import axios from 'axios'

var keycloak = Keycloak({
  "realm": "master",
  "auth-server-url": "http://localhost:8080/auth",
  "ssl-required": "external",
  "resource": "roshambo",
  clientId: 'roshambo',
  "public-client": true,
  "confidential-port": 0
});
keycloak.init({onLoad: 'login-required'}).success(function (authenticated) {
  if(!authenticated) {
    alert('not authenticated');
  } else {
    //document.getElementById('name').innerHTML = keycloak.idTokenParsed.name;
  }
}).error(function () {
  alert('failed to initialize');
});

export default () => {
  return axios.create({
    baseURL: process.env.API_BASE,
    headers: {
      'Authorization': 'Bearer '+ keycloak.token
    }
  })
}
