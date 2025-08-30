import { LeaderData } from '../../types/Leaders';
import { HEADSHOT_PLACEHOLDER_LINK } from '../constants/mediaLink';
import { Block, Heading } from 'react-bulma-components';
import style from './LeaderAvatar.module.scss';
import classNames from 'classnames';

export const LeaderAvatar: React.FC<
  Omit<LeaderData, 'sortOrderValue' | 'ulad'>
> = ({ fullname, email, position, imgUrl }) => {
  return (
    <div
      className={classNames(
        'box is-flex is-flex-direction-column is-align-items-center m-0',
        style.container,
      )}
    >
      <figure className="image is-128x128 mb-3">
        <img
          className={classNames('is-rounded pb-1', style.image)}
          src={imgUrl || HEADSHOT_PLACEHOLDER_LINK}
        />
      </figure>

      <div
        className="is-flex is-flex-direction-column"
        style={{ height: '100%' }}
      >
        <Heading size={5} className="has-text-centered mb-2">
          {fullname}
        </Heading>

        <Heading subtitle size={6} className="m-0">
          {position}
        </Heading>

        <Block className="is-flex is-flex-grow-1">
          <a className=" is-align-self-flex-end" href={`mailto:${email}`}>
            Contact Me
          </a>
        </Block>
      </div>
    </div>
  );
};
