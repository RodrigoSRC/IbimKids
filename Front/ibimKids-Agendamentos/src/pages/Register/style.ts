import styled from "styled-components";


export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 100%;

    background-color: var(--grey-4);
    color: var(--grey-0);

    .formBox{
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 1.875rem;

        width: 23.0625rem;

        margin: 50px auto;
    }

    .navBar{
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 100%;
    }

    .navBar > img {
        height: 21px;
    }

    .navBar > a {
        display: flex;

        color: var(--grey-0);
        background-color: var(--grey-3);

        height: 40px;
        width: 60px;

        align-items: center;
        justify-content: center;

        border-radius: var(--border-radious);
    }
`