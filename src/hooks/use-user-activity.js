import { useState, useEffect } from "react";
import axios from "axios";
import { subDays, format } from "date-fns";

export const useUserActivity = (username) => {
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get the date range for the last 7 days
        const endDate = new Date();
        const startDate = subDays(endDate, 6); // 7 days including today

        // Replace with your actual API endpoint
        const response = await axios.get(`/api/users/${username}/activity`, {
          params: {
            startDate: format(startDate, "yyyy-MM-dd"),
            endDate: format(endDate, "yyyy-MM-dd"),
          },
        });

        // Ensure we have data for all 7 days
        const fullWeekActivity = [];
        for (let i = 0; i <= 6; i++) {
          const date = format(subDays(endDate, i), "yyyy-MM-dd");
          const dayData = response.data.find((d) => d.date === date) || {
            date,
            points: 0,
            exercises: 0,
            studyTime: 0,
          };
          fullWeekActivity.unshift(dayData);
        }

        setActivity(fullWeekActivity);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch user activity"
        );
        setActivity([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchActivity();
    }
  }, [username]);

  return { activity, isLoading, error };
};
