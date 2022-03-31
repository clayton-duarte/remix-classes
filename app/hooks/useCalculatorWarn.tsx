import { useEffect, useMemo } from "react";

import { BiBadge, BiCheckbox } from "react-icons/bi";

import useToaster from "~/hooks/useToaster";

export default function useCalculatorWarn({
  bonusesToSelect,
  hasSkillChoices,
  pointsToSpend,
}: {
  bonusesToSelect: number;
  hasSkillChoices: number;
  pointsToSpend: number;
}) {
  const { showToaster } = useToaster();

  const toasterContents = useMemo(() => {
    if (bonusesToSelect > 0) {
      return (
        <>
          Your have {bonusesToSelect} ability bonus to select. Please select
          your racial bonuses by clicking on the <BiBadge /> icons bellow.
        </>
      );
    }

    if (pointsToSpend > 0) {
      return (
        <>
          You have <strong>{pointsToSpend}</strong> ability points to spend.
          Please spend your ability score points by selecting the values from{" "}
          <strong>10</strong> to <strong>20</strong> bellow. Higher scores
          consume more points.
        </>
      );
    }

    if (hasSkillChoices > 0) {
      return (
        <>
          You can be trained in <strong>{hasSkillChoices}</strong> more skills.
          Please select your class bonuses by clicking on the <BiCheckbox />{" "}
          icons bellow.
        </>
      );
    }

    return null;
  }, [bonusesToSelect, hasSkillChoices, pointsToSpend]);

  useEffect(() => {
    if (toasterContents != null) {
      showToaster({
        status: "warn",
        content: toasterContents,
        title: "Action required",
        dismissible: false,
      });
    } else {
      showToaster(null);
    }
  }, [showToaster, toasterContents]);

  return null;
}
