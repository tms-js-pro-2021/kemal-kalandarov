import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoPage from './TodoPage';

jest.mock('../../AppContext', () => ({
  useAppContext: () => ({ showAlert: () => {} }),
}));

jest.mock('react-router-dom', () => ({
  useHistory: () => ({ replace: () => {} }),
}));

jest.mock('react-query', () => ({
  useQuery: () => ({
    isLoading: false,
    data: [{ done: false, description: 'test2' }],
  }),
}));

jest.mock('./TodoDialog', () => ({
  __esModule: true,
  default: props => (
    <div data-testid="dialog-mock">{JSON.stringify(props)}</div>
  ),
}));

describe('TodoPage', () => {
  it('should render without crashes', () => {
    const { getByText } = render(<TodoPage />);
    expect(getByText('test2')).toBeInTheDocument();
  });

  it('should open dialog on click', async () => {
    const { getByTestId, getAllByTestId } = render(<TodoPage />);
    const addTodoButton = getByTestId('add-todo');

    fireEvent.click(addTodoButton);

    const [, dialogMock] = getAllByTestId('dialog-mock');
    expect(JSON.parse(dialogMock.innerHTML).open).toBe(true);
  });
});
