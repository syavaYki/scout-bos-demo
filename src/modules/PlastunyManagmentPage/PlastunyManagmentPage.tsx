import { useEffect, useState } from 'react';
import { Block, Box } from 'react-bulma-components';
import { User } from '../../types/User';
import { UseGetAllUsersApi } from '../../api/getAllUsers';
import { ModalLoader } from '../../components/ModalLoader';
import { ErrorLoadAPINotice } from '../../components/ErrorLoadAPINotice';
import { parseUsersAPI } from '../../utils/userManagmentHelper';
import { UserTable } from '../../components/UserTable';
import { AuthLevels } from '../../types/AuthLevels';

export const PlastunyManagmentPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { data, loading, error, refetch } = UseGetAllUsersApi();

  useEffect(() => {
    setUsers(parseUsersAPI(data));
  }, [data]);

  if (loading) {
    return <ModalLoader />;
  }

  function tableOnActino(action: string) {
    if (action) {
      refetch().then(res => setUsers(parseUsersAPI(res.data)));
    }
  }

  return (
    <Box className="p-0 pb-2 mb-2">
      {error ? (
        <ErrorLoadAPINotice />
      ) : (
        <Block style={{ width: '100%', height: '80vh' }}>
          <UserTable
            data={users.filter(user =>
              user.roles?.includes(AuthLevels.PLASTUN),
            )}
            onTableAction={tableOnActino}
          />
        </Block>
      )}
    </Box>
  );
};
