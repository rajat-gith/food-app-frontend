import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Grid, Paper, Box } from "@mui/material";
import { CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ReceipePage() {
  const [receipes, setReceipes] = useState([]);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

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
      <Grid container className="receipe_container" lg={12} spacing="12">
        {receipes.map((key) => (
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <Card
              onClick={() => {
                navigate(`/receipes/${key._id}`);
              }}
              className="receipe_card"
            >
              <CardContent>
                <img src={`${BASE_URL}${key.images[0]}`} alt="" srcset="" />
                <Typography variant="h5">{key.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ReceipePage;
