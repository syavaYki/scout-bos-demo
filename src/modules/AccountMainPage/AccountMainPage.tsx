import { useAppSelector } from '../../app/hooks';
import { Columns } from 'react-bulma-components';
import { Loader } from '../../components/Loader';
import { ErrorLoadAPINotice } from '../../components/ErrorLoadAPINotice';
import classNames from 'classnames';
import { UserHeadshot } from '../../components/UserHeadshot';
import { AccountControl } from '../AccountControl';

export const AccountMainPage = () => {
  const { loading, error } = useAppSelector(state => state.auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!error ? (
        <Columns className="my-3">
          <Columns.Column size={4}>
            <UserHeadshot />
          </Columns.Column>

          <Columns.Column
            className={classNames(' is-flex is-flex-direction-column')}
          >
            <AccountControl />
          </Columns.Column>
        </Columns>
      ) : (
        <ErrorLoadAPINotice />
      )}
    </>
  );
};
