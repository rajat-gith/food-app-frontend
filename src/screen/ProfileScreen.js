import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userAddReceipe,
  userEditReceipe,
  userReceipe,
} from "../actions/UserActions";
import { CircularProgress } from "@mui/material";
import { Card, Box, Modal } from "@mui/material";
import { Button, TextField, Typography, Container, Paper } from "@mui/material";

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

function ProfileScreen() {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { error, loading, userInfo } = useSelector((state) => state.userLogin);
  const [receipe, setReceipe] = useState();
  const dispatch = useDispatch();
  const { e, l, userReceipeInfo } = useSelector((state) => state.userReceipe);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [images, setImages] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [currentId, setCurrentId] = useState();

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleCloseEditModal = () => setOpenEditModal(false);

  useEffect(() => {
    if (userInfo.user.id) {
      dispatch(userReceipe(userInfo.user.id));
    }
  }, [dispatch, userInfo.user.id]);

  useEffect(() => {
    if (userReceipeInfo) {
      setReceipe(userReceipeInfo);
    }
  }, [userReceipeInfo]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImages(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    for (const image of images) {
      formData.append("images", image);
    }
    try {
      dispatch(userAddReceipe(formData));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const updateData = {
      name: name,
      ingredients: ingredients,
      description: description,
      steps: steps,
    };
    
    try {
      dispatch(userEditReceipe(updateData, currentId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="profile_page">
      <div className="profile-container">
        <div className="user-info">
          <div className="info">
            <p>Name:{userInfo.user.name}</p>
            <p>Email: {userInfo.user.email}</p>
          </div>

          <button onClick={handleOpen}>Add Receipe</button>
        </div>
        <div className="recipe-list">
          <h3>Your Recipes:</h3>
          <ul>
            {receipe ? (
              receipe.map((recipe) => (
                <div className="receipeCard">
                  <img
                    src={`${BASE_URL}/uploads/${recipe.images[0]}`}
                    alt=""
                    srcset=""
                  />
                  <div className="recipeContent">
                    <li>Name : {recipe.name}</li>
                    <p> {recipe.description}</p>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setOpenEditModal(true);
                        setCurrentId(recipe._id);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <CircularProgress />
            )}
          </ul>
        </div>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Container maxWidth="sm">
              <Paper className="container">
                <Typography variant="h5" gutterBottom>
                  Create Recipe
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    className="textfield"
                    label="Name"
                    fullWidth
                    value={name}
                    style={{ marginBottom: "15px" }}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    className="textfield"
                    label="Description"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    value={description}
                    style={{ marginBottom: "15px" }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <TextField
                    className="textfield"
                    label="Ingredients"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    value={ingredients}
                    style={{ marginBottom: "15px" }}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                  <TextField
                    className="textfield"
                    style={{ marginBottom: "15px" }}
                    label="Steps"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ marginBottom: "15px" }}
                  />
                  <Button
                    className="button"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Create Recipe
                  </Button>
                </form>
              </Paper>
            </Container>
          </Box>
        </Modal>

        <Modal open={openEditModal} onClose={handleCloseEditModal}>
          <Box sx={style}>
            <Container maxWidth="sm">
              <Paper className="container">
                <Typography variant="h5" gutterBottom>
                  Create Recipe
                </Typography>
                <form onSubmit={handleEditSubmit}>
                  <TextField
                    className="textfield"
                    label="Name"
                    fullWidth
                    value={name}
                    style={{ marginBottom: "15px" }}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    className="textfield"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    style={{ marginBottom: "15px" }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <TextField
                    className="textfield"
                    label="Ingredients"
                    fullWidth
                    multiline
                    rows={4}
                    value={ingredients}
                    style={{ marginBottom: "15px" }}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                  <TextField
                    className="textfield"
                    style={{ marginBottom: "15px" }}
                    label="Steps"
                    fullWidth
                    multiline
                    rows={4}
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ marginBottom: "15px" }}
                  />
                  <Button
                    className="button"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Edit Recipe
                  </Button>
                </form>
              </Paper>
            </Container>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default ProfileScreen;
