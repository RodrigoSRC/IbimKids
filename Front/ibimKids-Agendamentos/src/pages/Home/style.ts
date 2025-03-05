import styled from "styled-components";

export const StyledContainer = styled.main`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    gap: 20px;

    min-height: 100vh;
    width: 100vw;

    background-color: var(--grey-4);
    color: var(--grey-0);

    .formBox{
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 1.875rem;
        
        max-width: 90rem;

        width: 100%;

        margin: 0 auto;

        padding: 1rem;
    }

    .navBar{
        display: flex;
        justify-content: space-between;
        align-items: center;

        height: 70px;
        width: 100%;
    }

    .navBar > a {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 30px;
        width: 55px;

        background-color: var(--grey-3);
        color: var(--grey-0);

        border-radius: var(--border-radious);
    }

    .headerSection{
        width: 100vw;
        border-bottom: 1px solid var(--grey-1);
        border-top: 1px solid var(--grey-1);
    }

    header{
        display: flex;
        justify-content: space-between;
        align-items: center;

        height: 110px;
        max-width: 90rem;
        width: 100%;
        padding: 1rem;
        margin: 0 auto;
    }

    header > p {
        color: var(--grey-1);
    }

    header > div {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        gap: 22px;
    }

    main{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 20px;

        width: 100%;
    }

    button {
        color: white;
        background-color: red;
    }

    section {
        display: flex;
        justify-content: space-between;
    }

    div section span {
        color: var(--color-primary);
    }

    ul {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 30px;
    color: white;
}

.principalContent{
    width: 100%;
}
`