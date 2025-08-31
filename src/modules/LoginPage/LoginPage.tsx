import React, { useEffect, useState } from 'react';
import { Box, Button, Form, Heading, Icon } from 'react-bulma-components';
import { ModalError } from '../../components/ModalError';
import LogInAPI from '../../api/login';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ModalLoader } from '../../components/ModalLoader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as authActions from '../../features/authentication';

export const LoginPage = () => {
  const [logIn, { loading, error }] = LogInAPI();
  const { loggedIn } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loggedIn === undefined) {
      dispatch(authActions.init());
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    logIn({
      variables: {
        login: userEmail,
        password: password,
      },
    }).then(res => {
      dispatch(authActions.init());
      if (res?.data?.loginWithCookies?.status === 'SUCCESS') {
        navigate('/account');
      }
    });
  }

  return (
    <>
      {loggedIn && <Navigate to="/account" />}
      <ModalLoader isActive={!!loading} />

      <ModalError
        title="Помилка"
        body="Неправильний пароль або email. Якщо данні введені правильно і Ви досі утримуєте цю помилку, будь ласка звяжіться з адміністратором"
        isActive={!!error}
      />

      <Box
        backgroundColor="primary"
        style={{ width: 400 }}
        className="form mx-auto my-6"
      >
        <Heading className="has-text-link">Please Log in.</Heading>

        <form
          method="POST"
          onSubmit={e => handleSubmit(e)}
          id="logInForm"
        >
          <Form.Field>
            <Form.Label
              color="primary"
              className="has-text-link"
            >
              Username
            </Form.Label>
            <Form.Control>
              <Form.Input
                required
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                placeholder="e.g. John Doe"
                type="text"
              />

              <Icon
                align="left"
                size="small"
              >
                <i className="fas fa-user" />
              </Icon>
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label
              color="primary"
              className="has-text-link"
            >
              Password
            </Form.Label>
            <Form.Control>
              <Form.Input
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password"
                type="password"
                status="focus"
              />

              <Icon
                align="left"
                size="small"
              >
                <i className="fa fa-lock" />
              </Icon>
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <p
              color="primary"
              className="is-size-4 has-text-danger"
            >
              Test User Name: testUserDemo
            </p>
            <p
              color="primary"
              className="is-size-4 has-text-danger"
            >
              Password: Test12345678=!
            </p>

            <Form.Control className="is-flex mt-6">
              <Button
                color="link"
                type="submit"
                form="logInForm"
              >
                Login
              </Button>

              <Link
                to={`${location.pathname}/forget-password`}
                className="has-text-link ml-auto"
              >
                Reset password
              </Link>
            </Form.Control>
          </Form.Field>
        </form>
      </Box>
    </>
  );
};
