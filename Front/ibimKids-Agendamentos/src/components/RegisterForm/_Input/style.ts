import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: .625rem;

    width: 100%;

    > input {
    height: 48px;
    padding: 1rem;

    color: var(--grey-0);
    background-color: var(--grey-2);

    border-radius: var(--border-radious);

    
}
.errorMessage {
    color: var(--color-primary);
}

`