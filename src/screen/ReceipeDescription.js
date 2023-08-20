import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SimpleImageSlider from "react-simple-image-slider";
import { Expandable } from "@d2iq/ui-kit";
import CircularProgress from "@mui/material/CircularProgress";
import { Card, Box, Modal } from "@mui/material";
import ImageSlider from "../components/ImageSlider";
import { useDispatch, useSelector } from "react-redux";
import { receipeListById } from "../actions/ReceipeActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FFFFFF",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  maxHeight: "80vh",
  overflowY: "auto",
};

function ReceipeDescription() {
  const params = useParams();
  const [data, setData] = useState();
  const [images, setImages] = useState();
  const [openIngredients, setOpenIngredients] = useState(false);
  const handleOpenIngredients = () => setOpenIngredients(true);
  const handleCloseIngredients = () => setOpenIngredients(false);
  const [openSteps, setOpenSteps] = useState(false);
  const handleOpenSteps = () => setOpenSteps(true);
  const handleCloseSteps = () => setOpenSteps(false);
  const dispatch = useDispatch();
  const { error, loading, receipeById } = useSelector((state) => state.receipe);

  const fetchReceipe = async () => {
    try {
      dispatch(receipeListById(params.id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReceipe();
  }, [dispatch, params.id]);

  return (
    <div className="Receipe_Desc_Page">
      <Card className="ReceipeCard">
        <div className="imageSliderDiv">
          {receipeById ? (
            <ImageSlider
              images={receipeById.recipe.images}
              className="image-slider"
            ></ImageSlider>
          ) : (
            <CircularProgress />
          )}
        </div>
        <div className="receipe_desc">
          {receipeById ? (
            <div className="receipe_content">
              <p>{receipeById.recipe.name}</p>
              <p className="receipe_description">
                {receipeById.recipe.description}
              </p>
              <button
                onClick={handleOpenIngredients}
                class="button ingredients-button"
              >
                🥕 Ingredients
              </button>
              <button onClick={handleOpenSteps} class="button steps-button">
                1️⃣ Steps
              </button>
            </div>
          ) : (
            <CircularProgress />
          )}
        </div>
      </Card>
      <Modal open={openSteps} onClose={handleCloseSteps}>
        <Box sx={style}>
          {receipeById ? (
            receipeById.recipe.steps[0].split(",").map((key) => (
              <div className="steps_list">
                <li>{key}</li>
              </div>
            ))
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Modal>

      <Modal open={openIngredients} onClose={handleCloseIngredients}>
        <Box sx={style}>
          {receipeById ? (
            receipeById.recipe.ingredients[0].split(",").map((key) => (
              <div className="ingredients_list">
                <li>{key}</li>
              </div>
            ))
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default ReceipeDescription;
