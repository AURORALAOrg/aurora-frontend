import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays } from "date-fns";

const ActivityGraph = ({ activity }) => {
  const formatXAxis = (date) => format(new Date(date), "EEE");

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">
            {format(new Date(data.date), "MMM d, yyyy")}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="primary">
              Points: {data.points}
            </Typography>
            <Typography variant="body2" color="secondary">
              Exercises: {data.exercises}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Study Time: {data.studyTime}h
            </Typography>
          </Box>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Activity (Last 7 Days)
      </Typography>

      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activity}>
            <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="points" fill="#1976d2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="primary">
            {activity.reduce((sum, day) => sum + day.points, 0)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Points
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="secondary">
            {activity.reduce((sum, day) => sum + day.exercises, 0)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Exercises
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">
            {activity.reduce((sum, day) => sum + day.studyTime, 0)}h
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Study Time
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

ActivityGraph.propTypes = {
  activity: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
      exercises: PropTypes.number.isRequired,
      studyTime: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ActivityGraph;
