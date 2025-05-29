import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  Snackbar,
} from "@mui/material";
import {
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  ContentCopy as CopyIcon,
} from "@mui/icons-material";

const ShareSection = ({ username }) => {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const profileUrl = `${window.location.origin}/u/${username}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setShowCopiedMessage(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareText = `Check out my learning progress on Aurora! 🚀`;

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(profileUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      profileUrl
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      profileUrl
    )}`,
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Share Profile
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          value={profileUrl}
          variant="outlined"
          size="small"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <IconButton onClick={handleCopyLink} size="small">
                <CopyIcon />
              </IconButton>
            ),
          }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
          variant="contained"
          startIcon={<TwitterIcon />}
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ bgcolor: "#1DA1F2" }}
        >
          Twitter
        </Button>
        <Button
          variant="contained"
          startIcon={<FacebookIcon />}
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ bgcolor: "#4267B2" }}
        >
          Facebook
        </Button>
        <Button
          variant="contained"
          startIcon={<LinkedInIcon />}
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ bgcolor: "#0A66C2" }}
        >
          LinkedIn
        </Button>
      </Box>

      <Snackbar
        open={showCopiedMessage}
        autoHideDuration={3000}
        onClose={() => setShowCopiedMessage(false)}
        message="Profile link copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Paper>
  );
};

ShareSection.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ShareSection;
