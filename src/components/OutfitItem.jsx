import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import "../css/outfitItem.css";

export default function OutfitItem({
  outfit,
  onDelete,
}) {
  const middleTemp = (outfit.maxTemp+outfit.minTemp)/2; 
  return (
    <div>
      <ul style={{ listStyle: "none" }} className="product">
        <li>
          {outfit.image ? (
            <img
              src={`/images/${outfit.image}.png`}
              // alt={outfit.mealname}
              className="productpic" 
            />
          ) : (
            <p>אין תמונה זמינה</p>
          )}
        </li>
        <li className="allDescription" key={outfit._id}>
              <div className="buttons">
                <DeleteIcon
                  sx={{
                    fontSize: 30,
                    cursor: "pointer",
                    margin: "5px 0px 0px 5px",
                  }}
                  onClick={() => {
                    if (window.confirm("האם למחוק את המוצר הזה?")) {
                      onDelete(outfit._id);
                    } 
                  }}
                />
          </div>
          <h3 className="temp">טמפרטורה:{Math.floor(middleTemp)}</h3>
          
        </li>
      </ul>
    </div>
  );
}
