import { AuthLevels } from '../../types/AuthLevels';
import {
  faMoneyBill1Wave,
  faUsers,
  faUser,
  faDatabase,
  faWrench,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { ValidRoutes } from '../../types/validRoutes';
import { CRUMBS_NAME_MAP } from './breadcrumbs';

const profile = {
  name: CRUMBS_NAME_MAP[ValidRoutes.PROFILE],
  link: ValidRoutes.PROFILE,
  icon: faUser,
};
const skhoduny = {
  name: CRUMBS_NAME_MAP[ValidRoutes.SKHODYNY],
  link: ValidRoutes.SKHODYNY,
  icon: faUsers,
};
const payment = {
  name: CRUMBS_NAME_MAP[ValidRoutes.MAKE_PAYMENT],
  link: ValidRoutes.MAKE_PAYMENT,
  icon: faDollarSign,
};

const userDB = {
  name: CRUMBS_NAME_MAP[ValidRoutes.USERS_MANAGMENT],
  link: ValidRoutes.USERS_MANAGMENT,
  icon: faDatabase,
};
const plastunyDB = {
  name: CRUMBS_NAME_MAP[ValidRoutes.PLASTUNY_MANAGMENT],
  link: ValidRoutes.PLASTUNY_MANAGMENT,
  icon: faDatabase,
};
const paymemnts = {
  name: CRUMBS_NAME_MAP[ValidRoutes.PAYMENTS],
  link: ValidRoutes.PAYMENTS,
  icon: faMoneyBill1Wave,
};

const mayPaymemnts = {
  name: CRUMBS_NAME_MAP[ValidRoutes.MY_PAYMENTS],
  link: ValidRoutes.MY_PAYMENTS,
  icon: faMoneyBill1Wave,
};
const devTools = {
  name: CRUMBS_NAME_MAP[ValidRoutes.DEV_TEST],
  link: ValidRoutes.DEV_TEST,
  icon: faWrench,
};

export const ACOUNT_CONTROL_LINKS = {
  [AuthLevels.SUBSCRIBER]: [profile, payment, mayPaymemnts, skhoduny],
  [AuthLevels.PLASTUN]: [profile, payment, mayPaymemnts, skhoduny],
  [AuthLevels.VYHOVNYK]: [profile, payment, mayPaymemnts, skhoduny, plastunyDB],
  [AuthLevels.PLASTUN_SENIOR]: [
    profile,
    payment,
    mayPaymemnts,
    skhoduny,
    plastunyDB,
  ],
  [AuthLevels.ADMIN]: [
    profile,
    payment,
    mayPaymemnts,
    skhoduny,
    plastunyDB,
    userDB,
    paymemnts,
  ],
  [AuthLevels.AUTOR]: [
    profile,
    payment,
    mayPaymemnts,
    skhoduny,
    plastunyDB,
    userDB,
    paymemnts,
    devTools,
  ],
};
