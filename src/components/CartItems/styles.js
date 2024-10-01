import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 10px;
  width: max-content;
`

export const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 10px;
  border-bottom: 1px solid #b5b5b5;

  p {
    font-size: 16px;
    color: #b5b5b5;
  }
`

export const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 10px;
  align-items: center;

  img {
    border-radius: 10px;
    width: 120px;
  }

  p {
    font-size: 16px;
    width: 190px;
    margin-top: 5px;
  }

  .quantity-container {
    display: flex;
    align-items: start;
    gap: 20px;

    p {
      width: max-content;
    }

    button {
      background: transparent;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }
  }

  button {
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    width: max-content;
  }

  .trash {
    width: 30px;
  }
`

export const EmptyCart = styled.p`
  padding: 20px;
  text-align: center;
  font-weight: bold;
`
