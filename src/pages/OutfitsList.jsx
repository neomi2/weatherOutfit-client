import { useEffect, useState } from "react";
// import OutfittItem from "../components/OutfitItem";
import { getOutfits } from "../api/OutfitService";
import "../css/OutfitList.css";
import { CircularProgress, Paper, Box, TextField, Button } from "@mui/material";
import { deleteOutfitFromServer } from "../api/OutfitService";
import React from "react";
import OutfitItem from "../components/outfitItem";
import { useSelector } from "react-redux"; 
// import { getOutfitsByTemp } from "../api/OutfitService";



const OutfitssList = () => { 
  let [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(false);
  let user = useSelector((state) => state.user.currentUser);

  async function fetchOutfits() {
    setLoading(true);
    try {
      const res = await getOutfits();
      setOutfits(res.data);
    } catch (error) {
      console.error("שגיאה בטעינת הבגדים:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchOutfits();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteOutfitFromServer(id);
      setOutfits((prev) => prev.filter((outfit) => outfit._id !== id));
    } catch (error) {
      console.error("שגיאה במחיקה:", error);
      alert("המחיקה נכשלה");
    }
  };

  
  return (
          <Box
      sx={{
        minHeight: "100vh", // גובה כל המסך
        width:"1520px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"white",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
    <div>
      <h1 className="up">הארון של {user ? user.Name : "אורח"}</h1>
      {/* {outfits.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>הארון ריק כרגע</h2>
      ) : ( */}
        <div className="onemeal">
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "300px",
                marginRight: 45,
                margin: "0px 0px 0px 400px"
              }}
            >
              <>
                <svg width={0} height={0}>
                  <defs>
                    <linearGradient
                      id="loaderGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="rgb(255, 255, 255)" />
                      <stop offset="50%" stopColor="rgb(183, 160, 247)" />
                      <stop offset="100%" stopColor="rgb(123, 159, 250)" />
                    </linearGradient>
                  </defs>
                </svg>

                <CircularProgress
                  size={60}
                  thickness={4}
                  sx={{
                    "svg circle": {
                      stroke: "url(#loaderGradient)",
                      strokeLinecap: "round",
                    },
                  }}
                />
              </>
                </Box>
                 ) : outfits.length === 0 ? (
                  <h2 style={{ textAlign: "center" }}>הארון ריק כרגע</h2>
          ) : (
            outfits.map((outfit) => (
              <OutfitItem
                key={outfit._id}
                outfit={outfit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      {/* )} */}
    </div>

     </Box>
  );
};

export default OutfitssList;
