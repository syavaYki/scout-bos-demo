import { ApolloProvider } from '@apollo/client';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { HomePage } from '../HomePage';
import App from '../App/App';
import client from '../../lib/apollos';
import { ContactUsPage } from '../ContactUsPage/ContactUsPage';
import { LoginPage } from '../LoginPage/LoginPage';
import { IntakeFormPage } from '../IntakeFormPage/IntakeFormPage';
import { LeadersPage } from '../LeadersPage';
import { DonatePage } from '../DonatePage/DonatePage';
import { ProtectedRoute } from '../../components/ProtectedRoute/ProtectedRoute';
import LogOutPage from '../LogOutPage/LogOutPage';
import { UserManagmentPage } from '../UsersManagmentPage';
import { MyPaymentPage } from '../MyPaymentPage';
import { ShodynyPage } from '../ShodynyPage';
import { AttandancePage } from '../AttendancePage';
import { AttandanceSheetPage } from '../AttandanceSheetPage';
import { AccountMainPage } from '../AccountMainPage';
import { AccountProfilePage } from '../AccountProfilePage';
import { ForgetPasswordPage } from '../ForgetPasswordPage';
import { SetPasswordPage } from '../SetPasswordPage';
import { PlastunyManagmentPage } from '../PlastunyManagmentPage';
import { MyPayments } from '../MyPayments';
import { ValidRoutes } from '../../types/validRoutes';

export const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route
              path={ValidRoutes.HOME}
              element={<Navigate to="/" replace />}
            />

            <Route path={ValidRoutes.LOGIN} element={<LoginPage />} />

            <Route
              path={ValidRoutes.FORGET_PASSWORD}
              element={<ForgetPasswordPage />}
            />

            <Route
              path={ValidRoutes.SET_PASSWORD}
              element={<SetPasswordPage />}
            />
            <Route path={ValidRoutes.LOGOUT} element={<LogOutPage />} />

            <Route
              path={ValidRoutes.INTAKE_APLICATION}
              element={<IntakeFormPage />}
            />

            <Route path={ValidRoutes.LEADERS} element={<LeadersPage />} />

            <Route path={ValidRoutes.DONATE} element={<DonatePage />} />

            <Route element={<ProtectedRoute />}>
              <Route path={ValidRoutes.ACCOUNT}>
                <Route index element={<AccountMainPage />} />

                <Route
                  path={ValidRoutes.PROFILE}
                  element={<AccountProfilePage />}
                />

                <Route
                  path={ValidRoutes.USERS_MANAGMENT}
                  element={<UserManagmentPage />}
                />

                <Route
                  path={ValidRoutes.PLASTUNY_MANAGMENT}
                  element={<PlastunyManagmentPage />}
                />

                <Route
                  path={ValidRoutes.MAKE_PAYMENT}
                  element={<MyPaymentPage />}
                />

                <Route
                  path={ValidRoutes.MY_PAYMENTS}
                  element={<MyPayments />}
                />

                <Route path={ValidRoutes.SKHODYNY}>
                  <Route index element={<ShodynyPage />} />

                  <Route path={ValidRoutes.ATTANDANCE}>
                    <Route index element={<AttandancePage />} />

                    <Route path=":sheetId" element={<AttandanceSheetPage />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path={ValidRoutes.CONTACT_US} element={<ContactUsPage />} />

          <Route path="*" element={<p>PAGE NOT FOUND</p>} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};
