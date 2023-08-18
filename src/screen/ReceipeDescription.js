import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";

function ReceipeDescription() {
  const params = useParams();
  console.log(params.id);

  const fetchReceipe = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/receipes/${params.id}`
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReceipe();
  }, []);
  return <div></div>;
}

export default ReceipeDescription;
