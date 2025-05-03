import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

const LanguageSelector = () => {
  return (
    <div>
      <Box>
        <TextField>Language: </TextField>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Languages</InputLabel>
          <Select>
            <MenuItem>Java</MenuItem>
            <MenuItem>C++</MenuItem>
            <MenuItem>JavaScript</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default LanguageSelector;
