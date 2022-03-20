import styled from "@emotion/styled";

const ModifierLabel = styled.span`
  border: 0.125rem solid ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.secondary};
  font-family: "Cinzel", serif;
  transform: scale(1.5);
  border-radius: 1rem;
  place-items: center;
  position: relative;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.25;
  display: grid;
  height: 1rem;
  width: 1rem;
  @media all and (max-width: 768px) {
    transform: scale(1.25);
  }
  &:before {
    position: absolute;
    font-size: 1rem;
    left: -0.25rem;
    content: "+";
  }
`;

export default ModifierLabel;
