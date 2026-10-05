"use client";

import { useEffect, useState } from "react";

type Doodle = {
    id: number;
    left: number;
    top: number;
    size: number;
    delay: number;
    duration: number;
    rotation: number;
    shape: number;
};

const strokeDuration = 0.42;
const holdDuration = 1.25;

type DoodlePosition = {
    left: number;
    top: number;
};

const doodleDrawings = [
    [
        "M 50 5 C 48 18 54 27 62 36 L 95 34",
        "M 95 34 C 82 41 74 48 67 57 L 79 91",
        "M 79 91 C 67 81 59 74 50 69 L 21 91",
        "M 21 91 C 28 77 31 66 33 56 L 5 36",
        "M 5 36 C 20 34 30 35 39 36 L 50 5",
    ],
    [
        "M 49 4 C 48 17 53 27 61 37 L 93 29",
        "M 93 29 C 83 41 74 48 67 55 L 86 80",
        "M 86 80 C 71 77 60 69 55 67 L 40 96",
        "M 40 96 C 36 80 34 68 34 63 L 3 59",
        "M 3 59 C 17 48 28 42 33 43 L 49 4",
    ],
    [
        "M 50 5 C 49 17 56 27 62 34 L 95 36",
        "M 95 36 C 81 44 73 51 68 56 L 79 90",
        "M 79 90 C 64 81 57 73 50 70 L 20 90",
        "M 20 90 C 28 75 32 64 31 56 L 5 36",
        "M 5 36 C 20 33 31 36 38 34 L 50 5",
    ],
    [
        "M 48 5 C 50 17 56 28 65 35 L 96 40",
        "M 96 40 C 83 47 73 51 66 59 L 76 93",
        "M 76 93 C 64 84 57 74 49 70 L 23 88",
        "M 23 88 C 29 74 32 64 32 55 L 4 35",
        "M 4 35 C 20 33 31 35 39 36 L 48 5",
    ],
];

// Add, remove, or move coordinates here. Values are percentages of the viewport.
const doodlePositions: DoodlePosition[] = [
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

function createDoodles(): Doodle[] {
    return doodlePositions.map((position, id) => {
        const shape = Math.floor(Math.random() * doodleDrawings.length);
        const strokeCount = doodleDrawings[shape].length;

        return {
            id,
            left: position.left,
            top: position.top,
            size: 0.3 + Math.random() * 0.85,
            delay: Math.random() * 8,
            duration: strokeCount * strokeDuration + holdDuration + 0.8,
            rotation: Math.random() * 50 - 25,
            shape,
        };
    });
}

export function Notepad() {
    const [doodles, setDoodles] = useState<Doodle[]>([]);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        setDoodles(createDoodles());
        const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updateMotionPreference = () => setReducedMotion(motionPreference.matches);

        updateMotionPreference();
        motionPreference.addEventListener("change", updateMotionPreference);

        return () => motionPreference.removeEventListener("change", updateMotionPreference);
    }, []);

    return (
        <div className="notepad" aria-hidden="true">
            {doodles.map((doodle) => {
                const strokes = doodleDrawings[doodle.shape];
                const fadeStart = (strokes.length * strokeDuration + holdDuration) / doodle.duration;

                return (
                    <svg
                        className="notepad-doodle"
                        key={doodle.id}
                        opacity={reducedMotion ? 0.35 : 0}
                        style={{
                            position: "absolute",
                            left: `${doodle.left}%`,
                            top: `${doodle.top}%`,
                            width: `${doodle.size}rem`,
                            height: `${doodle.size}rem`,
                            overflow: "visible",
                            transform: `rotate(${doodle.rotation}deg)`,
                        }}
                        viewBox="0 0 100 100"
                    >
                        {!reducedMotion && (
                            <animate
                                attributeName="opacity"
                                values="0;0.35;0.35;0"
                                keyTimes={`0;0.04;${fadeStart};1`}
                                dur={`${doodle.duration}s`}
                                begin={`${doodle.delay}s`}
                                repeatCount="indefinite"
                            />
                        )}
                        {strokes.map((stroke, index) => {
                            const strokeStart = index * strokeDuration / doodle.duration;
                            const strokeEnd = (index + 1) * strokeDuration / doodle.duration;
                            const keyTimes = index === 0
                                ? `0;${strokeEnd};${fadeStart};1`
                                : `0;${strokeStart};${strokeEnd};${fadeStart};1`;
                            const values = index === 0
                                ? "100;0;0;100"
                                : "100;100;0;0;100";

                            return (
                                <path
                                    key={index}
                                    d={stroke}
                                    pathLength={100}
                                    strokeDasharray={100}
                                    strokeDashoffset={reducedMotion ? 0 : 100}
                                    fill="none"
                                    stroke="var(--accent-light)"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    {!reducedMotion && (
                                        <animate
                                            attributeName="stroke-dashoffset"
                                            values={values}
                                            keyTimes={keyTimes}
                                            dur={`${doodle.duration}s`}
                                            begin={`${doodle.delay}s`}
                                            repeatCount="indefinite"
                                        />
                                    )}
                                </path>
                            );
                        })}
                    </svg>
                );
            })}
        </div>
    );
}