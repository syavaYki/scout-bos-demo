import { useEffect, useState } from 'react';
import { Columns, Container, Heading, Loader } from 'react-bulma-components';
import { UseGetNewsAPI } from '../../api/news';
import { parseNewsApi } from '../../utils/helperNews';
import { NewsData } from '../../types/NewsData';
import classNames from 'classnames';
import { ModalError } from '../ModalError';
import { v4 as uuidv4 } from 'uuid';

export const News = () => {
  const [news, setNews] = useState<NewsData[]>([]);
  const { loading, error, data } = UseGetNewsAPI();

  useEffect(() => setNews(parseNewsApi(data)), [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!error ? (
        <Container
          className={classNames(
            'is-flex is-flex-wrap-wrap is-justify-content-space-evenly is-align-items-stretch',
          )}
        >
          {news.map(theNews => {
            return (
              <div key={uuidv4()} className="is-flex">
                <Columns>
                  <Columns.Column>
                    <Heading> {theNews.title}</Heading>

                    <p>{theNews.body}</p>
                  </Columns.Column>
                </Columns>
                <Columns.Column size="one-fifth">
                  <img src={theNews.imgUrl || ''} />
                </Columns.Column>
              </div>
            );
          })}
        </Container>
      ) : (
        <ModalError
          title="Помилка"
          body="Сталась помилка, спробуйте ще раз, якщо помика з'явиться знову зв'яжіться з адміністратором"
          isActive={!!error}
        />
      )}

      {error && (
        <Heading size={1} color="danger">
          Помилка
        </Heading>
      )}
    </>
  );
};
