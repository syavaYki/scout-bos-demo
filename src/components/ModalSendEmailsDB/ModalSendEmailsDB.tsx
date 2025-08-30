import { useEffect, useState } from 'react';
import UseSendEmailAPI from '../../api/sendEmail';
import { ModalChoice } from '../ModalChoice';
import classNames from 'classnames';
import { Form } from 'react-bulma-components';
import { InfoErrorModal } from '../UserTable/InfoErrorModal';
import { ModalLoader } from '../ModalLoader';

type Props = {
  emailArr: string[];
  isActive?: boolean;
  onClose?: () => void;
};

export const ModalSendEmailsDB: React.FC<Props> = ({
  emailArr,
  isActive = true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose = () => {},
}) => {
  const [sendEmail, { loading }] = UseSendEmailAPI();
  const [error, setError] = useState<string[]>([]);
  const [successInfo, setSuccessInfo] = useState<string[]>([]);
  const [isActiveState, SetIsActiveState] = useState(isActive);
  const [emails, setEmails] = useState(emailArr);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [choiceVisible, setChoiceVisible] = useState(false);

  useEffect(() => {
    setSubject('');
    setBody('');

    SetIsActiveState(isActive);
  }, [isActive]);
  useEffect(() => setEmails(emailArr), [emailArr]);

  async function handleChoice(result: boolean) {
    const errorArr: string[] = [];
    const infoArr: string[] = [];

    if (result) {
      const allEmailSend = emails.map(async email => {
        await sendEmail({
          variables: {
            to: email,
            subject: subject,
            body: body,
          },
        })
          .then(() =>
            infoArr.push(`Успішно відправлено імейл на адресу ${email}`),
          )
          .catch(() =>
            errorArr.push(`Не вдалось відправити імейл на адресу ${email}`),
          );
      });

      await Promise.all(allEmailSend);
      setSuccessInfo(() => infoArr);
      setError(() => errorArr);

      setChoiceVisible(false);
    }

    setChoiceVisible(false);
  }

  return (
    <>
      <div
        className={classNames('modal', {
          'is-active': isActiveState,
        })}
      >
        <div className="modal-card ">
          <header className="modal-card-head has-background-danger">
            <p className="modal-card-title">Масова відправка імейлів</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => onClose()}
            ></button>
          </header>

          <section className="modal-card-body py-3 is-multiline">
            <Form.Field>
              <Form.Label>Subject:</Form.Label>

              <Form.Control>
                <Form.Input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Control>
                <Form.Textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                />
              </Form.Control>
            </Form.Field>
          </section>

          <footer className="modal-card-foot is-flex-direction-row-reverse py-3">
            <div className="buttons">
              <button
                style={{ minWidth: '100px' }}
                className="button has-background-danger is-rounded"
                onClick={() => setChoiceVisible(true)}
              >
                Відправити
              </button>
            </div>
          </footer>
        </div>
      </div>

      <ModalChoice
        title="Відправити імейли?"
        body="Ви впевнеші, що хочете відправити масові імейли?"
        isActive={choiceVisible}
        onAction={handleChoice}
      />
      <InfoErrorModal
        isActive={error.length > 0}
        title="Помилка"
        body={error}
        type="error"
        onClose={() => {
          setError([]);
          onClose();
        }}
      />

      <InfoErrorModal
        isActive={successInfo.length > 0}
        title="Успішно"
        body={successInfo}
        type="info"
        onClose={() => {
          setSuccessInfo([]);
          onClose();
        }}
      />

      <ModalLoader isActive={loading} />
    </>
  );
};
