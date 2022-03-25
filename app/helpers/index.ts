import { useParams } from "remix";

import { CharBuilderChoices } from "~/helpers/dataTypes";

function getOnlyValidRouteMember(
  routeParams: CharBuilderChoices
): string[] | never[] {
  const orderedRouterParams = [
    routeParams?.characterRole,
    routeParams?.characterPower,
    routeParams?.characterClassName,
    routeParams?.characterRaceName,
  ];

  return orderedRouterParams.filter(Boolean) as string[];
}

export function useValidRouteParameters(): string[] {
  const params = useParams<CharBuilderChoices>();

  return getOnlyValidRouteMember(params);
}

export function builderDynamicRoute(routeParams: CharBuilderChoices): string {
  const validPathMembers = getOnlyValidRouteMember(routeParams);

  return `/builder/${validPathMembers.join("/")}`;
}
