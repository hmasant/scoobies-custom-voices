import data from "./data.json";
import { useState } from "react";
import {
  Grid,
  Button,
  Select,
  Divider,
  MenuItem,
  Container,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  CardActions,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import { PlayArrow, Send, Person, Devices } from "@mui/icons-material";

export const App = () => {
  const [audio, setAudio] = useState(null);
  const [deviceId, setDeviceId] = useState("");
  const [character, setCharacter] = useState("");

  const BASE = "https://doug5kw1an5zz.cloudfront.net/custom-voices/";
  const TOKEN =
    "75113c129bcc22fcc7936c2cba48a92380df6545c581e6ef2f094e87c59c0319";

  const send = (url) => {
    fetch("https://aispea-cdn.z33.fun/api/device/push_url_to_device", {
      method: "POST",
      body: JSON.stringify({ device_id: deviceId, voice_url: url }),
      headers: { "Content-Type": "application/json", "X-API-Token": TOKEN },
    });
  };

  const formatName = (name) => name.toLowerCase().split(" ").join("-");

  const play = (name) => {
    if (audio) audio.pause();
    const newAudio = new Audio(`${BASE}${formatName(name)}.mp3`);
    newAudio.play();
    setAudio(newAudio);
  };

  const filtered = character ? data.filter((e) => e.name === character) : data;

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f5f7fa", minHeight: "100vh", pb: 10 }}>
      {/* Sleek App Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "text.primary",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 1 }}>
            SCOOBIES{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              VOICES
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {/* Controls Section */}
        <Card
          elevation={0}
          sx={{ p: 3, borderRadius: 4, border: "1px solid #e0e0e0", mb: 4 }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Character</InputLabel>
                <Select
                  label="Character"
                  value={character}
                  onChange={(e) => setCharacter(e.target.value)}
                >
                  <MenuItem value="">
                    <em>All Characters</em>
                  </MenuItem>
                  {data.map((e, i) => (
                    <MenuItem key={i} value={e.name}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                value={deviceId}
                label="Device ID"
                placeholder="Enter ID to send audio"
                onChange={(e) => setDeviceId(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <Devices
                      fontSize="small"
                      sx={{ mr: 1, color: "action.active" }}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid size={{ md: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setCharacter("");
                  setDeviceId("");
                }}
                sx={{ height: "100%", borderRadius: 2 }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Card>

        {/* Voice Grid */}
        <Grid container spacing={3}>
          {filtered.map((e, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  border: "1px solid #e0e0e0",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.05)",
                    borderColor: "primary.light",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="overline"
                    sx={{ color: "primary.main", fontWeight: "bold" }}
                  >
                    {e.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      mt: 1,
                      color: "text.secondary",
                      fontStyle: "italic",
                    }}
                  >
                    "{e.text}"
                  </Typography>
                </CardContent>

                <Divider sx={{ mx: 2 }} />

                <CardActions sx={{ p: 2, justifyContent: "space-between" }}>
                  <Button
                    size="small"
                    startIcon={<PlayArrow />}
                    onClick={() => play(e.name)}
                    sx={{ borderRadius: 2 }}
                  >
                    Preview
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<Send />}
                    sx={{ borderRadius: 2, px: 2 }}
                    onClick={() =>
                      deviceId
                        ? send(`${BASE}${formatName(e.name)}.mp3`)
                        : alert("Enter Device ID")
                    }
                  >
                    Push
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
