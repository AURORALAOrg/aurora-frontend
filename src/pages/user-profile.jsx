import React from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Typography, Paper, Button } from "@mui/material";
import { Twitter, Facebook, LinkedIn } from "@mui/icons-material";

// Components to be created
import ProfileHeader from "@/components/profile/profile-header";
import StatsGrid from "@/components/profile/stats-grid";
import AchievementsSection from "@/components/profile/achievements-section";
import ActivityGraph from "@/components/profile/activity-graph";
import ShareSection from "@/components/profile/share-section";

// Hooks to be created
import { useUserProfile } from "@/hooks/use-user-profile";
import { useUserStats } from "@/hooks/use-user-stats";
import { useUserAchievements } from "@/hooks/use-user-achievements";
import { useUserActivity } from "@/hooks/use-user-activity";

const UserProfile = () => {
  const { username } = useParams();
  const { profile, isLoading, error } = useUserProfile(username);
  const { stats } = useUserStats(username);
  const { achievements } = useUserAchievements(username);
  const { activity } = useUserActivity(username);

  if (isLoading) {
    return (
      <Container>
        <Typography>Loading profile...</Typography>
      </Container>
    );
  }

  if (error || !profile) {
    return (
      <Container>
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Profile Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The user profile you're looking for doesn't exist.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProfileHeader
        avatar={profile.avatar}
        displayName={profile.displayName}
        country={profile.country}
        community={profile.community}
        joinDate={profile.joinDate}
        level={profile.level}
        progress={profile.progress}
        globalRank={profile.globalRank}
        points={profile.points}
      />

      <StatsGrid
        classesCompleted={stats.classesCompleted}
        studyHours={stats.studyHours}
        exercisesSolved={stats.exercisesSolved}
        currentStreak={stats.currentStreak}
      />

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <AchievementsSection achievements={achievements} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ActivityGraph activity={activity} />
        </Grid>
      </Grid>

      <ShareSection username={username} />

      {profile.isTeacher && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            href={`/teachers/${username}`}
          >
            View Teacher Profile
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default UserProfile;
