"use client";

import { useState } from "react";

type Star = {
  id: number;
  character: string;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
};

type StarPosition = {
  left: number;
  top: number;
};

const starCharacters = ["✦", "✧", "⟡", "·"];

// Add, remove, or move coordinates here. Values are percentages of the home page.
const starPositions: StarPosition[] = [
  { left: 74, top: 2 },
  { left: 86, top: 5 },
  { left: 94, top: 8 },
  { left: 90, top: 32 },
  { left: 51, top: 46 },
  { left: 18, top: 55 },
  { left: 42, top: 61 },
  { left: 83, top: 68 },
  { left: 67, top: 76 },
  { left: 93, top: 84 },
  { left: 27, top: 92 },
];

function createStars(): Star[] {
  return starPositions.map((position, id) => {
    return {
      id,
      character: starCharacters[Math.floor(Math.random() * starCharacters.length)],
      left: position.left,
      top: position.top,
      size: 0.45 + Math.random() * 5.1,
      delay: Math.random() * 1.8,
      duration: 2.8 + Math.random() * 6.2,
    };
  });
}

export function Starfield() {
  const [stars] = useState(createStars);

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star) => (
        <span
          className="starfield-star"
          key={star.id}
          style={
            {
              "--star-left": `${star.left}%`,
              "--star-top": `${star.top}%`,
              "--star-size": `${star.size}rem`,
              "--star-delay": `${star.delay}s`,
              "--star-duration": `${star.duration}s`,
            } as React.CSSProperties
          }
        >
          {star.character}
        </span>
      ))}
    </div>
  );
}
