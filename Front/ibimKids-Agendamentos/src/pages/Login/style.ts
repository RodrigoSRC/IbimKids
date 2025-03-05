import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 100vh;
    width: 100%;

    background-color: var(--grey-4);

    .formBox{
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 1.875rem;

        max-width: 370px;

        margin: 0 auto;
    }

    .formBox > img {
        width: 145px;
    }
`