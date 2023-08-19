import React from "react";
import { RecipeCard, TaggedContentCard } from "react-ui-cards";
import { Flex, Box, CircularProgress, Grid, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Receipe({ receipe }) {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
      <Box
        onClick={() => {
          navigate(`/receipes/${receipe._id}`);
        }}
      >
        <RecipeCard
          thumbnail={`${BASE_URL}/uploads/${receipe.images[0]}`}
          title={receipe.name}
          className="receipe_card"
        />
      </Box>
    </Grid>
  );
}

export default Receipe;
