import styled from 'styled-components'

import Backg from '../../assets/Background.svg'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url('${Backg}');
  display: flex;
  justify-content: center;
  align-items: center;
`

export const RegisterImage = styled.img`
  height: 90%;
`

export const ContainerItems = styled.div`
  padding: 25px 75px;
  border-radius: 0px 10px 10px 0;
  background: #f00;
  box-shadow: 0px 4px 15px 0px rgba(74, 144, 226, 0.24);
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
    color: #fff;
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 50px;
  }

  .email-div {
    display: flex;
    flex-direction: column;
  }

  .img {
    margin: 0 auto;
    display: block;
    text-align: center;
    width: 190px;
  }

  .key {
    width: 350px;
    border-radius: 5px 0px 0px 5px;
  }

  .eye {
    border-radius: 0px 5px 5px 0px;
    border: none;
    background: #fff;
    width: 38px;
    height: 38.319px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .key-div {
    display: flex;
    flex-direction: column;
  }

  .inputAndbutton {
    display: flex;
  }

  // separação

  .confirm-key {
    width: 350px;
    border-radius: 5px 0px 0px 5px;
  }

  .confirm-eye {
    border-radius: 0px 5px 5px 0px;
    border: none;
    background: #fff;
    width: 38px;
    height: 38.319px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .confirm-key-div {
    display: flex;
    flex-direction: column;
  }

  .confirmInputAndbutton {
    display: flex;
  }
`

export const Label = styled.p`
  color: #fff;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: ${props => (props.error ? '12px' : '28px')};
  margin-bottom: 5px;
`

export const Input = styled.input`
  padding-left: 10px;
  width: 391.416px;
  height: 38.319px;
  flex-shrink: 0;
  border: none;
  border-radius: 5px;

  box-shadow: 3px 3px 10px 0px rgba(74, 144, 226, 0.19);
`

export const SignInLink = styled.p`
  color: #fff;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  a {
    text-decoration: underline;
    cursor: pointer;
  }
`