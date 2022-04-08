import styled from "@emotion/styled";

import { Colors } from "~/helpers/dataTypes";

const StyledButton = styled.button<{ color?: Colors }>`
  background: ${({ theme, color }) => theme[color ?? "primary"]};
  color: ${({ theme }) => theme.white};
  padding: 0.5rem 1.5rem;
  border: none;
`;

export default StyledButton;
