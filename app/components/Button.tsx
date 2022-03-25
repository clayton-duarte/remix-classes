import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

const StyledButton = styled.button<{ color?: keyof Theme }>`
  background: ${({ theme, color }) => theme[color ?? "primary"]};
  color: ${({ theme }) => theme.white};
  padding: 0.5rem 1.5rem;
  border: none;
`;

export default StyledButton;
