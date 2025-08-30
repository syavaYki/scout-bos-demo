import style from './NavLinks.module.scss';
import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MENU_LINKS_AUTH, MENU_LINKS_NO_AUTH } from '../constants';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as menuActions } from '../../features/mobilMenu';

export const NavLinks: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector(state => state.auth);
  const linksToRender = loggedIn ? MENU_LINKS_AUTH : MENU_LINKS_NO_AUTH;

  function onLinkClick() {
    dispatch(menuActions.setMenuVisibility(false));
  }

  return (
    <>
      {linksToRender.map(menuLink => {
        return (
          <Link
            key={uuidv4()}
            to={menuLink.link}
            onClick={onLinkClick}
            className={classNames(
              'navbar-item my-0 p-1',
              style.custom_hover,
              style.link_container,
            )}
          >
            <span
              className={classNames(
                'icon-text has-text-link',
                'is-align-items-center',
                'is-flex-direction-column',
                style.icon_text_header,
              )}
            >
              <span className={classNames('icon')}>
                <FontAwesomeIcon
                  icon={menuLink.icon}
                  className={classNames(style.icon_header)}
                />
              </span>

              <span className="has-text-centered">{menuLink.name}</span>
            </span>
          </Link>
        );
      })}
    </>
  );
};
