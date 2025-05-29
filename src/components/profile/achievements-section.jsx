import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Tooltip,
} from "@mui/material";
import { format } from "date-fns";
import { EmojiEvents } from "@mui/icons-material";

const getRarityColor = (rarity) => {
  const colors = {
    common: "default",
    uncommon: "info",
    rare: "primary",
    epic: "secondary",
    legendary: "warning",
  };
  return colors[rarity.toLowerCase()] || "default";
};

const Achievement = ({ icon, title, description, rarity, unlockedAt }) => (
  <ListItem>
    <ListItemIcon>
      <EmojiEvents color={getRarityColor(rarity)} />
    </ListItemIcon>
    <ListItemText
      primary={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="subtitle1">{title}</Typography>
          <Chip
            label={rarity}
            size="small"
            color={getRarityColor(rarity)}
            variant="outlined"
          />
        </Box>
      }
      secondary={
        <Box>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Unlocked {format(new Date(unlockedAt), "MMM d, yyyy")}
          </Typography>
        </Box>
      }
    />
  </ListItem>
);

Achievement.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rarity: PropTypes.string.isRequired,
  unlockedAt: PropTypes.string.isRequired,
};

const AchievementsSection = ({ achievements }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Achievements ({achievements.length})
      </Typography>
      <List>
        {achievements.map((achievement) => (
          <Achievement
            key={achievement.id}
            icon={achievement.icon}
            title={achievement.title}
            description={achievement.description}
            rarity={achievement.rarity}
            unlockedAt={achievement.unlockedAt}
          />
        ))}
      </List>
    </Paper>
  );
};

AchievementsSection.propTypes = {
  achievements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      icon: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rarity: PropTypes.string.isRequired,
      unlockedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AchievementsSection;
