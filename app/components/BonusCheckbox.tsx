import { useMemo } from "react";

import { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  BiBadge,
  BiBadgeCheck,
  BiCheckbox,
  BiCheckboxChecked,
} from "react-icons/bi";

function getColor({
  disabled,
  checked,
  theme,
}: {
  disabled: boolean;
  checked: boolean;
  theme: Theme;
}) {
  if (disabled) {
    if (checked) return theme.secondary;

    return theme.bg;
  }

  return theme.primary;
}

const StyledCheckboxLabel = styled.label<{
  disabled: boolean;
  checked: boolean;
}>`
  transition: all.3s ease;
  color: ${getColor};
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
