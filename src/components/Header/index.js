import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons'

import {useNavigation} from '@react-navigation/native'

import { Container, Menu} from './styles';

export default function Header() {
    const navigation = useNavigation();
 return (
   <Container>
       <Menu onPress={ () => { navigation.toggleDrawer() }}>
           <Feather name="menu" color="#fff" size={30} />
       </Menu>
   </Container>
  );
}