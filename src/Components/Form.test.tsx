import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('Form component', () => {
    test('displays validation error when title is not provided', async () => {
        render(<Form />);
        const submitButton = screen.getByRole('button', { name: /submit/i });

        userEvent.type(screen.getByLabelText(/body/i), 'Sample Body');
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Please provide the title/i)).toBeInTheDocument();
        });
    });

    test('displays validation error when title is too short', async () => {
        render(<Form />);
        const submitButton = screen.getByRole('button', { name: /submit/i });

        userEvent.type(screen.getByLabelText(/title/i), 'Hi');
        userEvent.type(screen.getByLabelText(/body/i), 'Sample Body');
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Please give 3 characters long/i)).toBeInTheDocument();
        });
    });

    test('displays validation error when body is not provided', async () => {
        render(<Form />);
        const submitButton = screen.getByRole('button', { name: /submit/i });

        userEvent.type(screen.getByLabelText(/title/i), 'Sample Title');
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Please provide the body/i)).toBeInTheDocument();
        });
    });

    test('displays validation error when body is too short', async () => {
        render(<Form />);
        const submitButton = screen.getByRole('button', { name: /submit/i });

        userEvent.type(screen.getByLabelText(/title/i), 'Sample Title');
        userEvent.type(screen.getByLabelText(/body/i), 'Hi');
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Please give 3 characters long/i)).toBeInTheDocument();
        });
    });
});




