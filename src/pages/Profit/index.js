import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';

import firebase from '../../services/firebaseConnection';

import {AuthContext} from '../../contexts/auth'
import Header from '../../components/Header';
import {Background, Container, ProfitTitle, TextMenu, Nome, Menu, Saldo, Title, List, ItemMenu, ProfitBoard, ProfitBoardResume, StatusVIew, InputView, InputText} from './styles';
import HistoricoList from '../../components/HistoricoList';
import {Feather} from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { SubmitButton, SubmitTexto, Input } from '../New/styles';


export default function Profit() {

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
      <InputView>
        <Input placeholder="Valor a investir" placeholderTextColor="#fff"/>
        <SubmitButton>
            <SubmitTexto>
                Investir
            </SubmitTexto>
        </SubmitButton>
      </InputView>
      <ProfitBoard>
      <ProfitTitle>
          PROFIT-ON-PROFIT
      </ProfitTitle>
          <ProfitBoardResume>
              <Feather name="trending-up" size={60} color="#00b94c"/>
              <Feather name="database" size={120} color="#00b94c"/>
              <Feather name="trending-down" size={60} color="#00b94c"/>
          </ProfitBoardResume>
      </ProfitBoard>
      <StatusVIew>
        <TextMenu>
            Valor investido : R$200,00
        </TextMenu>
        <TextMenu>
            Lucro : R$30,00
        </TextMenu>
      </StatusVIew>
    </Background>
  );
}