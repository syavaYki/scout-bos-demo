import { useCallback, useEffect } from 'react';
import style from './Header.module.scss';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { Container, Navbar, Button } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

import { NavLinks } from '../NavLinks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as menuActions } from '../../features/mobilMenu';
import { SOCIAL_LINK } from '../constants';

export const Header = () => {
  const { visible: mobileMenuVisible } = useAppSelector(
    state => state.menuVisible,
  );
  const dispatch = useAppDispatch();
  const location = useLocation();

  const onLinkClick = useCallback(
    () => dispatch(menuActions.setMenuVisibility(false)),
    [dispatch],
  );

  useEffect(
    () => () => {
      onLinkClick();
    },
    [location, onLinkClick],
  );

  useEffect(() => {
    window.addEventListener('resize', function () {
      if (document.body.clientWidth > 1024) {
        dispatch(menuActions.setMenuVisibility(false));
      }
    });
  }, [dispatch]);

  return (
    <Navbar
      className={classNames('has-shadow is-primary py-2 px-2', style.header, {
        [style.full_page]: mobileMenuVisible,
      })}
    >
      <Container
        className={classNames(style.nav_bar_container, {
          [style.active]: mobileMenuVisible,
        })}
      >
        <Navbar.Brand>
          <Link
            className={classNames(
              'navbar-item p-0 mr-auto',
              style.custom_hover_logo,
            )}
            to="/"
          >
            <figure className={classNames('image')}>
              <img
                className={style.logo_image}
                src="\icons\LogoHeader.svg"
                alt="Site Logo"
              />
            </figure>
          </Link>

          <Button
            renderAs={Link}
            color="primary"
            to="/donate"
            className={classNames(
              'has-text-link is-hidden-desktop',
              style.custom_hover,
            )}
          >
            <FontAwesomeIcon icon={faHandHoldingDollar} size="2x" />
          </Button>

          <a
            className={classNames('navbar-burger mr-2 ml-2', {
              'is-active': mobileMenuVisible,
            })}
            onClick={() => dispatch(menuActions.toggle())}
            role="button"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </Navbar.Brand>

        <Navbar.Menu
          className={classNames('mx-0', style.menu_wndw, {
            'is-active': mobileMenuVisible,
            [style.active]: mobileMenuVisible,
          })}
        >
          <NavLinks />

          <Container
            className={classNames(
              'is-flex is-hidden-desktop is-justify-content-center is-flex-grow-1 is-align-items-flex-end',
            )}
          >
            {SOCIAL_LINK.map(socialItem => {
              return (
                <Link
                  key={uuidv4()}
                  className={classNames(
                    'navbar-item p-2 mx-6',
                    style.custom_hover,
                  )}
                  to={socialItem.link}
                >
                  <FontAwesomeIcon
                    icon={socialItem.icon}
                    size="2x"
                    className={classNames('has-text-link', style.icon)}
                  />
                </Link>
              );
            })}
          </Container>
        </Navbar.Menu>

        <Button
          className={classNames(
            'is-hidden-touch p-1 has-background-primary-45',
            style.custom_hover,
          )}
        >
          <Link
            className={classNames(style.menu_link)}
            to={'/donate'}
            onClick={onLinkClick}
          >
            <span
              className={classNames(
                'icon-text has-text-link',
                'is-align-items-center',
                'is-flex-direction-column',
                style.icon_text,
              )}
            >
              <span className={classNames('icon')}>
                <FontAwesomeIcon icon={faHandHoldingDollar} size="2x" />
              </span>
              <span>Допомога</span>
            </span>
          </Link>
        </Button>
      </Container>
    </Navbar>
  );
};
