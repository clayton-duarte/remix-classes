import { ReactNode } from "react";
import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

const StyledWrapper = styled.div<{ area: string; color: keyof Theme }>`
  border: 2px solid ${({ theme, color }) => theme[color]};
  grid-area: ${({ area }) => area};
  margin-top: 2rem;
  padding: 0.5rem;
  display: grid;
  gap: 0.5rem;
`;

const StyledLegend = styled.legend``;

export default function characterRace({
  color = "bg",
  children,
  title,
  area,
}: {
  area: "role-data" | "power-data" | "class-data" | "race-data";
  children: ReactNode;
  color?: keyof Theme;
  title?: string;
}) {
  return (
    <StyledWrapper color={color} area={area}>
      {title && <StyledLegend />}
      {children}
    </StyledWrapper>
  );
}
