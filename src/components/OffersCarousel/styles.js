import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  padding: 35px 0;

  .rec.rec-arrow {
    background-color: #ff1f00;
    color: #efefef;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .rec.rec-arrow:hover {
    border: 2px solid #ff1f00;
    background-color: #efefef;
    color: #ff1f00;
    cursor: pointer;
  }

  .rec.rec-arrow:disabled {
    border: none;
    background: #bebebf;
    color: #efefef;
    cursor: not-allowed;
  }

  .iXiJww {
    background: #ff1f00;
    border: none;
    box-shadow: 0 0 1px 3px #ff1f00;
  }
`

export const OfferImage = styled.img`
  width: 23%;

  @media screen and (max-width: 700px) {
    width: 50%;
  }
`

export const ContainerItems = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: #424242;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
  }
`

export const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  margin-bottom: 16px;
`

export const Button = styled.button`
  width: 200px;
  height: 50px;
  color: #efefef;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  margin-top: 16px;
  border-radius: 8px;
  border: none;
  background: #ff1f00;
  cursor: pointer;

  &:hover {
    background: #efefef;
    border: 2px solid #ff1f00;
    color: #ff1f00;
    transition: all 200ms ease-in-out;
  }

  &:active {
    opacity: 0.6;
  }
`
