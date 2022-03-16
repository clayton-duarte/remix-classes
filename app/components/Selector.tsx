import { useNavigate } from "remix";
import styled from "@emotion/styled";

const StyledWrapper = styled.div<{ area: string }>`
  grid-area: ${({ area }) => area};
`;

const StyledList = styled.ul`
  border: 1px solid ${({ theme }) => theme.primary};
  padding: 0.25rem 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  color: ${({ theme }) => theme.secondary};
  list-style: none;
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
export default function Selector({
  active = "",
  area = "",
  data,
}: {
  data: {
    label: string;
    link: string;
    id: string;
  }[];
  active?: string;
  area?: string;
}) {
  const navigate = useNavigate();

  return (
    <StyledWrapper area={area}>
      {area ?? <h3>{area}</h3>}
      <StyledList>
        {data.map(({ id, link, label }) => {
          const isActive = id === active;
          return (
            <StyledListItem key={id}>
              <StyledButton onClick={() => navigate(link)} active={isActive}>
                {label}
              </StyledButton>
            </StyledListItem>
          );
        })}
      </StyledList>
    </StyledWrapper>
  );
}
