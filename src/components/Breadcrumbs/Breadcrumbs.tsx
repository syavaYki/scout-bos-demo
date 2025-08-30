import React from 'react';
import { Breadcrumb, Container } from 'react-bulma-components';
import { useLocation } from 'react-router-dom';
import { CRUMBS_NAME_MAP } from '../constants/breadcrumbs';
import style from './Breadcrumbs.module.scss';
import classNames from 'classnames';

export const Breadcrumbs = () => {
  const location = useLocation();
  let curLocation = '';
  const locationArr = location.pathname
    .split('/')
    .filter(crumb => crumb !== '');

  if (locationArr.length === 0) {
    return <></>;
  }
  return (
    <Container className="is-hidden-touch mb-4">
      <Breadcrumb
        size="medium"
        className="has-text-link"
      >
        <Breadcrumb.Item key="home">
          <a
            href="/"
            className={classNames(
              'has-text-primary px-2 mx-2',
              style.crumb,
              style.custom_hover,
            )}
          >
            {CRUMBS_NAME_MAP.home}
          </a>
        </Breadcrumb.Item>

        {locationArr.map((crumb: string, index: number) => {
          curLocation = curLocation + `/${crumb}`;
          const crumbName = CRUMBS_NAME_MAP[crumb] || crumb;
          return (
            <Breadcrumb.Item
              key={crumb}
              active={locationArr.length - 1 === index}
            >
              <a
                href={curLocation}
                className={classNames(
                  'has-text-primary px-2 mx-2',
                  style.crumb,
                  style.custom_hover,
                )}
              >
                {crumbName}
              </a>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </Container>
  );
};
