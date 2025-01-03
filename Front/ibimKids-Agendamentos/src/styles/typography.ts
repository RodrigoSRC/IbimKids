import styled, {css} from "styled-components";


export const HeadlineStyles = css<{ fontWeight?: string; fontItalic?: string }>`
  font-weight: ${({ fontWeight }) => (fontWeight === "bold" ? 700 : 400)};
  font-style: ${({ fontItalic }) => (fontItalic === "italic" ? "italic" : "normal")};
  color: var(--grey-0);
`;


export const StyledLogo = styled.h1<{ fontWeight?: string }>`
  ${HeadlineStyles};
  font-size: 45px;

  > span {
    color: var(--color-primary);
  }
`;

export const StyledTitle = styled.h1<{ fontWeight?: string }>`
  ${HeadlineStyles};
  font-size: 22px;
`;

export const StyledParagraph = styled.p<{ fontWeight?: string; fontItalic?: string }>`
  ${HeadlineStyles};
  font-size: 14px;
`;


