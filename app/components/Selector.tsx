import { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { useNavigate, useTransition } from "remix";

import { Colors, StatusColors } from "~/helpers/types";

const StyledTitle = styled.h3<{ area: string }>`
  grid-area: ${({ area }) => area};
  font-size: 1.25rem;
  display: grid;
`;

const StyledList = styled.ul<{
  isOpen: boolean;
  items: number;
  area: string;
}>`
  border: 2px solid ${({ theme }) => theme.bg};
  grid-area: ${({ area }) => area};
  transition: 0.3s ease;
  overflow: hidden;
  display: grid;
  padding: 2px;
  gap: 0.25rem;
  margin: 0;
  max-height: ${({ isOpen, items }) =>
    isOpen && items > 0
      ? `calc(${items} * (1.2 * 1rem + .5rem + .25rem))`
      : "calc(1.2 * 1rem + .5rem)"};
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

const StyledButton = styled.button<{ isActive: boolean; isLoading: boolean }>`
  background: ${({ theme, isActive }) => (isActive ? theme.bg : theme.white)};
  opacity: ${({ isLoading, isActive }) => (!isActive && isLoading ? 0 : 1)};
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

const Badge = styled.span<{ color: Colors }>`
  color: ${({ theme }) => theme.white};
  border-top: 0.25rem solid ${({ theme, color }) => theme[color]};
  border-right: 0.25rem solid ${({ theme, color }) => theme[color]};
  border-bottom: 0.25rem solid transparent;
  border-left: 0.25rem solid transparent;
  position: absolute;
  right: 0;
  top: 0;
`;

function getBadgeColor(matches: number): StatusColors {
  if (matches < 1) {
    return "error";
  }

  if (matches < 2) {
    return "warn";
  }

  return "success";
}

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
  const [isOpen, setIsOpen] = useState<boolean>(!active);
  const transition = useTransition();
  const navigate = useNavigate();
  const isLoading = transition.state !== "idle";
  const justOneOption = data.length === 1;

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
      <StyledList area={`${area}-select`} items={data.length} isOpen={isOpen}>
        {data
          .sort((a, b) => Number(b.id === active) - Number(a.id === active))
          .map(({ id, link, label, badge }) => {
            const isActive = id === active;

            return (
              <StyledListItem key={id}>
                <StyledButton
                  onClick={() => {
                    if (isActive) {
                      setIsOpen(!isOpen);
                    } else {
                      navigate(link);
                    }
                  }}
                  disabled={isLoading || justOneOption}
                  isLoading={isLoading}
                  isActive={isActive}
                >
                  {isLoading ? "loading..." : label}
                </StyledButton>
                {badge && <Badge color={getBadgeColor(badge)} />}
              </StyledListItem>
            );
          })}
        {/* 
        <StyledButton
          onClick={() => setIsOpen(true)}
          disabled={isLoading}
          ref={buttonRef}
          isSelected
        >
          {isLoading ? "loading..." : active}
        </StyledButton> */}
      </StyledList>
    </>
  );
}
