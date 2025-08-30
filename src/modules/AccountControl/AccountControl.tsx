import classNames from 'classnames';
import { Box, Button, Columns } from 'react-bulma-components';
import { v4 as uuidv4 } from 'uuid';

import style from './AccountControl.module.scss';
import { ACOUNT_CONTROL_LINKS } from '../../components/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { AuthLevels } from '../../types/AuthLevels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AccountControl = () => {
  const { accessLevel } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className={classNames(style.container)}>
      <Columns>
        <Columns.Column size={3}></Columns.Column>
        <Columns.Column size={6}>
          <Button.Group
            className={classNames(
              'is-flex is-flex-direction-column',
              style.container,
            )}
          >
            {ACOUNT_CONTROL_LINKS[accessLevel as AuthLevels]?.map(item => {
              return (
                <Button
                  key={uuidv4()}
                  renderAs="a"
                  color="success"
                  fullwidth
                  onClick={() => navigate(`${location.pathname}/${item.link}`)}
                >
                  <span className="icon-text is-large">
                    <FontAwesomeIcon icon={item?.icon} size="lg" />
                    <span className="ml-2">{item.name}</span>
                  </span>
                </Button>
              );
            })}

            {accessLevel === AuthLevels.ADMIN && (
              <Button className="is-link m-0 p-0">
                <a
                  href="https://wpapi.plastlindenhurst.org/wp-login.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3"
                >
                  WP Admin Panel
                </a>
              </Button>
            )}
          </Button.Group>
        </Columns.Column>
        <Columns.Column size={3}></Columns.Column>
      </Columns>
    </Box>
  );
};
