import { ReactNode } from "react";

import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

const StyledPanel = styled.div<{ area?: string; color: keyof Theme }>`
  border: 0.125rem solid ${({ theme, color }) => theme[color]};
  ${({ area }) => area && `grid-area: ${area}-data`};
  grid-template-columns: 1fr;
  align-items: center;
  display: grid;
  gap: 0.5rem;
`;

const StyledWrapper = styled.div`
  grid-template-columns: 1fr;
  padding: 0.5rem;
  display: grid;
  gap: 1rem;
`;

const StyledLegend = styled.legend<{ color: keyof Theme }>`
  color: ${({ theme, color }) =>
    color === "bg" ? theme.secondary : theme.white};
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
