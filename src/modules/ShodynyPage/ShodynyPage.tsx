import { Button } from 'react-bulma-components';
import { useLocation, useNavigate } from 'react-router-dom';

export const ShodynyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Button.Group
      size={'medium'}
      className="is-flex is-flex-direction-column is-align-items-center p-5"
    >
      <Button
        renderAs="a"
        color="success"
        fullwidth
        onClick={() => navigate(`${location.pathname}/attendance`)}
      >
        Відвідування
      </Button>

      <Button
        renderAs="a"
        color="success"
        fullwidth
        onClick={() => navigate(`${location.pathname}/attendance`)}
      >
        Запис
      </Button>
    </Button.Group>
  );
};
