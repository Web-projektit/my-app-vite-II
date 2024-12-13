import React, { useState,useEffect } from "react";
import { Link, Navigate, useLocation, useLoaderData } from "react-router-dom";
import { Card, Otsikko, Form, Input, Error } from "./AuthForm";
import Button from '@mui/material/Button';
import { Box, InputLabel, TextField, CircularProgress } from '@mui/material';
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Auth";
import { loginUrl } from "../components/constants";


export const Login = () => {
    const { authTokens,setAuthTokens,setAuthConfirm } = useAuth();
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const { csrfToken, error } = useLoaderData();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setLoading(false);
        if (error) {
            console.log("Login, error:",error);
            setError("apiError",{ message: "Kirjautuminen ei onnistu" });
        }
    }, [csrfToken, error])
  
    //console.log("Errors:",errors);
    //console.log("Register:",register);
    console.log("Rendering Login component");
    console.log("Login,errors:",errors);  
    console.log("authTokens:",authTokens);

    
    const fetchLogin = async data => {
        console.log("FetchLogin, data:",data);
        console.log("csrfToken:",csrfToken);
        const formData = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));
        const searchParams = new URLSearchParams(window.location.search)
        const next = searchParams.get('next')
        let url = loginUrl 
        if (next) url = `${url}?next=${next}`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {"X-CSRFToken": csrfToken},
                credentials:'include',
                // mode: 'cors',
                body:formData})
            if (!response.ok) {
                console.log("FetchLogin, virheellinen käyttäjätunnus tai salasana");
                setError("password",{ type: 'tunnusvirhe' })
                return
                }   
            const json = await response.json();
            console.log("FetchLogin, json:",json);
            if (json.success === false) {
                console.log("FetchLogin, palvelinvirhe:",json.message);
                setError("password",{ type: 'palvelinvirhe' })
                return
                }
            setAuthTokens("OK")
            if (json.confirmed) setAuthConfirm('CONFIRMED')
            else setAuthConfirm()  
            } 
        catch (error) {
            console.error("FetchLogin, virhe:",error);
            console.error("FetchLogin, error stack:", error.stack);
            setError("apiError",{ message: "Kirjautuminen epäonnistui." });
            }    
        }

    const { state } = useLocation()
    //console.log(`Login,message:${ilmoitus.message},loggedIn:${loggedIn}`)
    if (authTokens) {
        const referer = state?.location.pathname || '/' 
        const search = state?.location.search || '' 
        const to = `${referer}${search}`
        console.log(`Login,to:${to},state:`,state)
        return <Navigate to={to} replace={true} />
        }
      

    return (
        <Box margin='auto' maxWidth='650px' display='flex' flexDirection='column' alignItems='flex-start'>
        {/*<Logo src={logoImg} />*/}
        <Otsikko></Otsikko>
        <Form>
        <fieldset style={{ border: '1px solid blue', padding: '30px', borderRadius: '10px', position: 'relative' }}>  
        <legend style={{ padding: '0 10px', background: '#fff', position: 'absolute', top: '-20px',width: '175px' }}>Kirjautuminen</legend>
        {errors.apiError && <Error>{errors.apiError.message}</Error>}  
        <Box sx={{ display:'flex',flexDirection:{xs: 'column', sm: 'row'}, alignItems:{sm:'center'} }}>
        <InputLabel sx={{ width:'175px',textAlign:'left'}} htmlFor="email">Sähköpostiosoite</InputLabel>
        <Box mb={1} sx={{ flex: 1 }}>
            <TextField
                fullWidth
                {...register("email", { 
                required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                })}/> 
            {errors.email?.type === 'required' && <Error>Anna sähköpostiosoite</Error>} 
            {errors.email?.type === 'pattern'  && <Error>Virheellinen sähköpostiosoite</Error>}
        </Box>
        </Box>
        <Box sx={{ display:'flex',flexDirection:{xs: 'column', sm: 'row'}, alignItems:{sm:'center'} }}>
        <InputLabel sx={{ width:'175px',textAlign:'left'}} htmlFor="password">Salasana</InputLabel>
        <Box sx={{ flex: 1 }}>
        <TextField 
            fullWidth
            type="password" 
            {...register("password", { 
              required: true
             })}
        />
        {errors.password?.type === 'required' && <Error>Anna salasana</Error>} 
        {errors.password?.type === 'tunnusvirhe' && <Error>Väärä käyttäjätunnus tai salasana!</Error> }
        {errors.password?.type === 'palvelinvirhe' && <Error>Kirjautuminen epäonnistui!</Error> }
        </Box>
        </Box>
        </fieldset>
        {loading && <CircularProgress sx={{ alignSelf: 'center', mt: 2 }} />}
        <Button
            sx={{ mt: 2, mb: 2, mr: 2, width: '150px', alignSelf: 'flex-end' }}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit(fetchLogin)}>
            Kirjaudu
        </Button>
        </Form>
        <Link to="/signup">Et ole rekisteröitynyt vielä?</Link>    
        </Box>
    )
    
      

}