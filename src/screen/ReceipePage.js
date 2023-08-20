import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Grid, Paper, Box } from "@mui/material";
import { CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Receipe from "../components/Receipe";
import CircularProgress from "@mui/material/CircularProgress";
import { receipeList } from "../actions/ReceipeActions";

function ReceipePage() {
  const { error, loading, receipesList } = useSelector(
    (state) => state.receipesList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receipeList());
  }, [dispatch]);

  console.log(receipesList);

  return (
    <div className="ReceipePage">
      <Grid container spacing={2}>
        {receipesList ? (
          receipesList.receipe && Array.isArray(receipesList.receipe) ? (
            receipesList.receipe.map((key) => <Receipe receipe={key} />)
          ) : null
        ) : (
          <CircularProgress className="circularProgress" />
        )}
      </Grid>
    </div>
  );
}

export default ReceipePage;
