import { useAppSelector } from '../../app/hooks';
import { Block, Box, Form, Heading } from 'react-bulma-components';

export const UserHeadshot = () => {
  const { user } = useAppSelector(state => state.auth);

  return (
    <Box className="is-flex is-flex-direction-column is-align-items-center">
      <figure className="image is-128x128 mb-3">
        <img className="is-rounded" src={user?.headshot || ''} />
      </figure>

      <Block className="is-flex is-flex-direction-column">
        <Heading subtitle className="mb-2">
          {user?.firstName}
        </Heading>

        <Heading subtitle>{user?.lastName}</Heading>
      </Block>

      <Block>
        <Form.Field horizontal>
          <Form.Field.Label>User name</Form.Field.Label>

          <Form.Field.Body>
            <Form.Field>
              <Form.Control>
                <Form.Input value={user?.username} disabled />
              </Form.Control>
            </Form.Field>
          </Form.Field.Body>
        </Form.Field>

        <Form.Field horizontal>
          <Form.Field.Label>Email</Form.Field.Label>

          <Form.Field.Body>
            <Form.Field>
              <Form.Control>
                <Form.Input value={user?.email} disabled />
              </Form.Control>
            </Form.Field>
          </Form.Field.Body>
        </Form.Field>
      </Block>

      <Block className="is-flex is-align-items-center">
        <Heading subtitle size={4} className="p-0 m-0 pr-2">
          Role:
        </Heading>
        <Heading subtitle size={5} className="p-0 m-0">
          {(user?.roles && user?.roles.join(', ')) || ''}
        </Heading>
      </Block>
    </Box>
  );
};
