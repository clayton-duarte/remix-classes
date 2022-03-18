import { useNavigate } from "remix";
import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

const StyledTitle = styled.h3<{ area: string }>`
  grid-area: ${({ area }) => area};
  font-size: 1.25rem;
  display: grid;
`;

const StyledList = styled.ul<{ area: string }>`
  border: 2px solid ${({ theme }) => theme.bg};
  grid-area: ${({ area }) => area};
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
  font-size: 0.825rem;
  display: grid;
  height: 1.5rem;
  width: 1.5rem;
`;

export default function Selector({
  active = "",
  title,
  area,
  data,
}: {
  data: {
    id: string;
    link: string;
    label: string;
    badge?: number;
  }[];
  area: string;
  active?: string;
  title?: string;
}) {
  const navigate = useNavigate();

  const badgeColorMap: (keyof Theme)[] = ["error", "error", "warn", "success"];

  return (
    <>
      <StyledTitle area={`${area}-title`}>{title ?? area}</StyledTitle>
      <StyledList area={`${area}-select`}>
        {data.map(({ id, link, label, badge }) => (
          <StyledListItem key={id}>
            <StyledButton onClick={() => navigate(link)} active={id === active}>
              {label}
            </StyledButton>
            {badge && <Badge color={badgeColorMap[badge]}>{badge}</Badge>}
          </StyledListItem>
        ))}
      </StyledList>
    </>
  );
}
