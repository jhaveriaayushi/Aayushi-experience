"use client";

import { useEffect, useRef, useState } from "react";

type Brick = {
  x: number;
  y: number;
  width: number;
  height: number;
  skill: string;
  colour: string;
  visible: boolean;
};

const skills = [
  "AI",
  "Product",
  "Python",
  "React",
  "Next.js",
  "Azure",
  "Power Automate",
  "SharePoint",
  "Consulting",
  "Strategy",
  "UX",
  "Data",
  "Engineering",
  "Automation",
  "Public Sector",
];

const colours = [
  "#f97316",
  "#ec4899",
  "#8b5cf6",
  "#06b6d4",
  "#22c55e",
  "#eab308",
];

export default function SkillsBrickGame() {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);


  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;

    const width = 900;
    const height = 560;

    canvas.width = width;
    canvas.height = height;

    let paddleX = width / 2 - 70;
    const paddleY = height - 45;
    const paddleWidth = 140;
    const paddleHeight = 14;

    let ballX = width / 2;
    let ballY = height - 80;
    const ballRadius = 9;
    let ballSpeedX = 4;
    let ballSpeedY = -4;

    const brickRows = 3;
    const brickCols = 5;
    const brickWidth = 145;
    const brickHeight = 48;
    const brickGap = 15;
    const brickStartX = 55;
    const brickStartY = 65;

    let localScore = 0;
    let gameWon = false;
    let gameLost = false;

    const bricks: Brick[] = skills
      .slice(0, brickRows * brickCols)
      .map((skill, index) => {
        const row = Math.floor(index / brickCols);
        const col = index % brickCols;

        return {
          x: brickStartX + col * (brickWidth + brickGap),
          y: brickStartY + row * (brickHeight + brickGap),
          width: brickWidth,
          height: brickHeight,
          skill,
          colour: colours[index % colours.length],
          visible: true,
        };
      });

    function movePaddle(event: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const scaleX = canvas.width / rect.width;

      paddleX = mouseX * scaleX - paddleWidth / 2;

      if (paddleX < 0) paddleX = 0;
      if (paddleX + paddleWidth > width) {
        paddleX = width - paddleWidth;
      }
    }

    function drawRoundedRect(
      x: number,
      y: number,
      w: number,
      h: number,
      radius: number,
      colour: string
    ) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();

      ctx.fillStyle = colour;
      ctx.fill();
    }

    function drawBackground() {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#050505");
      gradient.addColorStop(0.5, "#111827");
      gradient.addColorStop(1, "#020617");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    function drawBricks() {
      bricks.forEach((brick) => {
        if (!brick.visible) return;

        drawRoundedRect(
          brick.x,
          brick.y,
          brick.width,
          brick.height,
          14,
          brick.colour
        );

        ctx.fillStyle = "white";
        ctx.font = "bold 15px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          brick.skill,
          brick.x + brick.width / 2,
          brick.y + brick.height / 2
        );
      });
    }

    function drawPaddle() {
      drawRoundedRect(
        paddleX,
        paddleY,
        paddleWidth,
        paddleHeight,
        10,
        "#ffffff"
      );
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.closePath();
    }

    function drawMessage(message: string, subMessage: string) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "white";
      ctx.font = "bold 42px Arial";
      ctx.textAlign = "center";
      ctx.fillText(message, width / 2, height / 2 - 20);

      ctx.font = "18px Arial";
      ctx.fillText(subMessage, width / 2, height / 2 + 25);
    }

    function checkBrickCollision() {
      bricks.forEach((brick) => {
        if (!brick.visible) return;

        const hitBrick =
          ballX > brick.x &&
          ballX < brick.x + brick.width &&
          ballY > brick.y &&
          ballY < brick.y + brick.height;

        if (hitBrick) {
          brick.visible = false;
          ballSpeedY = -ballSpeedY;

          localScore += 1;
          setScore(localScore);

          if (localScore === bricks.length) {
            gameWon = true;
            setWon(true);
          }
        }
      });
    }

    function updateBall() {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      if (ballX + ballRadius > width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
      }

      if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
      }

      const hitPaddle =
        ballY + ballRadius > paddleY &&
        ballY - ballRadius < paddleY + paddleHeight &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth;

      if (hitPaddle) {
        ballSpeedY = -Math.abs(ballSpeedY);

        const hitPoint = ballX - (paddleX + paddleWidth / 2);
        ballSpeedX = hitPoint * 0.06;
      }

      if (ballY - ballRadius > height) {
        gameLost = true;
        setLost(true);
      }
    }

    function draw() {
      drawBackground();
      drawBricks();
      drawPaddle();
      drawBall();

      if (gameWon) {
        drawMessage("You cleared Aayushi's skills!", "Refresh to play again");
        return;
      }

      if (gameLost) {
        drawMessage("Game over", "Refresh to try again");
        return;
      }

      checkBrickCollision();
      updateBall();

      animationRef.current = requestAnimationFrame(draw);
    }

    canvas.addEventListener("mousemove", movePaddle);
    draw();

    return () => {
      canvas.removeEventListener("mousemove", movePaddle);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-background theme-font flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl mb-6 text-center">
        <h1 className="text-4xl font-extrabold mb-3">
          Aayushi Skill Breaker
        </h1>

        <p className="text-white/70">
          Move your mouse to control the paddle. Break each brick to reveal a skill.
        </p>
      </div>

      <div className="flex gap-4 mb-4 text-sm text-white/80">
        <span className="rounded-full bg-white/10 px-4 py-2">
          Score: {score}
        </span>

        <span className="rounded-full bg-white/10 px-4 py-2">
          Skills: {skills.slice(0, 15).length}
        </span>

        {won && (
          <span className="rounded-full bg-green-500/30 px-4 py-2">
            Complete
          </span>
        )}

        {lost && (
          <span className="rounded-full bg-red-500/30 px-4 py-2">
            Try again
          </span>
        )}
      </div>

      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
        <canvas
          ref={canvasRef}
          className="block w-full bg-black cursor-none"
        />
      </div>
    </main>
  );
}