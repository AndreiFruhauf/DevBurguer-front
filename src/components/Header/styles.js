import styled from 'styled-components'

export const Container = styled.div`
  height: 72px;
  background: #fff;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`

export const ContainerLeft = styled.div`
  display: flex;
  gap: 30px;
`

export const PageLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${props => (props.isActive ? '#9758a6' : '#555555')};
  font-size: 16px;
  line-height: 19px;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
`

export const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const ContainerText = styled.div`
  p {
    color: #555555;
    font-weight: 300;
  }

  .logout {
    color: #9758a9;
    font-weight: bold;
  }
`

export const Line = styled.div`
  height: 40px;
  border-right: 1px solid #bababa;
`
