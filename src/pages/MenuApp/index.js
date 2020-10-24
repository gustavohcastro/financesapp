import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';

import firebase from '../../services/firebaseConnection';

import {AuthContext} from '../../contexts/auth'
import Header from '../../components/Header';
import {Background, Container, TextMenu, Nome, Menu, Saldo, Title, List, ItemMenu} from './styles';
import HistoricoList from '../../components/HistoricoList';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function MenuApp() {

  const navigation = useNavigation()
  const { user, signOut} = useContext(AuthContext);
  
  const [historico, setHistorico] = useState([])
  const [saldo, setSaldo] = useState(0);

  const uid = user && user.uid;


  useEffect( ()=>{
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value' , (snapshot) => {
        setSaldo(snapshot.val().saldo);
      })

      await firebase.database().ref('historico').child(uid).limitToLast(10).on('value', (snapshot) => {
        setHistorico([])
        snapshot.forEach( (childItem) => {
          let list = {
            key : childItem.key,
            tipo : childItem.val().tipo,
            valor : childItem.val().valor,
          };

          setHistorico( oldArray => [...oldArray, list].reverse());
        })
      })
    }
    loadList();

  },[])

  function handleDelete(data){
    Alert.alert(
      'Cuidado',
     `Você deseja excluir ${data.tipo} - Valor ${data.valor}`,
     [
       {
         text : 'Cancelar',
         style : 'cancel'
       },
       {
         text : 'Continuar',
         onPress: () => handleDeleteSuccess(data)
       }
     ]
    )
  }

  
  async function handleDeleteSuccess(data){
    await firebase.database().ref('historico').child(uid).child(data.key).remove().then( async ()=> {
      
      let saldoAtual = saldo;
      data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

      await firebase.database().ref('users').child(uid).child('saldo').set(saldoAtual)

    }).catch( error => console.log(error));
  }
 return (
    <Background>
      <Header/>
      <Container>
        <Nome>
         {user && user.nome}
        </Nome>
        <Saldo>
          R${saldo},00
        </Saldo>
      </Container>
      <Menu>
        <ItemMenu>
          <Feather name="dollar-sign" size={32} color='#00b94c'/>
          <TextMenu>14 Salario</TextMenu>
        </ItemMenu>
        <ItemMenu>
          <Feather name="users" size={32} color='#00b94c'/>
          <TextMenu>YouToo</TextMenu>
        </ItemMenu>
        <ItemMenu onPress={ () => navigation.navigate('Profit')}>
          <Feather name="trending-up" size={32} color='#00b94c'/>
          <TextMenu>Profit-on-Profit</TextMenu>
        </ItemMenu>
        <ItemMenu>
          <Feather name="book-open" size={32} color='#00b94c'/>
          <TextMenu>Intercambio Integrado</TextMenu>
        </ItemMenu>
        <ItemMenu>
        <Feather name="refresh-cw" size={32} color='#00b94c'/>
          <TextMenu>Transferir</TextMenu>
        </ItemMenu>
        <ItemMenu>
          <Feather name="credit-card" size={32} color='#00b94c'/>
          <TextMenu>Cartão</TextMenu>
        </ItemMenu>
        <ItemMenu>
        <Feather name="shopping-cart" size={32} color='#00b94c'/>
          <TextMenu>Pagamento</TextMenu>
        </ItemMenu>
        <ItemMenu>
        <Feather name="archive" size={32} color='#00b94c'/>
          <TextMenu>Depositar</TextMenu>
        </ItemMenu>
      </Menu>
    </Background>
  );
}