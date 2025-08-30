import { IRowNode } from 'ag-grid-community';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bulma-components';
import { ModalChoice } from '../ModalChoice';
import { User } from '../../types/User';

type Props = {
  title?: string;
  data: IRowNode[];
  isActive?: boolean;
  onClose: () => void;
  onAction: (data: User[]) => void;
};

export const ModalBulkDataUpdate: React.FC<Props> = ({
  title = 'Оновити дані масово',
  data,
  isActive = true,
  onClose,
  onAction,
}) => {
  const [fieldData, setFieldData] = useState('');
  const [isActiveState, setIsActiveState] = useState(isActive);
  const [choiceVisible, setChoiceVisible] = useState(false);

  const [validOptions, setValidOptions] = useState<string[]>([]);
  const [fieldKey, setFieldKey] = useState('');
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => setIsActiveState(isActive), [isActive]);

  useEffect(() => {
    setFieldData('');
    setUserData(data.map(itm => itm.data));
    if (userData.length > 0 && userData[0]) {
      setValidOptions(Object.keys(userData[0]));
      setFieldKey(Object.keys(userData[0])[0] || '');
    } else {
      setValidOptions([]);
      setFieldKey('');
    }
  }, [data]);

  function handleChoice(result: boolean) {
    if (result) {
      const updatedData = userData.map(itm => {
        return { ...itm, [fieldKey]: fieldData };
      });
      onAction(updatedData);
      onClose();
      setChoiceVisible(false);
    }
  }

  return (
    <>
      <div
        className={classNames('modal', {
          'is-active': isActiveState,
        })}
      >
        <div className="modal-background"></div>
        <div className="modal-card ">
          <header className="modal-card-head has-background-danger">
            <p className="modal-card-title">{title}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => onClose()}
            ></button>
          </header>

          <section className="modal-card-body py-3 is-multiline">
            <Form.Field>
              <Form.Label>Виберіть поле для зміни</Form.Label>

              <Form.Control>
                <select
                  className="select"
                  value={fieldKey}
                  onChange={e => setFieldKey(e.target.value)}
                >
                  {validOptions.map(item => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Label>Введіть нові дані</Form.Label>

              <Form.Control>
                <Form.Input
                  type="text"
                  value={fieldData}
                  onChange={e => setFieldData(e.target.value)}
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
                Оновити
              </button>
              <button
                style={{ minWidth: '100px' }}
                className="button has-background-success is-rounded"
                onClick={() => onClose()}
              >
                Відмінити
              </button>
            </div>
          </footer>
        </div>
      </div>

      <ModalChoice
        title="Оновити Базу Даних"
        body="Ви впевнеші, що хочете оюновити базу даних?"
        isActive={choiceVisible}
        onAction={handleChoice}
      />
    </>
  );
};
