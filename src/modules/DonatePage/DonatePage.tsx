import React from 'react';
import style from './DonatePage.module.scss';
import { Columns, Container, Heading } from 'react-bulma-components';
import PayPalComponent from '../../components/PayPalComponent/PayPalComponent';

export const DonatePage = () => {
  return (
    <Container className="is-max-desktop p-5">
      <Container className="pb-3 ">
        <Heading
          size={1}
          spaced
        >
          Підтримай пласт
        </Heading>
        <Columns>
          <Columns.Column>
            <p className="pr-3">
              Дорогі друзі! Ваша підтримка є надзвичайно важливою для розвитку
              Пласту, найбільшої скаутської організації України, особливо зараз,
              коли наша країна переживає важкі часи війни. Завдяки вашим
              пожертвам ми зможемо не тільки організувати більше таборів,
              походів та освітніх програм для молоді, але й допомогти нашим
              волонтерам, які щодня ризикують своїм життям, допомагаючи
              постраждалим від війни. Ваші внески допоможуть забезпечити їх
              необхідним спорядженням, медикаментами та іншими ресурсами, щоб
              вони могли продовжувати свою благородну справу. Разом ми творимо
              зміни! Дякуємо за вашу щедрість та підтримку!
            </p>
          </Columns.Column>

          <Columns.Column
            size={'one-third'}
            className="is-flex is-justify-content-center"
          >
            <img
              src="\imgs\Temp\ukraine.png"
              className={style.bt_ukraine_image}
            />
          </Columns.Column>
        </Columns>
      </Container>

      <Container className={style.bt_container}>
        <PayPalComponent />
      </Container>
    </Container>
  );
};
