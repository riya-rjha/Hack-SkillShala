import React from 'react'
import { useRef } from "react";
import { motion } from "framer-motion";
import RoadmapStep from "./RoadmapStep";
import "./Roadmap.css";
import Image1 from "../assets/roadmap-img-1.png"; // your existing CSS for the roadmap
import Image2 from "../assets/roadmap-img-2.png"; // your existing CSS for the roadmap
import Image3 from "../assets/roadmap-img-3.png"; // your existing CSS for the roadmap
import Image4 from "../assets/roadmap-img-4.png"; // your existing CSS for the roadmap
import Image5 from "../assets/roadmap-img-5.png"; // your existing CSS for the roadmap
import Image6 from "../assets/roadmap-img-6.png"; // your existing CSS for the roadmap
import Image7 from "../assets/roadmap-img-7.png"; // your existing CSS for the roadmap

const labels = [
  "Login/Register",
  "Take Assessment",
  "Get Roadmap",
  "Mock Interviews",
  "Final Review",
  "Get Offer",
  "Get Placed",
];

const imageList = [
  Image7,
  Image6,
  Image5,
  Image4,
  Image3,
  Image2,
  Image1, // last image (end)
];

const Roadmap = () => {
  const pathRef = useRef(null);
  const { visibleLabels, labelPositions } = RoadmapStep(
    pathRef,
    imageList.length
  );

  return (
    <div className="roadmap">
      <h1>
        <u>THE GROWTH ROADMAP</u>
      </h1>
      <svg
        width="100%"
        height="auto"
        viewBox="0 0 1500 1400"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block"}}
      >
        <motion.path
          ref={pathRef}
          d="
            M 700 60 C 1035.4 88.2 1080.4 103.8 1090.6 130.8 
            C 1099 224.4 282.4 144 268.6 216 
            C 211.6 358.8 1250.2 316.8 1273.6 442.8 
            C 1297 540 407.8 491.4 374.2 580.2 
            C 350.8 652.2 611.8 711.6 698.8 789
          "
          stroke="#ffffff"
          strokeWidth="10"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, ease: "easeInOut" }}
        />

        {/* Label Below or Above Image */}
        {labelPositions.slice(0, visibleLabels).map((pos, idx) => (
          <foreignObject
            key={`label-${idx}`}
            x={pos.x - 75}
            y={pos.y + 60} // pushes label slightly below image
            width="150"
            height="60"
            style={{ overflow: "visible" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.5 }}
              style={{
                color: "black",
                fontSize: "1rem",
                fontWeight: "bold",
                textAlign: "center",
                width: "100%",
                padding: "4px",
                background: "#18E4C7",
                border:"5px solid #fff",
                borderRadius: "8px",
              }}
            >
              {labels[idx]}
            </motion.div>
          </foreignObject>
        ))}

        {labelPositions.slice(0, visibleLabels).map((pos, idx) => (
          <foreignObject
            key={idx}
            x={pos.x - 50}
            y={pos.y - 50}
            width="100"
            height="100"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.5 }}
              style={{ width: "100%", height: "100%" }}
            >
              <img
                src={`${imageList[idx]}`}
                alt={`Roadmap ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
              />
            </motion.div>
          </foreignObject>
        ))}
      </svg>
    </div>
  );
};

export default Roadmap;
