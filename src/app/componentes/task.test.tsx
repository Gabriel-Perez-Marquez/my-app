import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Task from './task';
import { TaskProps } from './task';

const mockProps: TaskProps = {
    id: 1,
    todo: 'Test Task',    
    completed: false,
    userId: 1,
    onDelete: jest.fn(),
    onEdit: jest.fn(),
    toggleComplete: jest.fn()
};

describe('Task', () => {
    it('should render a task', () => {
        const { getByText } = render(<Task {...mockProps} />);
        expect(getByText((content) => content.includes('Test Task'))).toBeInTheDocument();
    });

    it('should call onDelete when delete button is clicked', () => {
        render(<Task {...mockProps} />);
        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);
        expect(mockProps.onDelete).toHaveBeenCalled();
    });

    it('should call onEdit when edit button is clicked', () => {
        render(<Task {...mockProps} />);
        const editButton = screen.getByTestId('edit-button')
        fireEvent.click(editButton);
        expect(mockProps.onEdit).toHaveBeenCalled();
    });

    it('should call toggleComplete when complete button is clicked', () => {
        render(<Task {...mockProps} />);
        const completeButton = screen.getByText('Complete');
        fireEvent.click(completeButton);
        expect(mockProps.toggleComplete).toHaveBeenCalled();
    });

    it('should display "Incomplete" when task is completed', () => {
        render(<Task {...mockProps} completed={true} />);
        expect(screen.getByText('Incomplete')).toBeInTheDocument();
    });
});