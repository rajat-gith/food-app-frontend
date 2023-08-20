import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SimpleImageSlider from "react-simple-image-slider";
import { Expandable } from "@d2iq/ui-kit";
import CircularProgress from "@mui/material/CircularProgress";
import { Card, Box, Modal } from "@mui/material";
import ImageSlider from "../components/ImageSlider";

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
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [openIngredients, setOpenIngredients] = useState(false);
  const handleOpenIngredients = () => setOpenIngredients(true);
  const handleCloseIngredients = () => setOpenIngredients(false);
  const [openSteps, setOpenSteps] = useState(false);
  const handleOpenSteps = () => setOpenSteps(true);
  const handleCloseSteps = () => setOpenSteps(false);

  const fetchReceipe = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/receipes/${params.id}`
      );

      setData(response.data.recipe);
      const imageArray = response.data.recipe.images.map(
        (key) => BASE_URL + "/uploads/" + key
      );
      setImages(imageArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    fetchReceipe();
  }, []);
  return (
    <div className="Receipe_Desc_Page">
      <Card className="ReceipeCard">
        <div className="imageSliderDiv">
          {images ? (
            <ImageSlider images={images} className="image-slider"></ImageSlider>
          ) : (
            <CircularProgress />
          )}
        </div>
        <div className="receipe_desc">
          {data ? (
            <div className="receipe_content">
              <p>{data.name}</p>
              <p className="receipe_description">{data.description}</p>
              <button
                onClick={handleOpenIngredients}
                class="button ingredients-button"
              >
                🥕 Ingredients
              </button>
              <button onClick={handleOpenSteps} class="button steps-button">
                1️⃣ Steps
              </button>

              <Modal open={openIngredients} onClose={handleCloseIngredients}>
                <Box sx={style}>
                  {data.ingredients[0].split(",").map((key) => (
                    <div className="ingredients_list">
                      <li>{key}</li>
                    </div>
                  ))}
                </Box>
              </Modal>

              <Modal open={openSteps} onClose={handleCloseSteps}>
                <Box sx={style}>
                  {data.steps[0].split(",").map((key) => (
                    <div className="steps_list">
                      <li>{key}</li>
                    </div>
                  ))}
                </Box>
              </Modal>
            </div>
          ) : (
            <CircularProgress />
          )}
        </div>
      </Card>
    </div>
  );
}

export default ReceipeDescription;
