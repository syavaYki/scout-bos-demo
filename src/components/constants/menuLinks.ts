import {
  faUser,
  faCircleQuestion,
  faDoorOpen,
  faCampground,
  faPeopleGroup,
  faEnvelope,
  faHouseUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
// import { faCoffee, faEy } from '@fortawesome/free-brands-svg-icons';
// import { faCoffee, faEy } from '@fortawesome/free-regular-svg-icons';

export const MENU_LINKS_NO_AUTH = [
  {
    name: 'Увійти в кабінет',
    icon: faUser,
    link: '/login',
  },
  {
    name: 'Про Пласт',
    icon: faCircleQuestion,
    link: 'https://plastusa.org/about/',
  },
  {
    name: 'Вступ до Пласту',
    icon: faDoorOpen,
    link: '/intake-application',
  },
  {
    name: 'Табори та Вишколи',
    icon: faCampground,
    link: 'https://plastusa.org/tabir/what-is-tabir/',
  },
  {
    name: 'Станична Старшина',
    icon: faPeopleGroup,
    link: '/leaders',
  },
  {
    name: 'Звязатись з Нами',
    icon: faEnvelope,
    link: '/contact-us',
  },
];

export const MENU_LINKS_AUTH = [
  {
    name: 'Мій Кабінет',
    icon: faHouseUser,
    link: '/account',
  },
  {
    name: 'Про Пласт',
    icon: faCircleQuestion,
    link: 'https://plastusa.org/about/',
  },
  {
    name: 'Вступ до Пласту',
    icon: faDoorOpen,
    link: '/intake-application',
  },
  {
    name: 'Табори та Вишколи',
    icon: faCampground,
    link: 'https://plastusa.org/tabir/what-is-tabir/',
  },
  {
    name: 'Станична Старшина',
    icon: faPeopleGroup,
    link: '/leaders',
  },
  {
    name: 'Звязатись з Нами',
    icon: faEnvelope,
    link: '/contact-us',
  },
  {
    name: 'Вийти',
    icon: faRightFromBracket,
    link: '/logout',
  },
];
