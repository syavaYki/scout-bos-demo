import React from 'react';
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
import PaymentsPage from '../PaymensPage/PaymensPage';
import { PlastunyManagmentPage } from '../PlastunyManagmentPage';
import { MyPayments } from '../MyPayments';
import { VALID_ROUTES } from '../../types/validRoutes';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export const Root = () => {
  const initialOptions = {
    clientId:
      'AXL6imeA-QdwTYiNDpfuRBxNRDOTm0cdIamRNRlGjxFZxLwgpbbsiHHLFmGVT3Np12BuiUVSpk6pHXSO',
    'enable-funding': 'venmo,card',
    // 'disable-funding': 'paylater',
    'disable-funding': 'card',
    'data-sdk-integration-source': 'integrationbuilder_sc',
  };

  return (
    <ApolloProvider client={client}>
      <PayPalScriptProvider options={initialOptions}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<App />}
            >
              <Route
                index
                element={<HomePage />}
              />

              <Route
                path={VALID_ROUTES.HOME}
                element={
                  <Navigate
                    to="/"
                    replace
                  />
                }
              />

              <Route
                path={VALID_ROUTES.LOGIN}
                element={<LoginPage />}
              />

              <Route
                path={VALID_ROUTES.FORGET_PASSWORD}
                element={<ForgetPasswordPage />}
              />

              <Route
                path={VALID_ROUTES.SET_PASSWORD}
                element={<SetPasswordPage />}
              />
              <Route
                path={VALID_ROUTES.LOGOUT}
                element={<LogOutPage />}
              />

              <Route
                path={VALID_ROUTES.INTAKE_APLICATION}
                element={<IntakeFormPage />}
              />

              <Route
                path={VALID_ROUTES.LEADERS}
                element={<LeadersPage />}
              />

              <Route
                path={VALID_ROUTES.DONATE}
                element={<DonatePage />}
              />

              <Route element={<ProtectedRoute />}>
                <Route path={VALID_ROUTES.ACCOUNT}>
                  <Route
                    index
                    element={<AccountMainPage />}
                  />

                  <Route
                    path={VALID_ROUTES.PROFILE}
                    element={<AccountProfilePage />}
                  />

                  <Route
                    path={VALID_ROUTES.USERS_MANAGMENT}
                    element={<UserManagmentPage />}
                  />

                  <Route
                    path={VALID_ROUTES.PLASTUNY_MANAGMENT}
                    element={<PlastunyManagmentPage />}
                  />

                  <Route
                    path={VALID_ROUTES.MAKE_PAYMENT}
                    element={<MyPaymentPage />}
                  />

                  <Route
                    path={VALID_ROUTES.MY_PAYMENTS}
                    element={<MyPayments />}
                  />

                  <Route path={VALID_ROUTES.SKHODYNY}>
                    <Route
                      index
                      element={<ShodynyPage />}
                    />

                    <Route path={VALID_ROUTES.ATTANDANCE}>
                      <Route
                        index
                        element={<AttandancePage />}
                      />

                      <Route
                        path=":sheetId"
                        element={<AttandanceSheetPage />}
                      />
                    </Route>
                  </Route>

                  <Route
                    path={VALID_ROUTES.PAYMENTS}
                    element={<PaymentsPage />}
                  />
                </Route>
              </Route>
            </Route>

            <Route
              path={VALID_ROUTES.CONTACT_US}
              element={<ContactUsPage />}
            />

            <Route
              path="*"
              element={<p>PAGE NOT FOUND</p>}
            />
          </Routes>
        </Router>
      </PayPalScriptProvider>
    </ApolloProvider>
  );
};
