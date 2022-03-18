import { ReactNode } from "react";
import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

const StyledPanel = styled.div<{ area: string; color: keyof Theme }>`
  border: 2px solid ${({ theme, color }) => theme[color]};
  grid-area: ${({ area }) => area};
  margin-top: 1.75rem;
  display: grid;
  gap: 0;
  @media all and (max-width: 768px) {
    margin-top: 0;
  }
`;

const StyledWrapper = styled.div`
  padding: 0.5rem;
`;

const StyledLegend = styled.legend<{ color: keyof Theme }>`
  color: ${({ theme, color }) => (color === "bg" ? theme.black : theme.white)};
  background: ${({ theme, color }) => theme[color]};
  padding: 0.5rem;
`;

export default function characterRace({
  color = "bg",
  children,
  title,
  area,
}: {
  area: "role-data" | "power-data" | "class-data" | "race-data" | "char";
  children: ReactNode;
  color?: keyof Theme;
  title?: string;
}) {
  return (
    <StyledPanel color={color} area={area}>
      {title && <StyledLegend color={color}>{title}</StyledLegend>}
      <StyledWrapper>{children}</StyledWrapper>
    </StyledPanel>
  );
}
