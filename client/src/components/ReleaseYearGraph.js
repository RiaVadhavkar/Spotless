import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function ReleaseYearGraph(props) {
  const data = {
    labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "# of Collections",

        data: makeArray(),
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

  function makeArray() {
    let array = Array.apply(null, Array(8)).map(function (x, i) {
      return 0;
    });
    console.log("line_i" + array);
    if (!Array.isArray(props.stats.collections_by_year)) {
      props.stats.collections_by_year = [props.stats.collections_by_year];
      console.log("wrapped array" + props.stats.collections_by_year);
    }
    props.stats.collections_by_year.forEach((item) => {
      array[item.Year - 2016] = item.Count;
    });
    console.log("line_o" + array);
    return array;
  }

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
