import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

interface GridProps {
  border?: keyof Theme;
  template?: string;
  justify?: string;
  align?: string;
  gap?: string;
  p?: string;
  m?: string;
}

const StyledDiv = styled.div<GridProps>`
  border: 2px solid ${({ theme, border }) => theme[border ?? "white"]};
  grid-template-columns: ${({ template }) => template ?? "1fr"};
  justify-content: ${({ justify }) => justify ?? "flex-start"};
  align-items: ${({ align }) => align ?? "flex-start"};
  gap: ${({ gap }) => gap ?? "1rem"};
  padding: ${({ p }) => p ?? "0"};
  margin: ${({ m }) => m ?? "0"};
  display: grid;
`;

export default StyledDiv;
