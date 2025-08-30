import classNames from 'classnames';
import style from './FooterElem.module.scss';
import { Columns, Container, Footer } from 'react-bulma-components';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { MENU_LINKS_AUTH, MENU_LINKS_NO_AUTH, SOCIAL_LINK } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../app/hooks';

export const FooterElem = () => {
  const { loggedIn } = useAppSelector(state => state.auth);
  const linksToRender = loggedIn ? MENU_LINKS_AUTH : MENU_LINKS_NO_AUTH;

  return (
    <Footer
      className={classNames(
        'is-fixed-bottom has-background-primary px-0 py-4',
        style.contaniner,
      )}
    >
      <Container className="pt-0 pb-2 px-4">
        <Columns>
          <Columns.Column className="is-flex is-flex-direction-column">
            <Container>
              {linksToRender.map(menuLink => {
                return (
                  <Link
                    key={uuidv4()}
                    to={menuLink.link}
                    className={classNames(
                      'is-flex is-flex-direction-column my-0 p-1',
                      style.custom_hover,
                    )}
                  >
                    <span
                      className={classNames(
                        'icon-text has-text-link',
                        'is-align-items-center',
                      )}
                    >
                      <span className={classNames('icon is-large')}>
                        <FontAwesomeIcon icon={menuLink.icon} size="2x" />
                      </span>

                      <span className="has-text-centered">{menuLink.name}</span>
                    </span>
                  </Link>
                );
              })}
            </Container>
          </Columns.Column>

          <Columns.Column className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <a href="/" className="is-hidden is-flex-desktop">
              <img
                src="https://wpapi.plastlindenhurst.org/wp-content/uploads/2025/02/Plast-Lindenhurst-LOGO.jpg"
                className={classNames('', style.logo_decor)}
              />
            </a>
          </Columns.Column>
        </Columns>

        <Container className="is-flex is-justify-content-space-evenly">
          <p className="has-text-link">&copy;2025 Plast Lindenhurst</p>
          <a href="mailto:info@plastlindenhurst.org" className="has-text-link">
            info@plastlindenhurst.org
          </a>
          <div>
            {SOCIAL_LINK.map(socialItem => {
              return (
                <Link
                  key={uuidv4()}
                  className={classNames('px-4 ', style.custom_hover)}
                  to={socialItem.link}
                >
                  <FontAwesomeIcon
                    icon={socialItem.icon}
                    size="2x"
                    className={classNames('has-text-link')}
                  />
                </Link>
              );
            })}
          </div>
        </Container>
      </Container>
    </Footer>
  );
};
