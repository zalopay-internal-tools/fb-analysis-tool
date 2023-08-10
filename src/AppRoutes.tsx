import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './common/constants';
import { DashboardPage, DetailPage, LoginPage } from './pages';

const useRouteItems = () => {
  return [
    {
      key: 'login',
      path: ROUTES.LOGIN_PATH,
      component: LoginPage,
    },
    {
      key: 'dashboard',
      path: ROUTES.DASHBOARD_PATH,
      component: DashboardPage,
    },
    {
      key: 'detail',
      path: ROUTES.DETAIL_PATH,
      component: DetailPage,
    },
  ];
};

export const AppRoutes: React.FC = () => {
  const routeItems = useRouteItems();

  return (
    <Routes>
      {routeItems.map((item, _) => (
        <Route path={item.path} key={item.key} Component={item.component} />
      ))}
    </Routes>
  );
};
