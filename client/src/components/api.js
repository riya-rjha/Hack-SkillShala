import axios from "axios";
import { LANGUAGE_VERSIONS } from "../constants.js";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode, stdin = "") => {
  const mappedLanguage =
    language === "cpp" ? "c++" : language;

  console.log("LANG:", mappedLanguage);
  console.log("VERSION:", LANGUAGE_VERSIONS[mappedLanguage]);

  const response = await API.post("/execute", {
    language: mappedLanguage,
    version: LANGUAGE_VERSIONS[mappedLanguage],
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin: stdin,
  });

  return response.data;
};