import { useEffect, useState } from "react";

import { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "remix";

const StyledTitle = styled.h3<{ area: string }>`
  grid-area: ${({ area }) => area};
  font-size: 1.25rem;
  display: grid;
`;

const StyledList = styled.ul<{ area: string }>`
  border: 0.125rem solid ${({ theme }) => theme.bg};
  grid-area: ${({ area }) => area};
  overflow: hidden;
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

const StyledButton = styled.button<{ isSelected: boolean }>`
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.bg : theme.white};
  color: ${({ theme }) => theme.primary};
  font-family: "Cinzel", serif;
  text-transform: capitalize;
  padding: 0.25rem 0.5rem;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  width: 100%;
  margin: 0;
  &:disabled {
    color: ${({ theme }) => theme.secondary};
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

const badgeColorMap: (keyof Theme)[] = ["error", "error", "warn", "success"];

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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 769;
  const [isOpen, setIsOpen] = useState<boolean>(!active);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(!active);
  }, [active]);

  useEffect(() => {
    const options = data.map(({ id }) => id);

    setIsOpen(!options.includes(active));
  }, [data, active]);

  return (
    <>
      <StyledTitle area={`${area}-title`}>{title ?? area}:</StyledTitle>
      <StyledList area={`${area}-select`}>
        {!isMobile || isOpen ? (
          <>
            {data.map(({ id, link, label, badge }) => (
              <StyledListItem key={id}>
                <StyledButton
                  onClick={() => navigate(link)}
                  isSelected={id === active}
                  disabled={id === active}
                >
                  {label}
                </StyledButton>
                {badge && <Badge color={badgeColorMap[badge]} />}
              </StyledListItem>
            ))}
          </>
        ) : (
          <StyledButton isSelected onClick={() => setIsOpen(true)}>
            {active}
          </StyledButton>
        )}
      </StyledList>
    </>
  );
}
