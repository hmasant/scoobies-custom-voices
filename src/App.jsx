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
  const [deviceId, setDeviceId] = useState("");
  const [character, setCharacter] = useState("");

  const BASE = "https://doug5kw1an5zz.cloudfront.net/";
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
    const newAudio = new Audio(`${BASE}custom-voices/${formatName(name)}.mp3`);
    newAudio.play();
    setAudio(newAudio);
  };

  const filtered = character ? data.filter((e) => e.name === character) : data;

  return (
    <>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", textAlign: "center", my: 5 }}
      >
        Customized Voices - Scoobies
      </Typography>
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
            <Grid key={index} size={{ md: 6 }}>
              <Card key={index}>
                <CardMedia
                  sx={{ height: 400 }}
                  title={e.name}
                  image={`${BASE}character-images/${formatName(e.name)}.png`}
                />
                <CardContent>
                  <Typography>{e.name}</Typography>
                  <br />
                  <Typography sx={{ fontWeight: "bold" }}>{e.text}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => play(e.name)}
                    sx={{ fontWeight: "bold" }}
                  >
                    <PlayArrow /> &nbsp; &nbsp; Preview
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() =>
                      deviceId
                        ? send(`${BASE}${formatName(e.name)}.mp3`)
                        : alert("Enter Device ID")
                    }
                  >
                    <Send /> &nbsp; &nbsp; Send to Device
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
