import styled from 'styled-components'

export const ContainerButton = styled.button`
  width: 182.81px;
  height: 36.129px;
  flex-shrink: 0;
  background: #f00;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: #eee;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    background: #fff;
    border: 1px solid #f00;
    color: #f00;
    transition: all 200ms ease-in-out;
  }

  &:active {
    background: #fff;
    border: 1px solid #f00;
    color: #f00;
    transition: all 200ms ease-in-out;
    opacity: 0.8;
  }
`
