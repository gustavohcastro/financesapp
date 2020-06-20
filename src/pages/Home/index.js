import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';

import firebase from '../../services/firebaseConnection';

import {AuthContext} from '../../contexts/auth'
import Header from '../../components/Header';
import {Background, Container, Nome, Saldo, Title, List} from './styles';
import HistoricoList from '../../components/HistoricoList';

export default function Home() {

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
        <Title>
          Ultimas Movimentações
        </Title>
        <List
          showsVerticalScrollIndicator={false}
          data={historico}
          keyExtractor={ item => item.key}
          renderItem={ ({item}) => (
            <HistoricoList data={item} deleteItem={handleDelete}/>
          )}
        />
    </Background>
  );
}