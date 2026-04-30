import { useForm } from "react-hook-form";
import { Paper, Box, TextField, Button } from "@mui/material";
import React from "react";
import { addOutfit } from "../api/OutfitService";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// יצירת cache ל־RTL
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin], 
});

// יצירת נושא עם RTL 
const theme = createTheme({ 
  direction: "rtl",
  palette: { mode: "light" },
});

export default function addproduct() {
  const { register,handleSubmit,formState: { errors },reset} = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await addOutfit(data);
      console.log("הרשמה מוצר הצליחה:", response.data);
      alert("הרשמת מוצר הצליחה!");
      reset({ userName:"",});
    } catch (error) {
      console.error("אי אפשר ליצור מוצר חדש"+" "+error.response?.data?.message);
      alert("שגיאה ביצירת מוצר חדש");
    }
  };



  return ( 
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{minHeight: "100vh",display: "flex",justifyContent: "center",alignItems: "center",
        backgroundSize: "cover",backgroundPosition: "center",margin:"0px 550px 0px 0px"
      }}>
      <Paper elevation={6} sx={{ p: 4,borderRadius: 3,width: 400, height: 390,backgroundColor: "rgb(255, 255, 255)",  maxWidth: 500,mt: 5,
        border: "2px solid rgb(173 194 255)"
      }}>
               <h2 style={{ color: "black" ,marginTop:0,marginBottom:5,padding:0}}>הוספת מוצר לאתר</h2>
          <div style={{ color: "black" ,marginTop:0,marginBottom:15}}>
          מלאו את הטופס למטה כדי ליצור מוצר חדש
          </div>
<Box sx={{ mb: 2}}>
                <TextField
                  fullWidth
                  label="טמפרטורה מינימלית" 
                  type="number"
                  error={!!errors.maxTemp}
                  helperText={errors.maxTemp && "יש להזין טמפרטורה תקינה"}
                  {...register("maxTemp",
                    {
                      required: true,
                      min: 0,
                      valueAsNumber: true
                    })}
                  InputProps={{
                    style: {
                      color: "black",
                      textAlign: "right"
                    }
                  }}
                  InputLabelProps={{
                    style: {
                      color: "black",
                      textAlign: "right",
                      right: 0,
                      left: "auto"
                    }
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": { borderColor: "black" },
                    },
                  }}
                />
              </Box>
              <Box sx={{ mb: 2}}>
                <TextField
                  fullWidth
                  label=" טמפרטורה מקסימלית"
                  type="number"
                  error={!!errors.minTemp}
                  helperText={errors.minTemp && "יש להזין טמפרטורה תקינה"}
                  {...register("minTemp", { required: true, min: 0, valueAsNumber: true })}
                  InputProps={{ style: { color: "black", textAlign: "right" } }}
                  InputLabelProps={{ style: { color: "black", textAlign: "right", right: 0, left: "auto" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": { borderColor: "black" },
                    },
                  }}
                />
              </Box>

        <Box sx={{ mb: 2}}>
                <TextField
                  fullWidth
                  label="תמונת הבגד"
                  type="file"
                  error={!!errors.image}
                  helperText={errors.image && "יש להזין תמונת הבגד"}
                  {...register("image", { required: true })}
                  InputProps={{ style: { color: "black", textAlign: "right" } }}
                  InputLabelProps={{ style: { color: "black", textAlign: "right", right: 0, left: "auto" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": { borderColor: "black" },
                    },
                  }}
                />
              </Box>
        {/* כפתור שליחה */}
        <Button type="submit" fullWidth sx={{marginTop:3, height: 50,fontSize: 20,backgroundColor: "rgb(173 194 255)",color: "black",
          }}variant="contained">
          הכנסת הבגד לארון
        </Button>
      </Paper>
      </Box>
      </form>
      </ThemeProvider>
    </CacheProvider>
  );
}




