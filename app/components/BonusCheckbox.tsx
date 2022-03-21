import { useMemo } from "react";
import styled from "@emotion/styled";
import {
  BiBadge,
  BiBadgeCheck,
  BiCheckbox,
  BiCheckboxChecked,
} from "react-icons/bi";

const StyledCheckboxLabel = styled.label<{
  disabled: boolean;
  checked: boolean;
}>`
  color: ${
    ({ theme, disabled, checked }) =>
      disabled && checked
        ? theme.secondary // disabled and checked
        : disabled
        ? theme.bg // only disabled
        : checked
        ? theme.success // only checked
        : theme.primary // enabled and unchecked
  };
  font-size: 1.5rem;
  height: 1.5rem;
  width: 1.5rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

export default function BonusCheckbox({
  onChange,
  disabled,
  checked,
  badge = false,
}: {
  onChange: () => void;
  disabled: boolean;
  checked: boolean;
  badge?: boolean;
}) {
  const icon = useMemo(() => {
    if (checked) {
      if (badge) return <BiBadgeCheck />;
      return <BiCheckboxChecked />;
    }
    if (badge) return <BiBadge />;

    return <BiCheckbox />;
  }, [checked, badge]);

  return (
    <StyledCheckboxLabel disabled={disabled} checked={checked}>
      {icon}
      <HiddenInput
        onChange={onChange}
        disabled={disabled}
        checked={checked}
        type="checkbox"
      />
    </StyledCheckboxLabel>
  );
}
