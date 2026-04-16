import { useState } from "react";
import { PlayArrow, Send } from "@mui/icons-material";
import {
  Box,
  Card,
  Grid,
  Button,
  Select,
  Divider,
  MenuItem,
  Container,
  TextField,
  InputLabel,
  Typography,
  CardContent,
  FormControl,
} from "@mui/material";

const gradient1 = "#667eea";
const gradient2 = "#764ba2";

export const App = () => {
  const [deviceId, setDeviceId] = useState("");
  const [character, setCharacter] = useState("");
  const fldStyle = {
    borderRadius: "12px",
    "& .MuiOutlinedInput-root": {
      transition: "all 0.3s ease",
      "&:hover": { boxShadow: `0 4px 20px rgba(102,126,234,0.15)` },
      "&.Mui-focused": { boxShadow: `0 8px 32px rgba(102,126,234,0.25)` },
    },
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          animation: "fadeInDown 0.8s ease-out",
          "@keyframes fadeInDown": {
            from: { opacity: 0, transform: "translateY(-20px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            background: `linear-gradient(135deg, ${gradient1} 0%, ${gradient2} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          Customized Voices
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: "#666", fontWeight: 300, letterSpacing: "2px" }}
        >
          SCOOBIES
        </Typography>
      </Box>
      <Divider
        sx={{
          mb: 6,
          backgroundColor: "rgba(102, 126, 234, 0.2)",
          height: "2px",
        }}
      />
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={3}>
          <Grid size={{ md: 6 }}>
            <FormControl fullWidth>
              <InputLabel
                sx={{ fontWeight: 600, "&.Mui-focused": { color: gradient1 } }}
              >
                Character
              </InputLabel>
              <Select
                label="Character"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                sx={fldStyle}
              >
                <MenuItem value="mickey-mouse">🐭 Mickey Mouse</MenuItem>
                <MenuItem value="donald-duck">🦆 Donald Duck</MenuItem>
                <MenuItem value="peppa-pig">🐷 Peppa Pig</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ md: 6 }}>
            <TextField
              value={deviceId}
              label="Device ID"
              placeholder="Enter Device ID"
              onChange={(e) => setDeviceId(e.target.value)}
              fullWidth
              sx={fldStyle}
            />
          </Grid>
        </Grid>
      </Container>
      <Divider
        sx={{
          mb: 8,
          backgroundColor: "rgba(102, 126, 234, 0.2)",
          height: "2px",
        }}
      />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid
              key={i}
              size={{ xs: 12, sm: 6, md: 4 }}
              sx={{
                animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`,
                "@keyframes fadeInUp": {
                  from: { opacity: 0, transform: "translateY(20px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
                  border: "1px solid rgba(102, 126, 234, 0.1)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 16px rgba(102, 126, 234, 0.08)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: `linear-gradient(90deg, ${gradient1} 0%, ${gradient2} 100%)`,
                  },
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 32px rgba(102, 126, 234, 0.2)",
                    borderColor: "rgba(102, 126, 234, 0.3)",
                  },
                }}
              >
                <CardContent sx={{ pb: 3 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: gradient1,
                      fontWeight: 700,
                      letterSpacing: "1px",
                      fontSize: "0.75rem",
                      mb: 1.5,
                      display: "block",
                    }}
                  >
                    Ask Pookie
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#333",
                      lineHeight: 1.5,
                      mb: 3,
                      fontSize: "1.1rem",
                      minHeight: "3em",
                    }}
                  >
                    What's your favorite adventure today?
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      pt: 2,
                      borderTop: "1px solid rgba(102, 126, 234, 0.1)",
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<PlayArrow />}
                      sx={{
                        borderRadius: "10px",
                        background: `linear-gradient(135deg, ${gradient1} 0%, ${gradient2} 100%)`,
                        textTransform: "none",
                        fontWeight: 600,
                        flex: 1,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: `0 8px 24px rgba(102,126,234,0.4)`,
                        },
                      }}
                    >
                      Play
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Send />}
                      sx={{
                        borderRadius: "10px",
                        borderColor: gradient1,
                        color: gradient1,
                        textTransform: "none",
                        fontWeight: 600,
                        flex: 1,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: gradient2,
                          color: gradient2,
                          backgroundColor: "rgba(102, 126, 234, 0.05)",
                        },
                      }}
                    >
                      Send
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
