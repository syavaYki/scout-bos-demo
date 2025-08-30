import { Notification } from 'react-bulma-components';

export const ErrorLoadAPINotice = () => {
  return (
    <Notification color={'warning'} light={true}>
      Sorry fail to load content, plese contantact administrator.
    </Notification>
  );
};
