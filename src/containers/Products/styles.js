import styled from 'styled-components'

export const Container = styled.div`
  background: #e5e5e5;
  min-height: calc(100vh - 72px);
`

export const ProductsImage = styled.img`
  width: 100%;
`

export const CategoriesMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 20px;
`

export const CategoryButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding-bottom: 5px;
  border-bottom: ${props => props.isActiveCategory && '2px solid #fd0000'};
  color: ${props => (props.isActiveCategory ? '#fd0000' : '#9a9a9d')};
  font-size: 17px;
  line-height: 28px;
`

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 40px;
  margin-top: 20px;
  justify-items: center;
`
