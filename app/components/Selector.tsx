import { useNavigate } from "remix";
import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

const StyledTitle = styled.h3<{ area: string }>`
  grid-area: ${({ area }) => area};
  margin-bottom: -0.5rem;
  font-size: 1.25rem;
  display: grid;
`;

const StyledList = styled.ul<{ area: string }>`
  border: 0.125rem solid ${({ theme }) => theme.bg};
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
  position: relative;
  list-style: none;
  display: grid;
  margin: 0;
`;

const StyledButton = styled.button`
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.primary};
  text-transform: capitalize;
  padding: 0.25rem 0.5rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  width: 100%;
  margin: 0;
  &:disabled {
    color: ${({ theme }) => theme.secondary};
    background: ${({ theme }) => theme.bg};
    cursor: default;
  }
`;

const Badge = styled.span<{ color: keyof Theme }>`
  color: ${({ theme }) => theme.white};
  border-top: 0.25rem solid ${({ theme, color }) => theme[color]};
  border-right: 0.25rem solid ${({ theme, color }) => theme[color]};
  border-bottom: 0.25rem solid transparent;
  border-left: 0.25rem solid transparent;
  position: absolute;
  right: 0;
  top: 0;
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
            <StyledButton
              onClick={() => navigate(link)}
              disabled={id === active}
            >
              {label}
            </StyledButton>
            {badge && <Badge color={badgeColorMap[badge]} />}
          </StyledListItem>
        ))}
      </StyledList>
    </>
  );
}
