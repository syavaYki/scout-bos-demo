import { useState } from 'react';
import { Button } from 'react-bulma-components';
import classNames from 'classnames';
import { ContactUsFormData } from '../../types/ContactUsForm';

type Props = {
  showState: boolean;
  onClose: () => void;
  onSubmit: (data: ContactUsFormData) => void;
};

export const ContactUsForm: React.FC<Props> = ({
  showState,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      name: name,
      email: email,
      phone: phone,
      message: message,
    });
    event.currentTarget.reset();
  }

  return (
    <div
      className={classNames('modal', {
        'is-active': showState,
      })}
    >
      <div className="modal-background" onClick={() => onClose()} />

      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Звяжіться з нами</p>

          <button className="delete" onClick={() => onClose()} />
        </header>

        <section className="modal-card-body columns is-justify-content-center m-0">
          <div className="column is-12">
            <form
              method="POST"
              className=" p-5"
              onSubmit={event => handleSubmit(event)}
              id="contavtUsForm"
            >
              <label className="is-block mb-4">
                <span className="is-block mb-2">Ваше ім&apos;я</span>

                <input
                  id="name"
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Світлана Іванівна"
                  value={name}
                  onChange={e => setName(e.currentTarget.value)}
                />
              </label>

              <label className="is-block mb-4">
                <span className="is-block mb-2">Ваш номер телефону</span>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="input"
                  placeholder="6319998876"
                  value={phone}
                  onChange={e => setPhone(e.currentTarget.value)}
                />
              </label>

              <label className="is-block mb-4">
                <span className="is-block mb-2">Ваша Email адрес</span>

                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  className="input"
                  placeholder="joe.bloggs@example.com"
                  value={email}
                  onChange={e => setEmail(e.currentTarget.value)}
                />
              </label>

              <label className="is-block mb-4">
                <span className="is-block mb-2">Повідомлення</span>
                <textarea
                  id="message"
                  name="message"
                  className="textarea"
                  rows={3}
                  placeholder="Запишіть ваше повідомлення"
                  value={message}
                  onChange={e => setMessage(e.currentTarget.value)}
                />
              </label>

              <div className="mb-4"></div>
            </form>
          </div>
        </section>
        <footer className="modal-card-foot">
          <Button type="submit" className="button px-4" form="contavtUsForm">
            Відправити
          </Button>
        </footer>
      </div>
    </div>
  );
};
