import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

import { Glossary } from "~/helpers/types";

const StyledWrapper = styled.div<{ area: string }>`
  grid-area: ${({ area }) => area};
  margin-top: 2rem;
  display: grid;
  gap: 0.5rem;
`;

const StyledList = styled.ul`
  border: 1px solid ${({ theme }) => theme.bg};
  padding: 0.25rem;
  display: grid;
  gap: 0.25rem;
  margin: 0;
`;

const StyledListItem = styled.li`
  color: ${({ theme }) => theme.warn};
  grid-template-columns: 1fr auto;
  align-items: center;
  list-style: none;
  display: grid;
  margin: 0;
`;

const StyledButton = styled.button<{ active: boolean }>`
  background: ${({ theme, active }) => (active ? theme.bg : theme.white)};
  color: ${({ theme }) => theme.primary};
  text-transform: capitalize;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  width: 100%;
  margin: 0;
`;

const Badge = styled.span<{ color: keyof Theme }>`
  background: ${({ theme, color }) => theme[color]};
  color: ${({ theme }) => theme.white};
  margin-left: 0.25rem;
  border-radius: 1rem;
  place-items: center;
  font-size: 0.75rem;
  display: grid;
  height: 1.5rem;
  width: 1.5rem;
`;

export default function DataPanel({
  glossary,
  area = "data",
}: {
  glossary: Glossary;
  area?: string;
}) {
  return <StyledWrapper area={area}>{glossary.description}</StyledWrapper>;
}
