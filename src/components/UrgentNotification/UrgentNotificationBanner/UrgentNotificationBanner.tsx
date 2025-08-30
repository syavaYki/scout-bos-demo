import React from 'react';
import classNames from 'classnames';
import { Box, Button, Heading, Notification } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { accessLocalStorage } from '../../../utils/accessLocalStorage';
import { LocalAccessKeys } from '../../../types/LocalAccessKeys';
import { UrgentNoticeData } from '../../../types/UrgenNotice';

type Props = {
  onModalShow: (visible: boolean) => void;
  data: UrgentNoticeData;
};
export const UrgentNotificationBanner: React.FC<Props> = ({
  onModalShow,
  data,
}) => {
  const [show, setShow] = React.useState(true);

  return (
    <>
      {show && data && (
        <Box className="has-background-danger-light mx-6 p-5">
          <Notification
            color="danger"
            light={true}
            className={classNames('is-flex is-flex-direction-column mx-0 p-0')}
          >
            <button
              className="delete"
              onClick={() => {
                setShow(false);
                accessLocalStorage.set(
                  LocalAccessKeys.URGENT_NOTICE_SHOW,
                  false,
                );
              }}
            ></button>

            <Heading className="pb-6" size={3}>
              {data.title}
            </Heading>

            <Heading subtitle size={6} className="pb-0">
              {data.shortDescription}
            </Heading>

            <p>{data.date?.toLocaleDateString()}</p>

            <Button
              to={''}
              renderAs={Link}
              className="is-align-self-flex-end"
              onClick={() => {
                setShow(false);
                onModalShow(true);
              }}
            >
              Learn More
            </Button>
          </Notification>
        </Box>
      )}
    </>
  );
};
