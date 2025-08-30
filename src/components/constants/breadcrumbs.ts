import { VALID_ROUTES } from '../../types/validRoutes';

export const CRUMBS_NAME_MAP: { [key: string]: string } = {
  [VALID_ROUTES.HOME]: 'Дім',
  [VALID_ROUTES.INTAKE_APLICATION]: 'Вступ до Пласту',
  [VALID_ROUTES.LOGIN]: 'Увійти в кабінет',
  [VALID_ROUTES.FORGET_PASSWORD]: 'Forget Password',
  [VALID_ROUTES.SET_PASSWORD]: 'Налаштувати пароль',
  [VALID_ROUTES.LOGOUT]: 'Вийти',
  [VALID_ROUTES.LEADERS]: 'Старшина',
  [VALID_ROUTES.DONATE]: 'Пожертви',
  [VALID_ROUTES.ACCOUNT]: 'Мій Кабінет',
  [VALID_ROUTES.PROFILE]: 'Мій Профіль',
  [VALID_ROUTES.USERS_MANAGMENT]: 'База Даних Користувачів',
  [VALID_ROUTES.PLASTUNY_MANAGMENT]: 'База Даних Пластунів',
  [VALID_ROUTES.MAKE_PAYMENT]: 'Зробити Оплату',
  [VALID_ROUTES.SKHODYNY]: 'Сходини',
  [VALID_ROUTES.ATTANDANCE]: 'Відвідування',
  [VALID_ROUTES.CONTACT_US]: "Зв'язатись з Нами",
  [VALID_ROUTES.PAYMENTS]: 'Всі платежі',
  [VALID_ROUTES.MY_PAYMENTS]: 'Мої Оплати',
  [VALID_ROUTES.DEV_TEST]: 'DEV_TEST',
};
