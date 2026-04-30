import { useForm } from "react-hook-form";
import { Paper, Box, TextField, Button } from "@mui/material";
import "../css/Signup.css";
import React from "react";
import { signUpUser } from "../api/userService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userIn } from "../features/userSlice";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await signUpUser(data);
      console.log("Signup response data:", res.data);

      const currentUser = {
        ...res.data.user, // ✅ תיקון כאן
        token: res.data.token,
      };

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      dispatch(userIn(currentUser));

      navigate("/");
    } catch (error) {
      console.error("שגיאה בהרשמה:", error.response?.data);
      alert(error.response?.data?.message || "אימייל או סיסמה שגויים");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Paper
          elevation={6} 
          sx={{
            p: 4,
            borderRadius: 3,
            width: 400,
            height: 450,
            backgroundColor: "rgba(255, 255, 255, 0.71)",
            maxWidth: 500,
            marginLeft: "500px",
            mt: 5,
            border: "2px solid rgb(173 194 255)",
          }}
        >
          <h2 style={{ color: "black", marginTop: 0 }}>הירשם</h2>
          <div style={{ color: "black" }}>
            מלאו את הטופס למטה כדי להירשם לאתר
          </div>
          {/* שם */}
          <Box
            sx={{
              mb: 3,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              marginTop: 2,
              marginBottom: 1,
              borderRadius: 2,
              border: "1px solid white",
            }}
          >
            <TextField
              fullWidth
              label="שם פרטי"
              type="text"
              error={!!errors.Name}
              helperText={errors.Name && "יש להזין שם"}
              {...register("Name", { required: true })}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{
                style: {
                  color: "black",
                  right: 30,
                  left: "auto",
                  textAlign: "right",
                },
              }}
            />
          </Box>
          {/* שם משפחה */}
          <Box
            sx={{
              mb: 3,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              marginTop: 2,
              borderRadius: 2,
              border: "1px solid white",
            }}
          >
            <TextField
              fullWidth
              label="שם משפחה"
              type="text"
              error={!!errors.LastName}
              helperText={errors.LastName && "יש להזין שם משפחה"}
              {...register("LastName", { required: true })}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{
                style: {
                  color: "black",
                  right: 30,
                  left: "auto",
                  textAlign: "right",
                },
              }}
            />
          </Box>
          {/* מייל */}
          <Box
            sx={{
              mb: 3,
              backgroundColor: "rgba(255, 255, 255, 0.14)",
              marginTop: 2,
              marginBottom: 1,
              borderRadius: 2,
              border: "1px solid white",
            }}
          >
            <TextField
              fullWidth
              label="מייל"
              error={!!errors.Email}
              helperText={errors.Email && "יש להזין מייל תקין"}
              {...register("Email", {
                required: true,
                pattern: /^\S+@\S+$/,
              })}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{
                style: {
                  color: "black",
                  right: 30,
                  left: "auto",
                  textAlign: "right",
                },
              }}
            />
          </Box>

          {/* סיסמה */}
          <Box
            sx={{
              mb: 3,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              marginTop: 2,
              marginBottom: 0,
              borderRadius: 2,
              border: "1px solid white",
            }}
          >
            <TextField
              fullWidth
              label="סיסמה"
              type="password"
              error={!!errors.Password}
              helperText={errors.Password && "סיסמה 6–12 תווים"}
              {...register("Password", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{
                style: {
                  color: "black",
                  right: 30,
                  left: "auto",
                  textAlign: "right",
                },
              }}
            />
          </Box>

          {/* כפתור שליחה */}
          <Button
            type="submit"
            fullWidth
            sx={{
              marginTop: 3,
              height: 50,
              fontSize: 20,
              backgroundColor: "rgb(173 194 255)",
              color: "black",
            }}
            variant="contained"
          >
            הרשמה
          </Button>
        </Paper>
      </Box>
    </form>
  );
}
