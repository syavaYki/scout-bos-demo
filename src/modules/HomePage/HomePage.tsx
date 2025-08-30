import style from './HomePage.module.scss';
import 'react-calendar/dist/Calendar.css';
import { Container, Heading, Section } from 'react-bulma-components';
import { MainPhotoSwiper } from '../../components/MainPhotoSwiper';
import { AboutSection } from './AboutSection';
import classNames from 'classnames';
import { Calendar } from '../../components/Calendar';
import { LatestActivities } from '../../components/LatestActivities';
import { UrgentNotification } from '../../components/UrgentNotification';
import { News } from '../../components/News';
import { SubscribeNews } from '../../components/SubscribeNews';

export const HomePage = () => {
  return (
    <Container className="px-3">
      <h1 style={{ position: 'absolute', visibility: 'hidden' }}>
        Test Deploy 2.0.0
      </h1>

      <UrgentNotification />

      <Heading className="m-0 mt-3 p-0" textAlign="center" size={1}>
        Пласт Лінденхурст
      </Heading>

      <Section className={classNames('px-0', style.main_photo_swiper)}>
        <MainPhotoSwiper />
      </Section>

      <Section className={classNames('px-0', style.about_section)}>
        <AboutSection />
      </Section>

      <Section
        className={classNames('px-0', style.latest_photo_swiper_container)}
      >
        <LatestActivities />
      </Section>

      <Section className={classNames('px-0', style.news_swiper_container)}>
        <Heading size={2}>Новини</Heading>

        <div className={classNames(style.news_swiper)}>
          <News />
        </div>
      </Section>

      <Section className={classNames('px-0', style.calendar_container)}>
        <Calendar />
      </Section>

      <Section>
        <SubscribeNews />
      </Section>
    </Container>
  );
};
