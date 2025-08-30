import React, { useState } from 'react';
import { Box, Button, Form, Heading, Icon } from 'react-bulma-components';
import { ModalLoader } from '../../components/ModalLoader';
import { ModalError } from '../../components/ModalError';
import resetPasswordAPI from '../../api/resetPassword';

export const ForgetPasswordPage = () => {
  const [userName, setUserName] = useState('');
  const [sent, setSent] = useState(false);

  const [sendPasswordResetEmail, { loading, error }] = resetPasswordAPI();

  function resetSent() {
    setSent(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendPasswordResetEmail({
      variables: {
        username: userName.toLocaleLowerCase(),
      },
    })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setSent(true));
  }

  return (
    <>
      <ModalLoader isActive={loading} />

      <ModalError
        title="Помилка"
        body={`Виникла помилка, спробуйте знову, якщо помилка появиться знову вз'яжіться з адміністратором. Помика: ${error?.message}`}
        isActive={!!error}
        onClose={resetSent}
      />

      <Box className="has-background-primary m-3">
        {sent && !error ? (
          <Heading
            subtitle
            className="has-text-link"
          >
            Якщо користувач існує то повідомлення було відправлено на
            зарестрований email, у випадку якщо не можете знайти його перевірте
            папку SPAM.
          </Heading>
        ) : (
          <>
            <Heading className="has-text-link"> Забув Пароль</Heading>

            <Heading
              subtitle
              className="has-text-link"
            >
              Введи Username який зареєстрований за Пластуном
            </Heading>

            <form
              method="POST"
              onSubmit={e => handleSubmit(e)}
              id="forgotPasswordForm"
            >
              <Form.Field>
                <Form.Label
                  color="primary"
                  className="has-text-link"
                >
                  Username
                </Form.Label>

                <Form.Control style={{ maxWidth: 400 }}>
                  <Form.Input
                    required
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    placeholder="myUsername"
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
                <Form.Control className="is-flex mt-6">
                  <Button
                    color="link"
                    type="submit"
                    form="forgotPasswordForm"
                  >
                    Відправити оновлення паролю
                  </Button>
                </Form.Control>
              </Form.Field>
            </form>
          </>
        )}
      </Box>
    </>
  );
};
