import { ReactNode } from "react";

import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

const StyledPanel = styled.div<{ area?: string; color: keyof Theme }>`
  border: 0.125rem solid ${({ theme, color }) => theme[color]};
  ${({ area }) => area && `grid-area: ${area}-data`};
  align-items: center;
  display: grid;
  gap: 0;
`;

const StyledWrapper = styled.div`
  padding: 0.5rem;
`;

const StyledLegend = styled.legend<{ color: keyof Theme }>`
  color: ${({ theme, color }) => (color === "bg" ? theme.black : theme.white)};
  background: ${({ theme, color }) => theme[color]};
  padding: 0.5rem;
`;

export default function DataPanel({
  color = "bg",
  children,
  title,
  area,
}: {
  children: ReactNode;
  color?: keyof Theme;
  title?: string;
  area?: string;
}) {
  return (
    <StyledPanel area={area} color={color}>
      {title && <StyledLegend color={color}>{title}</StyledLegend>}
      <StyledWrapper>{children}</StyledWrapper>
    </StyledPanel>
  );
}
