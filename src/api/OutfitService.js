import axios from "axios";
import {myStore} from "../app/store.js";

let baseUrl = `${import.meta.env.VITE_API_URL}/outfits`;
console.log("API Base URL outfit:", baseUrl);

// function getToken() {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     return currentUser?.token;
//     // const state = myStore.getState();
//     // return state.user.currentUser?.token;
// }
function getToken() {
    // קודם מ־Redux
    const state = myStore.getState();
    const reduxToken = state.user.currentUser?.token;
    if (reduxToken) return reduxToken;
  
    // אם אין ב־Redux, לבדוק ב־localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser?.token;
  }

export function getOutfits() {
    let url = baseUrl;
    return axios.get(url, {
        headers: { Authorization: getToken() },
      });
    
}
export const addOutfit = async (outfit) => {
    return axios.post(baseUrl, outfit, {
        headers: { Authorization: getToken() },
      });
    };
export const deleteOutfitFromServer = (id) => {
    return axios.delete(`${baseUrl}/${id}`, {
        headers: { Authorization: getToken() },
      });
    };


// import axios from "axios";

// const API_URL = "http://localhost:3001/outfits"; // השרת שלך

// // מביא את כל הארון של המשתמש המחובר
// export const getOutfits = () => {
//   const token = localStorage.getItem("token");
//   return axios.get(API_URL, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // מביא בגדים שמתאימים לטמפרטורה מסוימת
// export const getOutfitsByTemp = (temp) => {
//   const token = localStorage.getItem("token");
//   return axios.get(`${API_URL}/temp/${temp}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // יצירת בגד חדש
// export const createOutfitOnServer = (data) => {
//   const token = localStorage.getItem("token");
//   return axios.post(API_URL, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // מחיקת בגד
// export const deleteOutfitFromServer = (id) => {
//   const token = localStorage.getItem("token");
//   return axios.delete(`${API_URL}/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };
// export const addOutfit = async (outfit) => {
//   const token = localStorage.getItem("token");
//     return axios.post(API_URL, outfit, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     };