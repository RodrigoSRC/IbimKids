import styled from "styled-components";


export const Container = styled.li`
    display: flex;
    justify-content: space-between;
    
    /* flex-basis: calc(20% - 20px); */
    width: 100%;
    max-width: 250px;

    height: 125px;
    border-radius: 10px;

    background-color: var(--color-primary);
    color: var(--color-gray-900);

    padding: 10px;

    .nome{
        margin-bottom: 10px;
    }

    .infos {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        gap: 0.3rem;
    }
    
    .buttons{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .professores {
        display: flex;
        flex-direction: column;
        gap:.1875rem
    }

` 