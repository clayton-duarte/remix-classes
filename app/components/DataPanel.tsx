import { ReactNode } from "react";
import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

const StyledPanel = styled.div<{ area: string; color: keyof Theme }>`
  border: 0.125rem solid ${({ theme, color }) => theme[color]};
  grid-area: ${({ area }) => area};
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
  area: string;
  children: ReactNode;
  color?: keyof Theme;
  title?: string;
}) {
  return (
    <StyledPanel id={`${area}-panel`} color={color} area={`${area}-data`}>
      {title && <StyledLegend color={color}>{title}</StyledLegend>}
      <StyledWrapper>{children}</StyledWrapper>
    </StyledPanel>
  );
}
