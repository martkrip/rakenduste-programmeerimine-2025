import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";

function About() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography variant="h4" noWrap component="div">
        Profile:
      </Typography>
      <List
        sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
      >
        <ListItem>
          Hobbid: Arvutimängude mängimine, sport, anime, Youtube
        </ListItem>
        <ListItem>
          Lemmikmängud: Final Fantasy XIV, Deltarune, Undertale, Hearts of Iron
          4, Celeste.
        </ListItem>
        <ListItem>Sport: Jooksmine, jalgrattaga sõitmine ja jõusaal</ListItem>
        <ListItem>Praegune mäng: Final Fantasy XIV</ListItem>
        <ListItem>Praegune anime: Bocchi The Rock!</ListItem>
        <ListItem>
          e-meil: <TextField type="email"></TextField>
        </ListItem>
        <ListItem>
          <Box sx={{ display: "flex", flexdirection: "row", gap: 2 }}>
            <TextField multiline></TextField>
            <Button variant="outlined">Send</Button>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
}

export default About;
