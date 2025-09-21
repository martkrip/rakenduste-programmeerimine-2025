import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import useLocalStorage from "../useLocalStorage";


function About() {

  const [email, setEmail, clearEmail] = useLocalStorage<string>("email", "");
  const [message, setMessage, clearMessage] = useLocalStorage<string>("message", "");

  const handleSend = () => {
    console.log("Email:", email);
    console.log("Message:", message);
    clearMessage();
    clearEmail();
  }

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
          e-meil:{""}
          <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder = "Sisesta enda e-meil"
          ></TextField>
        </ListItem>
        <ListItem>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <TextField
              multiline
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Kirjuta sõnumit"
            ></TextField>
            <Button variant="outlined" onClick={handleSend}>
              Send
            </Button>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
}

export default About;
