import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure you have installed axios: npm install axios
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  CircularProgress,
  List,
  ListItem,
  Divider,
  Box,
  Paper,
} from "@mui/material";

const PersonalizedRoadmap = () => {
  const location = useLocation();
  const submissions = location.state?.submittedData || [];

  const [analysisList, setAnalysisList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllAnalyses = async () => {
      setLoading(true);
      try {
        // Loop over submissions and fetch analysis for each
        const results = [];
        for (const sub of submissions) {
          const response = await axios.post("http://localhost:3000/analyze", {
            id: sub.id,
          });
          results.push({
            ...sub,
            analysis: response.data,
          });
        }
        setAnalysisList(results);
      } catch (err) {
        console.error("Error fetching analysis:", err.message);
        // If needed, mark errors on each submission
        setAnalysisList(
          submissions.map((sub) => ({
            ...sub,
            analysis: {
              error:
                "An error occurred while fetching your analysis. Please try again.",
            },
          }))
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllAnalyses();
  }, [submissions]);

  if (!submissions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h2 className="text-2xl text-red-700 font-bold">
          Oops! No submissions found.
        </h2>
      </div>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h5" component="h1" gutterBottom color="primary">
          Hey there, I'm Abhyaas Gurum!
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Let's dive into your personalized reports!
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={10}>
          <CircularProgress size={60} color="primary" />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {analysisList.map((sub, index) => (
            <Grid item xs={24} key={index}>
              <Card variant="outlined">
                <CardHeader
                  title={`Submission ${index + 1}`}
                  titleTypographyProps={{ variant: "h5", color: "primary" }}
                />
                <CardContent>
                  <Typography variant="subtitle1" color="secondary" gutterBottom>
                    Question
                  </Typography>
                  <Typography variant="body1" mb={2}>
                    {sub.problem_title}
                  </Typography>

                  <Typography variant="subtitle1" color="secondary" gutterBottom>
                    Your Code
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      bgcolor: "#f5f5f5",
                      fontFamily: "monospace",
                      whiteSpace: "pre-wrap",
                      overflowX: "auto",
                      mb: 3,
                      fontSize: "18px"
                    }}
                  >
                    {sub.user_code}
                  </Paper>

                  {/* Analysis */}
                  {sub.analysis?.error ? (
                    <Card sx={{ bgcolor: "#ffebee", mb: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle1" color="error" gutterBottom>
                          Analysis Failed
                        </Typography>
                        <Typography variant="body2">{sub.analysis.error}</Typography>
                      </CardContent>
                    </Card>
                  ) : (
                    sub.analysis && (
                      <Box>
                        {/* Optimal Solution */}
                        <Card sx={{ mb: 3 }} variant="outlined">
                          <CardContent>
                            <Typography variant="subtitle1" color="secondary" gutterBottom>
                              Optimal Solution & Comparison
                            </Typography>
                            <Paper
                              variant="outlined"
                              sx={{
                                p: 2,
                                bgcolor: "#f5f5f5",
                                fontFamily: "monospace",
                                whiteSpace: "pre-wrap",
                                overflowX: "auto",
                                mb: 2,
                                fontSize: "18px"
                              }}
                            >
                              {sub.analysis.correctSolution}
                            </Paper>
                            <Typography variant="body2" color="textSecondary">
                              {sub.analysis.comparison}
                            </Typography>
                          </CardContent>
                        </Card>

                        {/* Strengths */}
                        <Card sx={{ mb: 2 }} variant="outlined">
                          <CardContent>
                            <Typography variant="subtitle1" color="success.main" gutterBottom>
                              Your Strengths
                            </Typography>
                            <List dense>
                              {sub.analysis.strengths.map((item, idx) => {
                                const text = item.replace(/^- /, '');
                                const parts = text.split(/(\*\*.*?\*\*)/g); // Split by bold patterns

                                return (
                                  <ListItem
                                    key={idx}
                                    sx={{
                                      pl: 0,
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                    }}
                                  >
                                    <Box
                                      component='span'
                                      sx={{
                                        display: 'inline-block',
                                        width: '6px',
                                        mr: 2,
                                      }}
                                    >
                                      •
                                    </Box>
                                    <Typography
                                      variant='body2'
                                      sx={{
                                        fontSize: '16px !important', color: 'text.primary', '&, & *': {
                                          fontSize: '16px !important',
                                        },
                                      }}
                                      component='span'
                                    >
                                      {parts.map((part, i) =>
                                        part.startsWith('**') && part.endsWith('**') ? (
                                          <Box
                                            key={i}
                                            component='span'
                                            sx={{ fontWeight: 'bold' }}
                                          >
                                            {part.slice(2, -2)}
                                          </Box>
                                        ) : (
                                          <Box key={i} component='span'>
                                            {part}
                                          </Box>
                                        )
                                      )}
                                    </Typography>
                                  </ListItem>
                                );
                              })}
                            </List>
                          </CardContent>
                        </Card>


                        {/* Weaknesses */}
                        <Card sx={{ mb: 2 }} variant="outlined">
                          <CardContent>
                            <Typography variant="subtitle1" color="warning.main" gutterBottom>
                              Areas to Improve
                            </Typography>
                            <List dense>
                              {sub.analysis.weaknesses.map((item, idx) => {
                                const text = item.replace(/^- /, '');
                                const parts = text.split(/(\*\*.*?\*\*)/g); // Split around bold markers

                                return (
                                  <ListItem
                                    key={idx}
                                    sx={{
                                      pl: 0,
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                    }}
                                  >
                                    <Box
                                      component="span"
                                      sx={{
                                        display: 'inline-block',
                                        width: '6px',
                                        mr: 2,
                                      }}
                                    >
                                      •
                                    </Box>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontSize: '16px !important', color: 'text.primary', '&, & *': {
                                          fontSize: '16px !important',
                                        },
                                      }}
                                      component="span"
                                    >
                                      {parts.map((part, i) =>
                                        part.startsWith('**') && part.endsWith('**') ? (
                                          <Box
                                            key={i}
                                            component="span"
                                            sx={{ fontWeight: 'bold' }}
                                          >
                                            {part.slice(2, -2)}
                                          </Box>
                                        ) : (
                                          <Box key={i} component="span">
                                            {part}
                                          </Box>
                                        )
                                      )}
                                    </Typography>
                                  </ListItem>
                                );
                              })}
                            </List>

                          </CardContent>
                        </Card>

                        {/* Roadmap */}
                        <Card sx={{ mb: 2 }} variant="outlined">
                          <CardContent>
                            <Typography variant="subtitle1" color="info.main" gutterBottom>
                              Your Learning Roadmap
                            </Typography>
                            <List dense>
                              {sub.analysis.roadmap.map((item, idx) => {
                                const text = item.replace(/^- /, "");
                                const parts = text.split(/(\*\*.*?\*\*)/g); // Split around bold segments

                                return (
                                  <ListItem
                                    key={idx}
                                    sx={{
                                      pl: 0,
                                      display: "flex",
                                      alignItems: "flex-start",
                                    }}
                                  >
                                    <Box
                                      component="span"
                                      sx={{
                                        display: "inline-block",
                                        width: "6px",
                                        mr: 2,
                                      }}
                                    >
                                      •
                                    </Box>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontSize: "16px !important", color: "text.primary", '&, & *': {
                                          fontSize: '16px !important',
                                        },
                                      }}
                                      component="span"
                                    >
                                      {parts.map((part, i) =>
                                        part.startsWith("**") && part.endsWith("**") ? (
                                          <Box key={i} component="span" sx={{ fontWeight: "bold" }}>
                                            {part.slice(2, -2)}
                                          </Box>
                                        ) : (
                                          <Box key={i} component="span">
                                            {part}
                                          </Box>
                                        )
                                      )}
                                    </Typography>
                                  </ListItem>
                                );
                              })}
                            </List>

                          </CardContent>
                        </Card>

                        {/* Alternatives */}
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="subtitle1" color="secondary" gutterBottom>
                              Alternative Approaches
                            </Typography>
                            <List dense>
                              {sub.analysis.alternatives.map((item, idx) => {
                                const text = item.replace(/^- /, "");
                                const parts = text.split(/(\*\*.*?\*\*)/g); // Split to detect bold text

                                return (
                                  <ListItem
                                    key={idx}
                                    sx={{
                                      pl: 0,
                                      display: "flex",
                                      alignItems: "flex-start",
                                    }}
                                  >
                                    {/* Bullet */}
                                    <Box
                                      component="span"
                                      sx={{
                                        display: "inline-block",
                                        width: "6px",
                                        mr: 2,
                                      }}
                                    >
                                      •
                                    </Box>

                                    {/* Text with bold handling */}
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontSize: "16px !important", color: "text.primary", '&, & *': {
                                          fontSize: '16px !important',
                                        }
                                      }}
                                      component="span"
                                    >
                                      {parts.map((part, i) =>
                                        part.startsWith("**") && part.endsWith("**") ? (
                                          <Box key={i} component="span" sx={{ fontWeight: "bold" }}>
                                            {part.slice(2, -2)} {/* Remove ** wrapping */}
                                          </Box>
                                        ) : (
                                          <Box key={i} component="span">
                                            {part}
                                          </Box>
                                        )
                                      )}
                                    </Typography>
                                  </ListItem>
                                );
                              })}
                            </List>

                          </CardContent>
                        </Card>
                      </Box>
                    )
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default PersonalizedRoadmap;
