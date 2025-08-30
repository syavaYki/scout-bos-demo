import React from 'react';
import { Box } from 'react-bulma-components';
import style from './EventItem.module.scss';
import classNames from 'classnames';

type Props = {
  date: Date;
  title: string;
  text: string;
};

export const EventItem: React.FC<Props> = ({ date, title, text }) => {
  const eventDateTime =
    date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' });
  return (
    <Box
      className={classNames(
        'has-background-primary-light p-0 mx-0 mt-0 mb-2',
        style.container,
      )}
    >
      <div
        className={classNames(
          'title is-6 has-text-link has-background-primary m-0 p-2 pl-4',
          style.title,
        )}
      >
        {title}
      </div>

      <div
        className={classNames(
          'has-background-warning-light has-text-weight-medium p-2',
          style.date_time_container,
        )}
      >
        <div
          className={classNames(
            'is-flex is-flex-direction-column is-align-items-center',
            style.date,
          )}
        >
          <p>{eventDateTime}</p>
        </div>

        {/* <div className={classNames('mx-auto', style.time)}>
          {date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </div> */}
      </div>

      <div className={classNames('p-2 is-size-6', style.textBody)}>{text}</div>
    </Box>
  );
};
