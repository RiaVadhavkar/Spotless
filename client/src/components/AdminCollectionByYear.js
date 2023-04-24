import { useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function AdminCollectionByYear(props) {
  const data = {
    labels: [props.stats[0].Year, props.stats[1].Year, props.stats[2].Year, props.stats[3].Year, props.stats[4].Year, props.stats[5].Year],
    datasets: [
      {
        label: "# of Collections",

        data: [props.stats[0].Count, props.stats[1].Count, props.stats[2].Count, props.stats[3].Count, props.stats[4].Count, props.stats[5].Count],
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
        text: "Number of Collections by Year",
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
