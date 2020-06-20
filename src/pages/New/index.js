import React, { useState, useContext } from 'react';
import { View, Text, SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';


import Header from '../../components/Header';
import {Background, Input, SubmitButton, SubmitTexto} from './styles';
import Picker from '../../components/Picker/index.android';

import firebase from '../../services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../../contexts/auth'

export default function New() {
  const navigation = useNavigation();

  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState(null);

  const { user : usuario} = useContext(AuthContext);

  function handleSubmit(){
    Keyboard.dismiss();
    
    if( isNaN(parseFloat(valor)) || tipo === null ) {
      alert("Preencha todos os campos");
      return;
    }

    Alert.alert(
      'Confirmando Dados',
      `Tipo ${tipo} - Valor ${parseFloat(valor)}`,
      [
        {
          text : 'Cancelar',
          style : 'cancel'
        },
        {
          text : 'Continuar',
          onPress: () =>  handleAdd()
        }
      ]
    )

  }

  async function handleAdd(){
    let uid = usuario.uid;

    let key = await firebase.database().ref('historico').child(uid).push().key;

    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo : tipo,
      valor : parseFloat(valor),
      date : Date.now()
    })

    //atualizar saldo
    let user = firebase.database().ref('users').child(uid);

    await user.once('value').then( (snapshot) => {
      
      let saldo = parseFloat(snapshot.val().saldo);

      tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);

      user.child('saldo').set(saldo);

    })
    Keyboard.dismiss();
    setValor('');
    navigation.navigate('Home');


  }

 return (
   <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
    <Background>
      <Header/>
      <SafeAreaView style={{alignItems : 'center'}}>
        <Input 
        placeholder="Valor Desejado"
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={() => Keyboard.dismiss()}
        value={valor}
        onChangeText={ texto => setValor(texto)}
        />
        <Picker onChange={setTipo} />
        <SubmitButton onPress={handleSubmit}>
          <SubmitTexto>Registrar</SubmitTexto>
        </SubmitButton>
      </SafeAreaView>
    </Background>
  </TouchableWithoutFeedback>
  );
}