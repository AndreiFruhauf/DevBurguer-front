import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  display: flex;
  padding: 16px;
  gap: 15px;
  border-radius: 20px;
  width: 25vw;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

export const Image = styled.img`
  width: 150px;
  border-radius: 10px;
  box-shadow: 0px 30px 60px 0px rgba(57, 57, 57, 0.1);
`

export const ProductName = styled.p`
  color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
export const ProductPrice = styled.p`
  color: #000;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  margin-top: 30px;
  line-height: normal;
`

export const Button = styled.button``
