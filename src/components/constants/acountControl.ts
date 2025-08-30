import { AuthLevels } from '../../types/AuthLevels';
import {
  faMoneyBill1Wave,
  faUsers,
  faUser,
  faDatabase,
  faWrench,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { VALID_ROUTES } from '../../types/validRoutes';
import { CRUMBS_NAME_MAP } from './breadcrumbs';

const profile = {
  name: CRUMBS_NAME_MAP[VALID_ROUTES.PROFILE],
  link: VALID_ROUTES.PROFILE,
  icon: faUser,
};
const skhoduny = {
  name: CRUMBS_NAME_MAP[VALID_ROUTES.SKHODYNY],
  link: VALID_ROUTES.SKHODYNY,
  icon: faUsers,
};
const payment = {
  name: CRUMBS_NAME_MAP[VALID_ROUTES.MAKE_PAYMENT],
  link: VALID_ROUTES.MAKE_PAYMENT,
  icon: faDollarSign,
};

const userDB = {
  name: CRUMBS_NAME_MAP[VALID_ROUTES.USERS_MANAGMENT],
  link: VALID_ROUTES.USERS_MANAGMENT,
  icon: faDatabase,
};
const plastunyDB = {
  name: CRUMBS_NAME_MAP[VALID_ROUTES.PLASTUNY_MANAGMENT],
  link: VALID_ROUTES.PLASTUNY_MANAGMENT,
  icon: faDatabase,
};
const paymemnts = {
  name: CRUMBS_NAME_MAP[VALID_ROUTES.PAYMENTS],
  link: VALID_ROUTES.PAYMENTS,
  icon: faMoneyBill1Wave,
};

const mayPaymemnts = {
  name: CRUMBS_NAME_MAP[VALID_ROUTES.MY_PAYMENTS],
  link: VALID_ROUTES.MY_PAYMENTS,
  icon: faMoneyBill1Wave,
};
const devTools = {
  name: CRUMBS_NAME_MAP[VALID_ROUTES.DEV_TEST],
  link: VALID_ROUTES.DEV_TEST,
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
