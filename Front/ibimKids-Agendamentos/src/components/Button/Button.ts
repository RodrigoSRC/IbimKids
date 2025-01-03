import styled from "styled-components";
import { ButtonHTMLAttributes } from "react";

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tp?: "login" | "register";
}

export const StyledButton = styled.button<StyledButtonProps>`
  height: 48px;
  width: 100%;
  background-color: ${({ tp }) =>
    tp === "login" ? "var(--color-primary-focus)" : "var(--color-primary-negative)"};
  border-radius: var(--border-radius);
  color: var(--grey-0);
  font-size: 14px;

  &:hover {
    background-color: var(--color-primary-focus);
  }
`;

