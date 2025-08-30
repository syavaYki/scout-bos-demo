import { useEffect, useState } from 'react';
import classNames from 'classnames';

import style from './Calendar.module.scss';

import { Calendar as CalendarReact } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Heading, Notification } from 'react-bulma-components';
import { EventItem } from './EventItem';
import { parseCalendarEvents } from '../../utils/helperCalendar';
import { EventData } from '../../types/Calendar';
import { Loader } from '../Loader';
import { ErrorLoadAPINotice } from '../ErrorLoadAPINotice';
import { UseGetEventsAPI } from '../../api/calendar';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Calendar = () => {
  const [dateSelected, onChangeDate] = useState<Value>(new Date());
  const [events, setEvents] = useState<EventData[]>([]);
  const { loading, error, data } = UseGetEventsAPI();

  const allEvents = parseCalendarEvents(data);

  useEffect(() => {
    if (dateSelected && dateSelected instanceof Date) {
      setEvents(() => {
        return allEvents.filter(
          ev => ev.dateTime.getTime() >= dateSelected.getTime(),
        );
      });
    }
  }, [dateSelected, data, allEvents]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error) {
    return <ErrorLoadAPINotice />;
  }

  return (
    <div
      className={classNames(
        'is-flex is-flex-direction-column is-align-items-center',
        style.container,
      )}
    >
      <Heading size={2}>Календар</Heading>

      <div
        className={classNames(
          'is-flex is-flex-direction-row is-align-items-center  ',
          style.container_body,
        )}
      >
        <div className="">
          <CalendarReact
            className={style.react_calendar}
            onChange={onChangeDate}
            value={dateSelected}
          />
        </div>

        <div
          className={classNames(
            'is-flex is-flex-direction-column is-align-items-center',
            style.events_container,
          )}
        >
          {events.length > 0 ? (
            events
              .slice(-3)
              .reverse()
              .map(calEvent => {
                return (
                  <EventItem
                    key={calEvent.id}
                    date={calEvent.dateTime}
                    title={calEvent.title}
                    text={calEvent.body}
                  />
                );
              })
          ) : (
            <Notification color={'info'} light={true}>
              No Event for selected Date
            </Notification>
          )}
        </div>
      </div>
    </div>
  );
};
