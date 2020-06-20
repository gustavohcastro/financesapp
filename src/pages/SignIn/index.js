import React, { useState, useContext } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import {useNavigation} from '@react-navigation/native'

import {Background, Container, AreaInput, Logo, Input, Link, LinkText, SubmitButton, SubmitText} from './styles'
import {AuthContext} from '../../contexts/auth';


export default function SignIn() {

  const navigation = useNavigation();
  const { signIn, loadingAuth } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(){
    signIn(email, password)
  }

  
 return (
  <Background>
    <Container
      behavior={Platform.OS === 'ios' ? "padding" : ''}
      enabled
    >
      <Logo source={require('../../assets/Logo.png')}/>
      <AreaInput>
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
      <SubmitButton onPress={handleLogin}>
        {
          loadingAuth ? (
            <ActivityIndicator size={20} color="#fff"/>
          )
          :
          (
            <SubmitText>Acessar</SubmitText>
          )
        }
      </SubmitButton>

      <Link onPress={()=>{navigation.navigate('SignUp')}}>
        <LinkText>Criar uma conta!</LinkText>
      </Link>
    </Container>
  </Background>
  );
}