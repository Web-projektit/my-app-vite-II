const isAzure = window.location.origin.includes('azurewebsites.net');
const production_url = 'https://flask-sovellusmalli-ii.azurewebsites.net'
const xampp_url = 'http://localhost:5000'   
/* Oletus: react-osuus xampp-palvelimella */
let base = "projektit_react/react-sovellusmalli"
let API_URL = `${xampp_url}/reactapi`
if (isAzure) {
  API_URL = `${production_url}/reactapi`  
  base = ""
  console.log('Azure')
  } 
else {
  console.log('Localhost')
}

export const firebaseDatabaseUrl = "https://web-2401-todo-default-rtdb.europe-west1.firebasedatabase.app/items/.json"
export const firebaseDatabaseUrlItem = "https://web-2401-todo-default-rtdb.europe-west1.firebasedatabase.app/items"
export const csrfUrl = API_URL + '/getcsrf'
export const loginUrl = API_URL + '/signin'
export const signupUrl = API_URL + '/signup'
export const logoutUrl = API_URL + '/logout'
export const confirmUrl = API_URL + '/confirm'
export const basename = base


