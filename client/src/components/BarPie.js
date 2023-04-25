import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function BarPie(props) {
  function makeBar() {
    let ratings = Array(6).fill(0);
    console.log("bar_i" + ratings);
    if (!Array.isArray(props.stats.collections_by_rating)) {
      props.stats.collections_by_rating = [props.stats.collections_by_rating];
      console.log("wrapped array" + props.stats.collections_by_rating);
    }
    props.stats.collections_by_rating.forEach((collection) => {
      ratings[Math.floor(collection.Rating)] += collection.Count;
    });
    console.log("bar_o" + ratings);
    return ratings;
  }

  const barData = {
    labels: ["0", "1", "2", "3", "4", "5"],
    // labelsColor: "#FFFFFF",
    datasets: [
      {
        label: "# of Collections by Rating",
        data: makeBar(),
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
          text: "Stars",
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
        text: "Rating",
        font: { weight: "bold", size: 20 },
        padding: { top: 10, bottom: 20 },
        color: "#FFFFFF",
      },
      legend: {
        labels: {
          color: "#FFFFFF",
        },
      },
    },
  };

  function makePie() {
    let status = Array(3).fill(0);
    console.log(status);
    if (!Array.isArray(props.stats.collection_by_status)) {
      props.stats.collection_by_status = [props.stats.collection_by_status];
      console.log("wrapped array" + props.stats.collection_by_status);
    }
    props.stats.collection_by_status.forEach((x, i) => {
      status[i] = x.Count;
    });
    console.log(status);
    return status;
  }

  const pieData = {
    labels: ["Complete", "Dropped", "Planning"],
    datasets: [
      {
        data: makePie(),
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
        font: { weight: "bold", size: 20 },
        padding: { bottom: 10 },
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
        <div class="w-1/3 px-3">
          {" "}
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
      {/* </section> */}
    </section>
  );
}
