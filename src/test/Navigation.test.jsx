/**
 * @jest-environment jsdom
 */
test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../components/layout/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import HomePage from '../pages/aurora-site/home';
import Header from '../components/layout/header/header';

test('initiating the onboarding process of new user', async () => {
    render(<HomePage />, { wrapper: BrowserRouter })
    const user = userEvent.setup();
    await user.click(screen.getByTestId("get-started"));
    expect(window.location.pathname).toBe('/wallet-connection');  // Check if the URL changed
})

test("test for directing users to their respective learning section ", async () => {
    const categories = [
        { label: 'Grammar', page: '/grammar' },
        { label: 'Vocabulary', page: '/vocabulary' },
        { label: 'Speaking', page: '/speaking' },
        { label: 'Listening', page: '/listening' },
        { label: 'Reading', page: '/reading' },
        { label: 'Games', page: '/games' },
    ];

    render(<Sidebar />, { wrapper: BrowserRouter })

    // Expand accordion or ensure categories are rendered
    expect(screen.queryByText("CATEGORIES")).toBeNull();
    const accordionButton = screen.getByText('Learning content');
    fireEvent.click(accordionButton);//opening the dropdown
    expect(screen.getByText("CATEGORIES")).toBeInTheDocument();


    const user = userEvent.setup();
    // Expand accordion or ensure categories are rendered

    for (const category of categories) {
        await user.click(screen.getByTestId(`category-link-${category.label}`));
        expect(window.location.pathname).toBe(category.page);  // Check if the URL changed
    }

});
test("test for opening  the user's learning progress dashboard", async () => {
    render(<Sidebar />, { wrapper: BrowserRouter })
    const user = userEvent.setup();
    await user.click(screen.getByTestId('item-link-Analytics'));
    expect(window.location.pathname).toBe('/analytics');  // Check if the URL changed
})
test("test for opening the community interaction space", async () => {
    render(<Sidebar />, { wrapper: BrowserRouter })
    const user = userEvent.setup();
    await user.click(screen.getByTestId('item-link-Community'));
    expect(window.location.pathname).toBe('/community');  // Check if the URL changed
})
test("test for initiating the AI conversation interface", async () => {
    render(<Sidebar />, { wrapper: BrowserRouter })
    const user = userEvent.setup();
    await user.click(screen.getByTestId('aurora-ai'));
    expect(window.location.pathname).toBe('/aurora');  // Check if the URL changed
})
test("test for displaying  user notifications when clicked", async () => {
    render(<Header />, { wrapper: BrowserRouter })
    const user = userEvent.setup();
    await user.click(screen.getByTestId('notify-message'));
    expect(window.location.pathname).toBe('/notification');  // Check if the URL changed
})
test('test for enabling users to search through learning content', async () => {
    const handleChange = jest.fn();
    render(<Header
        searchQuery=""
        handleChange={handleChange}
        filteredOptions={['grammar', 'vocabulary']}
        setSearchQuery={jest.fn()}
        showFiltered={true}
    />, { wrapper: BrowserRouter });
    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'grammar');
    expect(screen.getByText('grammar')).toBeInTheDocument();
    await userEvent.click(screen.getByText('grammar'));
    expect(window.location.pathname).toBe('/grammar');  // Check if the URL changed
})