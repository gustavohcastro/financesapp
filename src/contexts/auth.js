import React, { createContext, useState, useEffect } from 'react'
import firebase from '../services/firebaseConnection';
import { AsyncStorage } from 'react-native';

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false)

    //Verifica se tem usuario no AsyncStorage
    useEffect(()=>{
        async function loadStorage(){
            const userStorage = await AsyncStorage.getItem('authuser');
            if (userStorage){
                setUser(JSON.parse(userStorage));
                setLoading(false);
            }
            setLoading(false);
        }

        loadStorage();
    },[])

    //Login de usuario
    async function signIn(email, password){
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async(value)=>{
            let uid = value.user.uid;
            await firebase.database().ref("users").child(uid).once("value")
            .then( (snapshot) => {
                let data = {
                    uid : uid,
                    nome : snapshot.val().nome,
                    email : value.user.email,
                }
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })
        })
        .catch( error => {
            alert(error.code)
            setLoadingAuth(false);
        })
    }
    //Cadastro de Usuario no firebase
    async function signUp(email, password, nome) {
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value)=>{
            let uid = value.user.uid;
            await firebase.database().ref("users").child(uid).set({
                nome : nome,
                saldo : 0
            })
            .then(()=> {
                let data = {
                    uid : uid,
                    nome : nome,
                    email : value.user.email
                }
                setUser(data);
                storageUser(data);
                setLoadingAuth(false)
            })
        }).catch( (error) => {
            alert(error.code);
            setLoadingAuth(false)
        })
    }
    //Grave no AsyncStorage
    async function storageUser(data){
        await AsyncStorage.setItem("authuser", JSON.stringify(data))
        .then(()=>
        {
            console.log("Sucesso")
        })
        .catch(error => console.log(error))
        
    }
    async function signOut(){
        await firebase.auth().signOut();
        await AsyncStorage.clear()
        .then(()=>{
            setUser(null);
        })
    }

    return(
        <AuthContext.Provider value={{ signed : !!user ,user, loading, loadingAuth, signOut, signUp, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;