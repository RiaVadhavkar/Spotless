import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function ReleaseYearGraph(props) {
  function collectionCountByYear() {
    let countCollections = props.stats.collections_by_year.map(function (x, i) {
      return x.Count;
    });
    return countCollections;
  }

  function yearLabels() {
    if (!Array.isArray(props.stats.collections_by_year)) {
      props.stats.collections_by_year = [props.stats.collections_by_year];
      console.log("wrapped array" + props.stats.collections_by_year);
    }
    let years = props.stats.collections_by_year.map(function (x, i) {
      return x.Year;
    });
    return years;
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
        text: "Release Years",
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
