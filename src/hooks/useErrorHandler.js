import { useHistory } from 'react-router-dom';
import { useAppContext } from '../AppContext';

export default function useErrorHandler() {
  const { replace } = useHistory();
  const { showAlert } = useAppContext();

  const handleError = err => {
    if (err.response.status === 401) replace('/login');
    else showAlert(err.message);
  };

  return { handleError };
}
