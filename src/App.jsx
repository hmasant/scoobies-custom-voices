import data from "./data.json";
import { useState } from "react";
import { PlayArrow, Send } from "@mui/icons-material";
import {
  Grid,
  Card,
  Button,
  Select,
  Divider,
  MenuItem,
  CardMedia,
  Container,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  CardContent,
  CardActions,
} from "@mui/material";

export const App = () => {
  const [audio, setAudio] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [deviceId, setDeviceId] = useState("");
  const [character, setCharacter] = useState("");

  const BASE = "https://scoobies-custom-voices.pages.dev/";
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
    const newAudio = new Audio(`${BASE}audio/${formatName(name)}.mp3`);
    newAudio.play();
    setAudio(newAudio);
  };

  const filtered = character ? data.filter((e) => e.name === character) : data;

  return (
    <>
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", textAlign: "center", mt: 5 }}
      >
        Customized Voices
      </Typography>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Scoobies AI
      </Typography>
      <br />
      <Divider />
      <Container sx={{ my: 5 }}>
        <Grid container spacing={5}>
          <Grid size={{ md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Character</InputLabel>
              <Select
                label="Character"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
              >
                {data.map((e, i) => (
                  <MenuItem key={i} value={e.name}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ md: 6 }}>
            <TextField
              value={deviceId}
              label="Device ID"
              placeholder="Enter Device Id"
              onChange={(e) => setDeviceId(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container sx={{ my: 3 }}>
        <Grid container spacing={5}>
          {filtered.map((e, index) => (
            <Grid key={index} size={{ md: 4 }}>
              <Card
                key={index}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  title={e.name}
                  sx={{ height: 400, aspectRatio: 1 }}
                  image={`${BASE}image/${formatName(e.name)}.png`}
                />
                <CardContent sx={{ paddingTop: 4, px: 4, flexGrow: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {e.name}
                  </Typography>
                  <br />
                  <Divider />
                  <br />
                  <Typography>
                    {expanded[e.name]
                      ? e.text
                      : e.text.substring(0, 100) +
                        (e.text.length > 100 ? "..." : "")}
                  </Typography>
                  {e.text.length > 100 && (
                    <Button
                      type="text"
                      size="small"
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [e.name]: !prev[e.name],
                        }))
                      }
                      sx={{ mt: 2 }}
                    >
                      {expanded[e.name] ? "Read Less" : "Read More"}
                    </Button>
                  )}
                </CardContent>
                <br />
                <Divider />
                <br />
                <CardActions
                  sx={{
                    display: "flex",
                    paddingBottom: 4,
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => play(e.name)}
                    sx={{ fontWeight: "bold" }}
                  >
                    <PlayArrow /> &nbsp; &nbsp; Preview
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() =>
                      deviceId
                        ? send(`${BASE}audio/${formatName(e.name)}.mp3`)
                        : alert("Enter Device ID")
                    }
                  >
                    <Send /> &nbsp; &nbsp; Send
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
