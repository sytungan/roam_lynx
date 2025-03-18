import { useCallback } from '@lynx-js/react';
import { useAtom } from 'jotai';
import type { Route } from '../navigation/index.js';
import { currentRouteAtom, routeParamsAtom } from '../navigation/index.js';

export const useNavigation = () => {
  const [currentRoute, setCurrentRoute] = useAtom(currentRouteAtom);
  const [params, setParams] = useAtom(routeParamsAtom);

  const navigate = useCallback((route: Route, newParams: Record<string, any> = {}) => {
    setCurrentRoute(route);
    setParams(newParams);
  }, [setCurrentRoute, setParams]);

  return {
    currentRoute,
    params,
    navigate
  };
}; 