import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Grid, Paper, Box } from "@mui/material";
import { CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Receipe from "../components/Receipe";

function ReceipePage() {
  const [receipes, setReceipes] = useState([]);

  const fetchReceipe = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/receipes/");
      setReceipes(response.data.receipe);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReceipe();
  }, []);

  return (
    <div className="ReceipePage">
      <Grid container spacing={2}>
        {receipes && Array.isArray(receipes)
          ? receipes.map((key) => <Receipe receipe={key} />)
          : null}
      </Grid>
    </div>
  );
}

export default ReceipePage;
