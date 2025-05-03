import { useEffect, useState } from 'react';

const getPointAtLength = (path, length) => {
  const point = path.getPointAtLength(length);
  return { x: point.x, y: point.y };
};

const RoadmapStep = (pathRef, totalSteps) => {
  const [labelPositions, setLabelPositions] = useState([]);
  const [visibleLabels, setVisibleLabels] = useState(0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    const positions = [];

    // Always place first at 0, last at end, rest spaced in between
    const steps = totalSteps;
    const spacing = pathLength / (steps - 1);

    for (let i = 0; i < steps; i++) {
      const pos = getPointAtLength(path, spacing * i);
      positions.push(pos);
    }

    setLabelPositions(positions);

    // Animate labels appearing one by one
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count > steps) {
        clearInterval(interval);
      } else {
        setVisibleLabels(count);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [pathRef, totalSteps]);

  return { labelPositions, visibleLabels };
};

export default RoadmapStep;
