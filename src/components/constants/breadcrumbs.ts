import { ValidRoutes } from '../../types/validRoutes';

export const CRUMBS_NAME_MAP: { [key: string]: string } = {
  [ValidRoutes.HOME]: 'Дім',
  [ValidRoutes.INTAKE_APLICATION]: 'Вступ до Пласту',
  [ValidRoutes.LOGIN]: 'Увійти в кабінет',
  [ValidRoutes.FORGET_PASSWORD]: 'Forget Password',
  [ValidRoutes.SET_PASSWORD]: 'Налаштувати пароль',
  [ValidRoutes.LOGOUT]: 'Вийти',
  [ValidRoutes.LEADERS]: 'Старшина',
  [ValidRoutes.DONATE]: 'Пожертви',
  [ValidRoutes.ACCOUNT]: 'Мій Кабінет',
  [ValidRoutes.PROFILE]: 'Мій Профіль',
  [ValidRoutes.USERS_MANAGMENT]: 'База Даних Користувачів',
  [ValidRoutes.PLASTUNY_MANAGMENT]: 'База Даних Пластунів',
  [ValidRoutes.MAKE_PAYMENT]: 'Зробити Оплату',
  [ValidRoutes.SKHODYNY]: 'Сходини',
  [ValidRoutes.ATTANDANCE]: 'Відвідування',
  [ValidRoutes.CONTACT_US]: "Зв'язатись з Нами",
  [ValidRoutes.PAYMENTS]: 'Всі платежі',
  [ValidRoutes.MY_PAYMENTS]: 'Мої Оплати',
  [ValidRoutes.DEV_TEST]: 'DEV_TEST',
};
