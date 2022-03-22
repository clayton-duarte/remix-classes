import { BiBadge, BiCheckbox } from "react-icons/bi";

import DataPanel from "~/components/DataPanel";

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
      <DataPanel color="warn" area="warn" title="action">
        Your have {bonusesToSelect} ability bonus to select. Please select your
        racial bonuses by clicking on the <BiBadge /> icons bellow.
      </DataPanel>
    );
  }

  if (pointsToSpend > 0) {
    return (
      <DataPanel color="warn" area="warn" title="action">
        You have <strong>{pointsToSpend}</strong> ability points to spend.
        Please spend your ability score points by selecting the values from{" "}
        <strong>10</strong> to <strong>20</strong> bellow. Higher scores consume
        more points.
      </DataPanel>
    );
  }

  if (hasSkillChoices > 0) {
    return (
      <DataPanel color="warn" area="warn" title="action">
        You can be trained in <strong>{hasSkillChoices}</strong> more skills.
        Please select your class bonuses by clicking on the <BiCheckbox /> icons
        bellow.
      </DataPanel>
    );
  }

  return (
    <DataPanel color="success" area="warn" title="Done">
      You are all set.
    </DataPanel>
  );
}
