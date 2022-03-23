import styled from "@emotion/styled";

const ModifierLabel = styled.span<{ small?: boolean }>`
  transform: scale(${({ small }) => (small ? 1 : 1.25)});
  border: 0.125rem solid ${({ theme }) => theme.bg};
  font-family: "Cinzel", serif;
  border-radius: 1rem;
  place-items: center;
  position: relative;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  display: grid;
  height: 1.25rem;
  width: 1.25rem;
  &:before {
    position: absolute;
    font-weight: 700;
    font-size: 1rem;
    left: -0.25rem;
    content: "+";
  }
  @media all and (max-width: 768px) {
    transform: scale(1);
  }
`;

export default ModifierLabel;
