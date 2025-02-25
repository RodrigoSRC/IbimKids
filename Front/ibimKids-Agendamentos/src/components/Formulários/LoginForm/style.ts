import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  /* height: 32rem; */
  width: 370px;
  background-color: var(--grey-3);
  color: var(--grey-0);

  h1 {
    margin: 15px;
  }


  > p {
    margin-top: 30px;
  }

  a {
    display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 100%;
  color: var(--grey-0);
  background-color: var(--grey-1);
  border-radius: var(--border-radius);
  }
`;