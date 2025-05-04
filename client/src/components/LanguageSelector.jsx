// LanguageSelector.js
import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { LANGUAGE_VERSIONS } from "../constants";
const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <Box sx={{ m: 2, minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          value={language}
          label="Language"
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map(([language, version]) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
