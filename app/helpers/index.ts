import { useParams } from "remix";

import { RouteParams } from "~/helpers/dataTypes";

function getOnlyValidRouteMember(routeParams: RouteParams): string[] | never[] {
  const orderedRouterParams = [
    routeParams?.characterRole,
    routeParams?.characterPower,
    routeParams?.characterClassName,
    routeParams?.characterRaceName,
  ];
  return orderedRouterParams.filter(Boolean) as string[];
}

export function useValidRouteParameters(): string[] {
  const params = useParams<RouteParams>();
  return getOnlyValidRouteMember(params);
}

export function buildDynamicRoute(routeParams: RouteParams): string {
  const validPathMembers = getOnlyValidRouteMember(routeParams);
  return `/${validPathMembers.join("/")}`;
}
