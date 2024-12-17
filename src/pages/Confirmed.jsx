/* Vahvistuslinkin saapumiskuittaus sähköpostiosoitteen aikaisemmasta 
   tai tuoreesta vahvistuksesta. */
import React from "react";
import { useAuth } from "../context/Auth";
import { useLocation } from "react-router-dom";


export const Confirmed = () => {
const { authConfirm,setAuthConfirm } = useAuth();
const location = useLocation()
console.log("Rendering Confirmed, location.search:",location.search)

/* location.search sisältää url-parametriosan ml. '?'.
   Flaskissä asetetaan ?confirmed=1 jo vahvistetulle.
*/
let jo = location.search ? "jo " : ""
if (!authConfirm) setAuthConfirm('CONFIRMED')

return (
    <div>
    <h2>Sähköpostiosoite on {jo}vahvistettu.</h2>
    <p>Voit sulkea tämän ikkunan.</p>
    </div>
    )
}

export default Confirmed;