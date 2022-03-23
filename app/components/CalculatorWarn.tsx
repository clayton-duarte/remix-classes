import styled from "@emotion/styled";
import { BiBadge, BiCheckbox } from "react-icons/bi";

import DataPanel from "~/components/DataPanel";

const StyledPanel = styled(DataPanel)`
  position: sticky;
  bottom: 0;
`;

export default function CalculatorWarn({
  bonusesToSelect,
  hasSkillChoices,
  pointsToSpend,
}: {
  bonusesToSelect: number;
  hasSkillChoices: number;
  pointsToSpend: number;
}) {
  if (bonusesToSelect > 0) {
    return (
      <StyledPanel color="warn" title="action">
        Your have {bonusesToSelect} ability bonus to select. Please select your
        racial bonuses by clicking on the <BiBadge /> icons bellow.
      </StyledPanel>
    );
  }

  if (pointsToSpend > 0) {
    return (
      <StyledPanel color="warn" title="action">
        You have <strong>{pointsToSpend}</strong> ability points to spend.
        Please spend your ability score points by selecting the values from{" "}
        <strong>10</strong> to <strong>20</strong> bellow. Higher scores consume
        more points.
      </StyledPanel>
    );
  }

  if (hasSkillChoices > 0) {
    return (
      <StyledPanel color="warn" title="action">
        You can be trained in <strong>{hasSkillChoices}</strong> more skills.
        Please select your class bonuses by clicking on the <BiCheckbox /> icons
        bellow.
      </StyledPanel>
    );
  }

  return (
    <StyledPanel color="success" title="Done">
      You are all set.
    </StyledPanel>
  );
}
