import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  padding: 15px;
  border-radius: 20px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.3);

  .container-top {
    display: grid;
    grid-gap: 10px 50px;
    grid-template-areas:
      'title title'
      'quantity number';
  }

  .title {
    grid-area: title;
    margin-bottom: 20px;
  }

  .quantity {
    grid-area: quantity;
  }

  .quantity-number {
    grid-area: number;
  }

  .container-bottom {
    display: grid;
    margin-top: 60px;
    grid-template-areas: 'total price';

    .total {
      grid-area: total;
    }

    .total-price {
      grid-area: price;
    }
  }
`
