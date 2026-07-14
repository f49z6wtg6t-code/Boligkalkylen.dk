"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
  type ChartConfiguration,
} from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
);

interface SavingsChartProps {
  yearlyData: number[];
  installCost: number;
}

function formatDKK(n: number): string {
  return new Intl.NumberFormat("da-DK", {
    maximumFractionDigits: 0,
  }).format(n) + " kr";
}

export default function SavingsChart({ yearlyData, installCost }: SavingsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.offsetHeight || 300);
    gradient.addColorStop(0, "rgba(58,107,42,0.3)");
    gradient.addColorStop(1, "rgba(58,107,42,0.01)");

    const labels = yearlyData.map((_, i) => `År ${i + 1}`);

    const config: ChartConfiguration = {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Akkumuleret besparelse (kr)",
            data: yearlyData,
            borderColor: "#3A6B2A",
            backgroundColor: gradient,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: "#3A6B2A",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          duration: 400,
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#EEF0E8",
            borderColor: "#B8B4A8",
            borderWidth: 1,
            titleColor: "#4A5E46",
            bodyColor: "#1A2418",
            padding: 12,
            callbacks: {
              label: (ctx) => ` ${formatDKK(ctx.parsed.y ?? 0)}`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "#EEF0E8",
            },
            ticks: {
              color: "#7A9070",
              font: { size: 11 },
              maxTicksLimit: 6,
            },
            border: {
              color: "#D8D4C8",
            },
          },
          y: {
            grid: {
              color: "#EEF0E8",
            },
            ticks: {
              color: "#7A9070",
              font: { size: 11 },
              callback: (value) =>
                new Intl.NumberFormat("da-DK", { notation: "compact" }).format(
                  Number(value)
                ) + " kr",
            },
            border: {
              color: "#D8D4C8",
            },
          },
        },
      },
      plugins: [
        {
          id: "paybackLine",
          afterDraw(chart) {
            const { ctx: c, scales, chartArea } = chart;
            const yScale = scales.y;
            const xScale = scales.x;
            if (!yScale || !xScale) return;

            const yPixel = yScale.getPixelForValue(installCost);
            if (yPixel < chartArea.top || yPixel > chartArea.bottom) return;

            c.save();
            c.beginPath();
            c.setLineDash([6, 4]);
            c.strokeStyle = "#FBBF24";
            c.lineWidth = 1.5;
            c.moveTo(chartArea.left, yPixel);
            c.lineTo(chartArea.right, yPixel);
            c.stroke();

            c.font = "11px Inter, sans-serif";
            c.fillStyle = "#FBBF24";
            c.fillText("Installationsomkostning", chartArea.left + 6, yPixel - 5);
            c.restore();
          },
        },
      ],
    };

    chartRef.current = new Chart(ctx, config);

    return () => {
      chartRef.current?.destroy();
    };
  }, [yearlyData, installCost]);

  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #D8D4C8" }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-sm font-medium"
          style={{ color: "#1A2418", fontFamily: "var(--font-dm-sans)" }}
        >
          Akkumuleret besparelse over 25 år
        </span>
        <div className="flex items-center gap-3 text-xs" style={{ color: "#7A9070" }}>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-0.5 rounded"
              style={{ backgroundColor: "#3A6B2A" }}
            />
            Besparelse
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-0"
              style={{ border: "1px dashed #FBBF24" }}
            />
            Investering
          </span>
        </div>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
}
