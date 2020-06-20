import React, { useState, useContext } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import {Background, Container, AreaInput, Logo, Input, 
    SubmitButton, SubmitText} from '../SignIn/styles';

import {AuthContext} from '../../contexts/auth';


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');


  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSignUp(){
    signUp(email, password, nome)
  }

 return (
  <Background>
    <Container
      behavior={Platform.OS === 'ios' ? "padding" : ''}
      enabled
    >
      <AreaInput>
        <Input 
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="none"
            value={nome}
            onChangeText={ texto => setNome(texto)}
        />
        <Input 
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={ texto => setEmail(texto)}
        />
        <Input 
          placeholder="Senha"
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={ texto => setPassword(texto)}
        />
     
      </AreaInput>
      <SubmitButton onPress={handleSignUp}>
      {
          loadingAuth ? (
            <ActivityIndicator size={20} color="#fff"/>
          )
          :
          (
            <SubmitText>Cadastrar</SubmitText>
          )
        }
      </SubmitButton>

    </Container>
  </Background>
  );
}