import React, { useState,useEffect,useRef } from "react";
import { Link, Navigate, useLocation, useLoaderData } from "react-router-dom";
import { Card, Otsikko, Form, Input, Error } from "./AuthForm";
import Button from '@mui/material/Button';
import { Box, InputLabel, TextField, CircularProgress } from '@mui/material';
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Auth";
import { signupUrl } from "../components/constants";


export const Signup = () => {
    const { authTokens,setAuthTokens,setAuthConfirm } = useAuth();
    const { register, handleSubmit, setError, watch, formState: { errors } } = useForm();
    const { csrfToken, error } = useLoaderData();
    const [ signUpEmail, setSignupEmail ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const password = useRef({});
    password.current = watch("password", "");
    console.log("Signup, password:",password.current);
    
    const setErrors = errors => {
        for (let kentta in errors) {
          console.log(`setErrors, ${kentta}:${errors[kentta]}:`)
          setError(kentta,{type:"palvelinvirhe",message:errors[kentta]})
          }
        }  

    useEffect(() => {
        setLoading(false);
        if (error) {
            console.log("Login, error:",error);
            setError("apiError",{ message: "Kirjautuminen ei onnistu" });
        }
    }, [csrfToken, error])
  
    //console.log("Errors:",errors);
    //console.log("Register:",register);
    console.log("Rendering Signup component");
    console.log("Signup,errors:",errors);  
    console.log("signUpEmail:",signUpEmail);  
    
    const fetchSignup = async data => {
        console.log("FetchLogin, data:",data);
        console.log("csrfToken:",csrfToken);
        const formData = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));
        const searchParams = new URLSearchParams(window.location.search)
        const next = searchParams.get('next')
        let url = signupUrl 
        if (next) url = `${url}?next=${next}`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {"X-CSRFToken": csrfToken},
                credentials:'include',
                // mode: 'cors',
                body:formData})
            if (!response.ok) {
                const json = await response.json();
                console.log("fetchSignup, rekisteröinnissä tapahtui virhe.");
                setErrors(json.errors);
                return;
            }   
            const json = await response.json()
            if (json.success) {
                console.log("fetchSignup, success:",json);
                setSignupEmail(data.email)
            }
            else {
                console.log("fetchSignup, virheet:", json.errors);
                setErrors(json.errors)
            }   
        } 
        catch(e) {
            setError('apiError',{ message:e.message })
        }
    }
     
    if (signUpEmail)
    return (
        <div>
        <h2>Rekisteröityminen onnistui!</h2>
        <p>
          Kiitos rekisteröitymisestä. Sähköpostiviesti on lähetetty antamaasi sähköpostiosoitteeseen <strong>{signUpEmail}</strong> sen vahvistamiseksi.
          Tarkista saapunut sähköpostisi ja seuraa viestissä annettuja ohjeita tilisi aktivoimiseksi.
        </p>
        <p>
          Kun sähköpostiosoitteesi on vahvistettu, voit kirjautua palveluun tästä: <Link to="/login">Kirjautuminen</Link>.
        </p>
        </div>
          //return <Navigate to='/login'/>;
        )

    else
    return (
        <Box margin='auto' maxWidth='650px' display='flex' flexDirection='column' alignItems='flex-start'>
        {/*<Logo src={logoImg} />*/}
        <Otsikko></Otsikko>
        <Form>
        <fieldset style={{ border: '1px solid blue', padding: '30px', borderRadius: '10px', position: 'relative' }}>  
        <legend style={{ padding: '0 10px', background: '#fff', position: 'absolute', top: '-20px',width: '200px' }}>Rekisteröityminen</legend>
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
            {errors.email?.type === 'palvelinvirhe' && <Error>{ errors.email.message }</Error> }
 
        </Box>
        </Box>
        <Box sx={{ display:'flex',flexDirection:{xs: 'column', sm: 'row'}, alignItems:{sm:'center'} }}>
        <InputLabel sx={{ width:'175px',textAlign:'left'}} htmlFor="password">Salasana</InputLabel>
        <Box mb={1} sx={{ flex: 1 }}>
        <TextField 
            fullWidth
            type="password" 
            {...register("password", { 
              required: true
             })}
        />
        {errors.password?.type === 'required' && <Error>Anna salasana</Error>} 
        {errors.password?.type === 'tunnusvirhe' && <Error>Väärä käyttäjätunnus tai salasana!</Error> }
        {errors.password?.type === 'palvelinvirhe' && <Error>{ errors.password.message }</Error> }
        </Box>
        </Box>
        <Box sx={{ display:'flex',flexDirection:{xs: 'column', sm: 'row'}, alignItems:{sm:'center'} }}>
        <InputLabel sx={{ width:'175px',textAlign:'left'}} htmlFor="password">Salasana uudestaan</InputLabel>
        <Box mb={1} sx={{ flex: 1 }}>     
        <TextField 
            fullWidth
            type="password" 
            {...register("password2", { 
            required: true,
            validate: value => value === password.current 
        })}
      />
      {errors.password2?.type === 'required' && <Error>Anna salasana</Error>}
      {errors.password2?.type === 'validate' && <Error>Salasanat eivät täsmää</Error>}
      {errors.password2?.type === 'palvelinvirhe' && <Error>{errors.password2.message}</Error>} 
      {errors.password2?.type === 'tunnusvirhe' && <Error>{errors.password2.message}</Error>} 
        </Box>
        </Box>
        </fieldset>
        {loading && <CircularProgress sx={{ alignSelf: 'center', mt: 2 }} />}
        <Button
            sx={{ mt: 2, mb: 2, mr: 2, width: '150px', alignSelf: 'flex-end' }}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit(fetchSignup)}>
            Rekisteröidy
        </Button>
        </Form>
        </Box>
    )
    
      

}