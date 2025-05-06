import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BusinessEnglishPage from '../pages/aurora-site/learning/business-english';

// Mock the icons used in the component
jest.mock('lucide-react', () => ({
  Book: () => <div data-testid="book-icon" />,
  Mic: () => <div data-testid="mic-icon" />,
  Headphones: () => <div data-testid="headphones-icon" />,
  PenTool: () => <div data-testid="pen-tool-icon" />,
  Shield: () => <div data-testid="shield-icon" />,
  FileText: () => <div data-testid="file-text-icon" />,
  DollarSign: () => <div data-testid="dollar-sign-icon" />,
  Users: () => <div data-testid="users-icon" />,
  Globe: () => <div data-testid="globe-icon" />,
}));

describe('BusinessEnglishPage', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  test('renders the main heading', () => {
    renderWithRouter(<BusinessEnglishPage />);
    expect(screen.getByText('Master Business English')).toBeInTheDocument();
  });

  test('renders all course cards', () => {
    renderWithRouter(<BusinessEnglishPage />);
    expect(screen.getByText('Business Communication Essentials')).toBeInTheDocument();
    expect(screen.getByText('Negotiation & Persuasion')).toBeInTheDocument();
    expect(screen.getByText('Financial English')).toBeInTheDocument();
    expect(screen.getByText('Leadership Communication')).toBeInTheDocument();
    expect(screen.getByText('Marketing & Sales English')).toBeInTheDocument();
    expect(screen.getByText('Cross-Cultural Business Communication')).toBeInTheDocument();
  });

  test('renders the skills section', () => {
    renderWithRouter(<BusinessEnglishPage />);
    expect(screen.getByText('Business English Skills')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
    expect(screen.getByText('Speaking')).toBeInTheDocument();
    expect(screen.getByText('Listening')).toBeInTheDocument();
    expect(screen.getByText('Writing')).toBeInTheDocument();
  });

  test('renders testimonials section', () => {
    renderWithRouter(<BusinessEnglishPage />);
    expect(screen.getByText('Success Stories')).toBeInTheDocument();
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Miguel Rodriguez')).toBeInTheDocument();
    expect(screen.getByText('Akira Tanaka')).toBeInTheDocument();
  });

  test('renders CTA sections', () => {
    renderWithRouter(<BusinessEnglishPage />);
    expect(screen.getByText('Assess Your Business English Level')).toBeInTheDocument();
    expect(screen.getByText('Ready to Advance Your Career?')).toBeInTheDocument();
  });
});