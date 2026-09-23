"use client";

import { useEffect, useState } from "react";

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

const starCharacters = ["✦", "✧", "⟡", "·", "+"];

// Add, remove, or move coordinates here. Values are percentages of the home page.
const starPositions: StarPosition[] = [
    { left: 74, top: 2 },
    { left: 86, top: 5 },
    { left: 94, top: 8 },
    { left: 83, top: 11 },
    { left: 81, top: 14 },
    { left: 97, top: 18 },
    { left: 71, top: 21 },
    { left: 88, top: 24 },
    { left: 27, top: 28 },
    { left: 90, top: 32 },
    { left: 77, top: 36 },
    { left: 96, top: 39 },
    { left: 31, top: 46 },
    { left: 7, top: 48 },
    { left: 11, top: 49 },
    { left: 84, top: 50 },
    { left: 87, top: 52 },
    { left: 18, top: 55 },
    { left: 19, top: 56 },
    { left: 76, top: 58 },
    { left: 95, top: 60 },
    { left: 92, top: 61 },
    { left: 5, top: 64 },
    { left: 14, top: 66 },
    { left: 83, top: 68 },
    { left: 97, top: 70 },
    { left: 91, top: 72 },
    { left: 67, top: 76 },
    { left: 13, top: 78 },
    { left: 5, top: 80 },
    { left: 79, top: 81 },
    { left: 93, top: 84 },
    { left: 3, top: 87 },
    { left: 28, top: 88 },
    { left: 72, top: 90 },
    { left: 27, top: 92 },
    { left: 58, top: 95 },
    { left: 88, top: 97 },
    { left: 12, top: 90 },
    { left: 7, top: 2 },
    { left: 3, top: 15 },
    { left: 10, top: 10 },
    { left: 22, top: 18 },
    { left: 10, top: 30 },
    { left: 19, top: 30 },
    { left: 20, top: 10 },
];

function createStars(): Star[] {
    return starPositions.map((position, id) => {
        return {
            id,
            character: starCharacters[Math.floor(Math.random() * starCharacters.length)],
            left: position.left,
            top: position.top,
            size: 0.15 + Math.random() * 0.8,
            delay: Math.random() * 1.8,
            duration: 2.8 + Math.random() * 7.2,
        };
    });
}

export function Starfield() {
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        setStars(createStars());
    }, []);

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