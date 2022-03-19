import { BiBadge, BiBadgeCheck } from "react-icons/bi";
import styled from "@emotion/styled";

const StyledCheckboxLabel = styled.label<{
  disabled: boolean;
  checked: boolean;
}>`
  color: ${({ theme, disabled, checked }) =>
    checked ? theme.success : disabled ? theme.bg : theme.primary};
  font-size: 1.5rem;
  height: 1.5rem;
  width: 1.5rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

export default function RacialBonusCheckbox({
  onChange,
  disabled,
  checked,
}: {
  onChange: () => void;
  disabled: boolean;
  checked: boolean;
}) {
  return (
    <StyledCheckboxLabel disabled={disabled} checked={checked}>
      {checked ? <BiBadgeCheck /> : <BiBadge />}
      <HiddenInput
        onChange={onChange}
        disabled={disabled}
        checked={checked}
        type="checkbox"
      />
    </StyledCheckboxLabel>
  );
}
