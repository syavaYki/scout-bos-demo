import { useState } from 'react';
import { Box, Button, Form, Heading, Icon } from 'react-bulma-components';
import { ModalLoader } from '../../components/ModalLoader';
import { ModalError } from '../../components/ModalError';
import PasswordStrengthBar from 'react-password-strength-bar';
import { ModalSuccess } from '../../components/ModalSuccess';
import classNames from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UseSetNewPasswordAPI from '../../api/setPassword';

export const SetPasswordPage = () => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [password1Valid, setPassword1Valid] = useState(true);
  const [password2Valid, setPassword2Valid] = useState(true);
  const [setNewPassword, { loading, error, data }] = UseSetNewPasswordAPI();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const passwordUpdated = Boolean(data?.resetUserPassword?.user?.databaseId);
  const login = searchParams.get('login');
  const key = searchParams.get('key');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewPassword({
      variables: {
        key: key,
        login: login,
        password: password2,
      },
    }).catch(error2 => {
      // eslint-disable-next-line no-console
      console.error(error2);
    });
  }

  function handlePasswordValidation(password: string) {
    if (password.length > 8) {
      return true;
    }

    return false;
  }

  return (
    <>
      <ModalLoader isActive={loading} />

      <ModalError
        title="Помилка"
        body={`Виникла помилка, спробуйте знову, якщо помилка появиться знову вз'яжіться з адміністратором. Помика: ${error?.message}`}
        isActive={!!error}
      />

      <ModalSuccess
        title="Успіх"
        body="Пароль було успішно змінено"
        isActive={passwordUpdated}
        onClose={() => navigate('/')}
      />

      <Box className="has-background-primary m-3">
        <Heading className="has-text-link"> Забув Пароль</Heading>

        <Heading subtitle className="has-text-link">
          Введи Username який зареєстрований за Пластуном
        </Heading>

        <form
          method="POST"
          onSubmit={e => handleSubmit(e)}
          id="setPasswordForm"
        >
          <Form.Field>
            <Form.Label color="primary" className="has-text-link">
              Пароль
            </Form.Label>

            <Form.Control style={{ maxWidth: 400 }}>
              <Form.Input
                required
                className={classNames({
                  'is-danger': !password1Valid,
                  'is-success': password1Valid,
                })}
                value={password1}
                placeholder="password"
                type="password"
                onChange={e => {
                  const currPassword = e.target.value;

                  setPassword1Valid(handlePasswordValidation(currPassword));
                  setPassword1(currPassword);
                }}
              />

              <Icon align="left" size="small">
                <i className="fas fa-lock" />
              </Icon>

              <Icon
                align="right"
                size="small"
                className={classNames({
                  'has-text-danger': !password1Valid,
                  'has-text-success': password1Valid,
                })}
              >
                <i className="fas fa-check" />
              </Icon>

              <PasswordStrengthBar password={password1} />
              {!password1Valid && (
                <p className="has-text-danger">
                  Мінімальна довжина 8 елементів
                </p>
              )}
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label color="primary" className="has-text-link">
              Повторіть пароль
            </Form.Label>

            <Form.Control style={{ maxWidth: 400 }}>
              <Form.Input
                required
                value={password2}
                className={classNames({
                  'is-danger': !password2Valid,
                  'is-success': password2Valid,
                })}
                onChange={e => {
                  const currPassword = e.target.value;

                  setPassword2Valid(
                    handlePasswordValidation(currPassword) &&
                      currPassword === password1,
                  );
                  setPassword2(currPassword);
                }}
                placeholder="password"
                type="password"
              />

              <Icon align="left" size="small">
                <i className="fas fa-lock" />
              </Icon>

              <Icon
                align="right"
                size="small"
                className={classNames({
                  'has-text-danger': !password2Valid,
                  'has-text-success': password2Valid,
                })}
              >
                <i className="fas fa-check" />
              </Icon>
              {!password2Valid && (
                <p className="has-text-danger">Пароль має бути однаковий</p>
              )}
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Control className="is-flex mt-6">
              <Button
                color="link"
                type="submit"
                form="setPasswordForm"
                disabled={!password1 || !password1Valid || !password2Valid}
              >
                Оновити пароль
              </Button>
            </Form.Control>
          </Form.Field>
        </form>
      </Box>
    </>
  );
};
