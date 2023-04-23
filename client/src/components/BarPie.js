import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function BarPie() {
  const barData = {
    labels: ["0", "1", "2", "3", "4", "5"],
    // labelsColor: "#FFFFFF",
    datasets: [
      {
        label: "Rating",
        data: [1, 4, 3, 8, 5, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 2,
        color: "#FFFFFF",
      },
    ],
  };

  const barOptions = {
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
          text: "Stars",
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
        text: "Rating",
        font: { weight: "bold", size: 18, color: "#FFFFFF" },
        padding: { bottom: 20 },
        color: "#FFFFFF",
      },
      legend: {
        labels: {
          color: "#FFFFFF",
        },
      },
    },
  };

  const pieData = {
    labels: ["Planning", "Complete", "Dropped"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ["#1f783e", "#FFFFFF", "#29A053"],
        hoverBackgroundColor: ["#1f783e", "#FFFFFF", "#29A053"],
        borderColor: ["rgb(23 23 23)"],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      title: {
        display: true,
        text: "Status Distribution",
        font: { weight: "bold", size: 18, color: "#FFFFFF" },
        padding: { bottom: 20 },
        color: "#FFFFFF",
      },
      legend: {
        labels: {
          color: "#FFFFFF",
        },
      },
    },
  };

  return (
    <section class="flex items-center justify-center bg-neutral-900 rounded-2xl my-2">
      {/* <section class="grid grid-cols-4 w-full justify-items-center my-6"> */}
      <div class="flex w-full justify-center items-center my-4">
        <div class="w-2/3 px-4">
          <Bar data={barData} options={barOptions} />
        </div>
        <div class="w-1/3">
          {" "}
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
      {/* </section> */}
    </section>
  );
}
