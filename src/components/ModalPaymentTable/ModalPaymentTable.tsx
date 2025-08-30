import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { UsersPaymentTable } from '../UsersPaymentTable';

type Props = {
  user: User | undefined;
  isActive?: boolean;
  onClose?: () => void;
};
export const ModalPaymentTable: React.FC<Props> = ({
  user,
  isActive = true,
  onClose,
}) => {
  const [isActiveState, setIsActiveState] = useState(isActive);

  useEffect(() => setIsActiveState(isActive), [isActive]);

  function handleClose() {
    if (onClose) {
      onClose();
    }

    setIsActiveState(false);
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
          <header className="modal-card-head has-background-info">
            <p className="modal-card-title">{`Платежі від ${user?.firstName} ${user?.lastName}`}</p>

            <button
              className="delete"
              aria-label="close"
              onClick={() => handleClose()}
            />
          </header>

          <section className="modal-card-body py-3 is-multiline">
            <UsersPaymentTable user={user} compactView={true} />
          </section>

          <footer className="modal-card-foot is-flex-direction-row-reverse py-3">
            <div className="buttons">
              <button
                className="button is-rounded"
                onClick={() => handleClose()}
              >
                Close
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
