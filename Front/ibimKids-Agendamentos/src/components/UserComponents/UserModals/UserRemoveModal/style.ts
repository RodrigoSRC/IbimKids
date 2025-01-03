import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    background-color: var(--grey-3);



    button{
        display: flex;
        align-items: center;
        justify-content: center;


        color: var(--grey-0);
        background-color: var(--color-primary-negative);
        border-radius: 3px;
        
        width: 100%;
        height: 30px;

        &:hover{
            background-color: var(--color-primary-focus);
        }
    }
`