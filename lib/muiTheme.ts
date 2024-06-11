import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#637bff60",
      contrastText: "black",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#637bff90",
      contrastText: "white",
    },
  },
});

export { lightTheme, darkTheme };
