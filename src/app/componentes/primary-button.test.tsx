import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import PrimaryButton from './primary-button';

describe('PrimaryButton', () => {
    it('should render children', () => {
        const { getByText } = render(<PrimaryButton handleClick={() => {}}>Click Me</PrimaryButton>);
        expect(getByText('Click Me')).toBeInTheDocument();
        
    });
    
    it('should call handleClick', () => {
        const handleClick = jest.fn();
        const { getByText } = render(<PrimaryButton handleClick={handleClick}>Click me</PrimaryButton>);
        fireEvent.click(getByText('Click me'));
        expect(handleClick).toHaveBeenCalled();
    });
    
});