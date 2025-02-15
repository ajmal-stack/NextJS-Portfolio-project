import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../contact/page';
import toast from 'react-hot-toast';

// Mock emailjs
jest.mock('@emailjs/browser', () => ({
  init: jest.fn(),
  send: jest.fn().mockResolvedValue({ status: 200, text: 'OK' }),
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Contact Form', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  it('validates required fields', async () => {
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please fill in all fields');
    });
  });

  it('validates email format', async () => {
    render(<Contact />);

    // Fill in form with invalid email
    await userEvent.type(screen.getByLabelText(/name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');
    await userEvent.type(screen.getByLabelText(/message/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Please enter a valid email address'
      );
    });
  });

  it('submits form with valid data', async () => {
    render(<Contact />);

    // Fill in form fields
    await userEvent.type(screen.getByLabelText(/name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Message sent successfully! I will get back to you soon.'
      );
    });
  });

  it('enforces cooldown period', async () => {
    // Set a recent message time
    localStorage.setItem('lastMessageTime', Date.now().toString());

    render(<Contact />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringMatching(/you can send another message in \d+ hours/i)
      );
    });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    expect(submitButton).toBeDisabled();
  });
});
