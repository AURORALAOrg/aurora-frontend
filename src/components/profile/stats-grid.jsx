import React from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography, Box } from "@mui/material";
import {
  MenuBook as ClassesIcon,
  Timer as StudyIcon,
  Assignment as ExercisesIcon,
  LocalFire as StreakIcon,
} from "@mui/icons-material";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <Paper sx={{ p: 2, height: "100%" }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Icon sx={{ fontSize: 40, color: `${color}.main`, mb: 1 }} />
      <Typography variant="h4" component="div" gutterBottom>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  </Paper>
);

StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
};

const StatsGrid = ({
  classesCompleted,
  studyHours,
  exercisesSolved,
  currentStreak,
}) => {
  const stats = [
    {
      icon: ClassesIcon,
      label: "Classes Completed",
      value: classesCompleted,
      color: "primary",
    },
    {
      icon: StudyIcon,
      label: "Study Hours",
      value: studyHours,
      color: "secondary",
    },
    {
      icon: ExercisesIcon,
      label: "Exercises Solved",
      value: exercisesSolved,
      color: "success",
    },
    {
      icon: StreakIcon,
      label: "Current Streak",
      value: `${currentStreak} days`,
      color: "error",
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.label}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

StatsGrid.propTypes = {
  classesCompleted: PropTypes.number.isRequired,
  studyHours: PropTypes.number.isRequired,
  exercisesSolved: PropTypes.number.isRequired,
  currentStreak: PropTypes.number.isRequired,
};

export default StatsGrid;
