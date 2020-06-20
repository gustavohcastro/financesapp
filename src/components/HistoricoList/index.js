import React from 'react';
import { View, Text } from 'react-native';
import { Feather} from '@expo/vector-icons'

import {Container, Tipo, TipoText, ValorText, IconView} from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function HistoricoList({ data, deleteItem }) {
 return (
   <TouchableWithoutFeedback onLongPress={ () => deleteItem(data) }>
   <Container>
       <Tipo>
           <IconView tipo={data.tipo}>
                <Feather 
                  name={data.tipo == 'despesa' ? 'arrow-down' : 'arrow-up'}
                  color="#fff" 
                  size={20}/>
                <TipoText>{data.tipo}</TipoText>
           </IconView>
       </Tipo>
       <ValorText>
            R${data.valor}
       </ValorText>
   </Container>
  </TouchableWithoutFeedback>
  );
}