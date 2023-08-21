import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Grid, Paper, Box } from "@mui/material";
import { CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Receipe from "../components/Receipe";
import CircularProgress from "@mui/material/CircularProgress";
import { receipeList } from "../actions/ReceipeActions";
import { TextField } from "@mui/material";

function ReceipePage() {
  const { error, loading, receipesList } = useSelector(
    (state) => state.receipesList
  );
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(receipeList(searchQuery));
  };

  useEffect(() => {
    dispatch(receipeList(""));
  }, [dispatch]);
  
  return (
    <div className="ReceipePage">
      <form className="searchForm" onSubmit={handleSearch}>
        <TextField
          label="Search"
          style={{ marginRight: "2px" }}
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ marginRight: "2px" }}
          color="primary"
          type="submit"
        >
          Search
        </Button>
      </form>
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
