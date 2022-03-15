import { Link } from "remix";
import styled from "@emotion/styled";

const StyledList = styled.ul(
  ({ theme }) => `
  border: 1px solid ${theme.primary};
  padding: 0.25rem 0;
  margin: 0;
  display: inline-block;
  min-width: 10%;
  max-width: 50%;
`
);

const StyledListItem = styled.li<{ active: boolean }>(
  ({ theme, active }) => `
  background: ${active ? theme.primary : theme.white};
  text-transform: capitalize;
  color: ${theme.secondary};
  padding: 0.25rem 0.5rem;
  list-style: none;
  margin: 0;
`
);

export default function Selector({
  data,
  active,
}: {
  data: {
    label: string;
    link: string;
    id: string;
  }[];
  active?: string;
}) {
  return (
    <StyledList>
      {data.map(({ id, link, label }) => {
        const isActive = id === active;
        return (
          <StyledListItem key={id} active={isActive}>
            <Link to={link}>{label}</Link>
          </StyledListItem>
        );
      })}
    </StyledList>
  );
}
