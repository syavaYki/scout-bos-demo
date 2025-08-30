import classNames from 'classnames';
import React from 'react';
import { Heading } from 'react-bulma-components';
import { UrgentNoticeData } from '../../../types/UrgenNotice';
import { accessLocalStorage } from '../../../utils/accessLocalStorage';
import { LocalAccessKeys } from '../../../types/LocalAccessKeys';

type Props = {
  data: UrgentNoticeData;
};

export const UrgentNotificationModal: React.FC<Props> = ({ data }) => {
  const [show, setShow] = React.useState(true);
  return (
    <div
      className={classNames('modal', {
        'is-active': show,
      })}
    >
      <div className="modal-background" />

      <div className="modal-card ">
        <header className="modal-card-head has-background-danger-light">
          <p className="modal-card-title">{data.title}</p>
          <button
            className="delete"
            onClick={() => {
              setShow(false);
              accessLocalStorage.set(LocalAccessKeys.URGENT_NOTICE_SHOW, false);
            }}
          />
        </header>

        <section className="modal-card-body is-flex m-0 ">
          <div className="modal-content">
            <Heading
              subtitle
              size={6}
            >
              {data.body}
            </Heading>
            <p>{data.date?.toLocaleDateString()}</p>
          </div>
        </section>
      </div>
    </div>
  );
};
