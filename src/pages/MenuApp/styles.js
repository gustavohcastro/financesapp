import styled from 'styled-components/native';

export const Background = styled.View`
    flex : 1;
    background-color : #131313;

`

export const Container = styled.View`
    margin-left : 15px;
    margin-bottom : 25px;
`

export const Nome = styled.Text`
    font-size : 18px;
    color : #fff;
    font-style : italic;

`

export const Saldo = styled.Text`
    margin-top : 5px;
    font-size : 30px;
    color : #fff;
    font-weight : bold;
`

export const Title = styled.Text`
    margin-left: 15px;
    color : #00b94a;
    margin-bottom : 10px;
`

export const Menu = styled.View`
    display : flex;
    border-top-left-radius : 20px;
    border-top-right-radius : 20px;
    flex-direction : row;
    justify-content : space-evenly;
    flex-wrap : wrap;
`
export const ItemMenu = styled.TouchableOpacity`
    background-color : rgba(255,255,255,0.8);
    display : flex;
    width : 46%;
    height : 120px;
    justify-content : center;
    align-items : center;
    border-radius : 20px;
    margin-bottom: 10px;
`
export const TextMenu = styled.Text`
    font-size: 16px;
    color : #00b94c;
    font-weight : bold
` 

