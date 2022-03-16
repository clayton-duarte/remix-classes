import { useNavigate } from "remix";
import styled from "@emotion/styled";

const StyledWrapper = styled.div<{ area: string }>`
  grid-area: ${({ area }) => area};
  display: grid;
  gap: 0.5rem;
`;

const StyledList = styled.ul`
  border: 1px solid ${({ theme }) => theme.primary};
  padding: 0.25rem;
  display: grid;
  gap: 0.25rem;
  margin: 0;
`;

const StyledListItem = styled.li`
  color: ${({ theme }) => theme.secondary};
  grid-template-columns: 1fr auto;
  list-style: none;
  display: grid;
  /* gap: 0.25rem; */
  margin: 0;
`;

const StyledButton = styled.button<{ active: boolean }>`
  background: ${({ theme, active }) => (active ? theme.primary : theme.white)};
  text-transform: capitalize;
  color: ${({ theme }) => theme.secondary};
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  width: 100%;
  margin: 0;
`;

const StyledSpan = styled.span`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  margin-left: 0.25rem;
  border-radius: 1rem;
  place-items: center;
  padding: 0 0.5rem;
  display: grid;
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
              {badge && <StyledSpan>{badge}</StyledSpan>}
            </StyledListItem>
          );
        })}
      </StyledList>
    </StyledWrapper>
  );
}
