import { useState } from 'react';
import classNames from 'classnames';
import { Block, Box, Button, Container, Heading } from 'react-bulma-components';
import { submitNewSubscriber } from '../../api/newsSubscriber';
import { ModalError } from '../ModalError';
import { ModalSuccess } from '../ModalSuccess';

export function SubscribeNews() {
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await submitNewSubscriber(email);

      if (response.data.status !== 'mail_sent') {
        setShowError(true);
      } else {
        setShowSuccess(true);
      }
    } catch (error) {
      setShowError(true);
    }

    setEmail('');
  };

  return (
    <>
      <ModalError
        title="Виникла помилка!"
        body="Перевірте email і спробуйте знову, якщо помилка повторюється звяжіться з адміністратором"
        isActive={showError}
      />

      <ModalSuccess
        title="Успішно додано Ваш email."
        body="Дякую ми уснішно додали Ваш email до підписки на новини сайту."
        isActive={showSuccess}
      />

      <Container>
        <Box className="has-background-primary p-2">
          <Heading
            size={4}
            className="has-text-link has-text-centered mt-2 mb-2"
          >
            Підпишіться на новини від Пласту
          </Heading>

          <Block className={classNames('p-0')}>
            <p className="has-text-link has-text-centered m-0">
              Першими дізнавайтесь про новини та отримуйте запрошення на події
              та читайте статті від кураторів
            </p>

            <div className="columns is-justify-content-center py-4">
              <div className="column is-9-tablet is-6-desktop is-7-widescreen is-6-fullh">
                <form
                  method="POST"
                  className="is-flex p-2"
                  onSubmit={e => handleSubmit(e)}
                >
                  <input
                    required
                    type="email"
                    className="input"
                    placeholder="joe.bloggs@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />

                  <Button type="submit" className="button px-3 ml-5">
                    Підписатись
                  </Button>
                </form>
              </div>
            </div>
          </Block>
        </Box>
      </Container>
    </>
  );
}
