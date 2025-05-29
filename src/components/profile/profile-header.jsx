import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Paper,
  Typography,
  LinearProgress,
  Grid,
  Chip,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { Public, EmojiEvents, School } from "@mui/icons-material";

const ProfileHeader = ({
  avatar,
  displayName,
  country,
  community,
  joinDate,
  level,
  progress,
  globalRank,
  points,
}) => {
  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <Avatar
            src={avatar}
            alt={displayName}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>

        <Grid item xs>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {displayName}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Public fontSize="small" />
                <Typography variant="body2">{country}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <School fontSize="small" />
                <Typography variant="body2">{community}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Joined {formatDistanceToNow(new Date(joinDate))} ago
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Chip
                label={`Level ${level}`}
                color="primary"
                size="small"
                variant="outlined"
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <EmojiEvents fontSize="small" color="primary" />
                <Typography variant="body2">
                  #{globalRank} Global • {points.toLocaleString()} points
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {progress}%
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

ProfileHeader.propTypes = {
  avatar: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  community: PropTypes.string.isRequired,
  joinDate: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  globalRank: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
};

export default ProfileHeader;
