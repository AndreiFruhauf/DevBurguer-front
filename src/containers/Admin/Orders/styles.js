import ReactSelect from 'react-select'
import styled from 'styled-components'

export const Container = styled.div`
  background: #efefef;
  min-height: 100vh;
`

export const ProductsImg = styled.img`
  width: 120px;
  border-radius: 10px;
`

export const ReactSelectStyle = styled(ReactSelect)`
  width: 250px;

  .css-1xc3v61-indicatorContainer {
    cursor: pointer;
  }
`

export const Menu = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;
  margin: 20px 0;
`

export const LinkMenu = styled.a`
  color: #323d5d;
  cursor: pointer;
  font-weight: ${props => (props.isActiveStatus ? 'bold' : '400')};
  border-bottom: ${props => (props.isActiveStatus ? '2px solid #323d5d' : '')};
  padding-bottom: 10px;
`
