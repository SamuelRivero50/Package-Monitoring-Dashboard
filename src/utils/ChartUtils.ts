/** @author David Hdez */
// external imports
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  PieController,
  Tooltip,
} from "chart.js";

export class ChartUtils {
  private static initialized = false;

  private static ensureInitialized(): void {
    if (ChartUtils.initialized) return;
    Chart.register(
      ArcElement,
      PieController,
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Legend,
      Tooltip,
    );
    ChartUtils.initialized = true;
  }

  static buildPieChart(
    canvas: HTMLCanvasElement,
    labels: string[],
    data: number[],
    colors: string[],
  ): Chart {
    ChartUtils.ensureInitialized();

    return new Chart(canvas, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors,
            borderColor: "#161b22",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 16,
              usePointStyle: true,
              pointStyle: "circle",
              color: "#8b949e",
              font: { size: 12 },
            },
          },
        },
      },
    });
  }

  static buildBarChart(
    canvas: HTMLCanvasElement,
    labels: string[],
    data: number[],
    colors: string[],
  ): Chart {
    ChartUtils.ensureInitialized();

    return new Chart(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors,
            borderColor: "#161b22",
            borderWidth: 1,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            ticks: { color: "#8b949e", font: { size: 11 } },
            grid: { display: false },
            border: { display: false },
          },
          y: {
            ticks: { color: "#8b949e", font: { size: 11 }, stepSize: 1 },
            grid: { color: "#21262d" },
            border: { display: false },
          },
        },
      },
    });
  }
}
