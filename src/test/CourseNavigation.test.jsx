/* eslint-env jest */
/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CourseNavigation from "../pages/aurora-site/course-navigation";

// Mock the ProgressCircle component
jest.mock("@/components/ui/progress-circle", () => {
  return function MockProgressCircle({
    progress,
    size,
    color,
    showPercentage,
  }) {
    return (
      <div
        data-testid="progress-circle"
        data-progress={progress}
        data-size={size}
        data-color={color}
      >
        {showPercentage && <span>{progress}%</span>}
      </div>
    );
  };
});

describe("CourseNavigation Component", () => {
  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  test("renders course navigation page with title", () => {
    renderWithRouter(<CourseNavigation />);

    expect(screen.getByText("Course Navigation")).toBeInTheDocument();
    expect(screen.getByText(/Choose your learning path/)).toBeInTheDocument();
  });

  test("displays all 4 main course areas", () => {
    renderWithRouter(<CourseNavigation />);

    expect(screen.getAllByText("Basic Conversation")).toHaveLength(2); // Title and progress summary
    expect(screen.getAllByText("Grammar Foundations")).toHaveLength(2);
    expect(screen.getAllByText("Cultural Insights")).toHaveLength(2);
    expect(screen.getAllByText("Pronunciation & Listening")).toHaveLength(2);
  });

  test("displays course descriptions", () => {
    renderWithRouter(<CourseNavigation />);

    expect(
      screen.getByText(/Learn everyday phrases and expressions/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Master the essential building blocks/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Understand cultural context/)).toBeInTheDocument();
    expect(
      screen.getByText(/Improve your speaking clarity/)
    ).toBeInTheDocument();
  });

  test("shows progress indicators for each course", () => {
    renderWithRouter(<CourseNavigation />);

    const progressCircles = screen.getAllByTestId("progress-circle");
    expect(progressCircles).toHaveLength(4);
  });

  test("displays action buttons for courses", () => {
    renderWithRouter(<CourseNavigation />);

    // Should show "Continue" buttons for courses with progress
    const continueButtons = screen.getAllByText("Continue");
    expect(continueButtons.length).toBeGreaterThan(0);
  });

  test("expands course to show lessons when clicked", () => {
    renderWithRouter(<CourseNavigation />);

    const basicConversationCard = screen.getByRole("button", {
      name: /Basic Conversation/i,
    });
    fireEvent.click(basicConversationCard);

    // Should show lessons after clicking
    expect(screen.getByText(/Lessons/)).toBeInTheDocument();
    expect(screen.getByText("Greetings and Introductions")).toBeInTheDocument();
  });

  test("displays overall progress summary", () => {
    renderWithRouter(<CourseNavigation />);

    expect(screen.getByText("Overall Progress")).toBeInTheDocument();
  });

  test("shows lesson completion status", () => {
    renderWithRouter(<CourseNavigation />);

    const basicConversationCard = screen.getByRole("button", {
      name: /Basic Conversation/i,
    });
    fireEvent.click(basicConversationCard);

    // Should show completed lessons with checkmarks
    expect(screen.getByText("Greetings and Introductions")).toBeInTheDocument();
    expect(screen.getByText("✓ Completed")).toBeInTheDocument();
  });
});
