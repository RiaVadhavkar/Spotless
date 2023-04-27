import { useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function AdminCollectionByYear(props) {
  function yearLabels() {
    if (!Array.isArray(props.stats)) {
      props.stats = [props.stats];
      console.log("wrapped array" + props.stats);
    }
    let years = props.stats.map(function (x, i) {
      return x.Year;
    });
    return years;
  }

  function collectionCountByYear() {
    let countCollections = props.stats.map(function (x, i) {
      return x.Count;
    });
    return countCollections;
  }

  const data = {
    labels: yearLabels(),
    datasets: [
      {
        label: "# of Collections",
        data: collectionCountByYear(),
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
          font: { weight: "bold", size: 14 },
          color: "white",
        },
        ticks: {
          color: "white",
          stepSize: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: "Years",
          font: { weight: "bold", size: 14 },
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
        font: { weight: "bold", size: 20 },
        color: "white",
        padding: { top: 10, bottom: 20 },
      },
      legend: {
        display: false,
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
