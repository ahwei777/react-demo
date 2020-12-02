import { render, screen, waitFor } from '@testing-library/react';
import BlogApp from './App';

test('renders learn react link', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest
      .fn()
      .mockResolvedValue([{ id: 1, title: 'i am title', createdAt: 12345 }]),
  });
  render(<BlogApp />);
  await waitFor(() => expect(screen.getByText(/i am title/i)).toBeInTheDocument());
});
