import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function ReleaseYearGraph() {
  const data = {
    labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "# of Collections",

        data: [4, 8, 12, 16, 18, 19, 20, 3],
        fill: false,
        borderColor: "#29A053",
        pointBackgroundColor: "white",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "# of Collections",
          font: { weight: "bold" },
          color: "white",
        },
        ticks: {
          color: "white",
        },
      },
      x: {
        title: {
          display: true,
          text: "Years",
          font: { weight: "bold" },
          color: "white",
        },
        ticks: {
          color: "white",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Release Years",
        font: { weight: "bold", size: 18 },
        color: "white",
        padding: { bottom: 20 },
      },
      legend: {
        labels: {
          color: "#FFFFFF",
        },
      },
    },
    elements: {
      point: {
        backgroundColor: "white",
        borderColor: "#29A053",
        borderWidth: 2,
        hoverRadius: 8,
        hoverBorderWidth: 2,
        radius: 4,
      },
      line: {
        borderColor: "#29A053",
        borderWidth: 2,
        fill: false,
      },
    },
  };

  return (
    <section class="flex items-center justify-center bg-neutral-900 rounded-2xl my-2">
      <div class="flex w-full justify-center items-center my-4 px-4">
        <Line data={data} options={options} />
      </div>
    </section>
  );
}
