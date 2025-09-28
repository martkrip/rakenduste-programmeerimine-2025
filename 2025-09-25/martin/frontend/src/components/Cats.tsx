import { Box, List, ListItem, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitCat from "./SubmitCat.tsx";

type Cat = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};


const Cats = () => {
  const [cats, setCats] = useState<Cat[]>([]);

  const fetchCats = async () => {
    const response = await fetch("http://localhost:3000/cats");
    const data = await response.json();

    setCats(data);
  };

  useEffect(() => {
    fetchCats(); // toimub fetchCats funktsioon
  }, []);

  return (
    <Box>
      <Typography variant="h1">Cats</Typography>
      <CatsList cats={cats} fetchCats={fetchCats} />
      <SubmitCat fetchCats={fetchCats} />
    </Box>
  );
};



type CatsListProps = {
    cats: Cat[];
    fetchCats: () => void
};

const CatsList: React.FC<CatsListProps> = ({ cats, fetchCats }) => {
  console.log({ cats })
  const deleteHandler = async (id: string) => {
    try {
      await fetch("http://localhost:3000/cats", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      fetchCats();
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <List>
      {cats.map((cat) => (
        <ListItem key={cat.id}>{JSON.stringify(cat)}
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteHandler(cat.id)}
            > Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default Cats;
