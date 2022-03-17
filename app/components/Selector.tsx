import { useNavigate } from "remix";
import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

const StyledWrapper = styled.div<{ area: string }>`
  grid-area: ${({ area }) => area};
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
  font-size: 0.825rem;
  display: grid;
  height: 1.5rem;
  width: 1.5rem;
`;

export default function Selector({
  active = "",
  area = "",
  data,
}: {
  data: {
    id: string;
    link: string;
    label: string;
    badge?: number;
  }[];
  active?: string;
  area?: string;
}) {
  const navigate = useNavigate();

  const badgeColorMap: (keyof Theme)[] = ["error", "error", "warn", "success"];

  return (
    <StyledWrapper area={area}>
      {area && <h3>{area}</h3>}
      <StyledList>
        {data.map(({ id, link, label, badge }) => {
          const isActive = id === active;

          return (
            <StyledListItem key={id}>
              <StyledButton onClick={() => navigate(link)} active={isActive}>
                {label}
              </StyledButton>
              {badge && <Badge color={badgeColorMap[badge]}>{badge}</Badge>}
            </StyledListItem>
          );
        })}
      </StyledList>
    </StyledWrapper>
  );
}
