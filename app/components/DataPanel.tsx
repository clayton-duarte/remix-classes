import { ReactNode } from "react";
import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

const StyledWrapper = styled.div<{ area: string }>`
  grid-area: ${({ area }) => area};
  margin-top: 2rem;
  display: grid;
  gap: 0.5rem;
`;

export default function characterRace({
  area = "data",
  children,
}: {
  children: ReactNode;
  area?: string;
}) {
  return <StyledWrapper area={area}>{children}</StyledWrapper>;
}
