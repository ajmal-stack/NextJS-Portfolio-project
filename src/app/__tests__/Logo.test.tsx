import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Logo from '../components/Logo';

describe('Logo Component', () => {
  it('renders logo image', () => {
    const { getByAltText } = render(<Logo />);
    const logoImage = getByAltText('Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute(
      'src',
      expect.stringContaining('ajmal-light-logo.svg')
    );
  });
});
