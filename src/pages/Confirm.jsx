/* Sähköpostiosoitevahvistuslinkin uudelleen lähetys */
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "../context/Auth";

export const Confirm = () => {
const { setAuthConfirm } = useAuth();    
const { data, error } = useLoaderData();
console.log("Rendering Confirm")

useEffect(() => {
const handleStorageChange = event => {
    if (event.key === 'confirm') {
      setAuthConfirm(event.newValue)
      console.log('localStorage item confirm has changed:', event.newValue);
      }
    }
window.addEventListener('storage', handleStorageChange);
return () => window.removeEventListener('storage', handleStorageChange);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


if (data.success) return (
    <div>
    <h2>Sähköpostiosoitteen vahvistuspyyntö on lähetetty.</h2>
    <p>{data.message}</p>
    </div>
    )    

if (error) return (
    <div>
    <h2>Sähköpostiosoitteen vahvistuspyynnön lähetys epäonnistui.</h2>
    <p>{error}</p>
    </div>
    )
}

export default Confirm;