import { useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function AdminCollectionByYear(props) {
  let cnt2017, cnt2018, cnt2019, cnt2020, cnt2021, cnt2022, cnt2023;
  useEffect (() => {
    console.log(props.stats);
    if (props.stats) {
      makeStats();
    }
  }, [props.stats]);
  
  function makeStats() {
    if (props.stats) {
      cnt2017 = props.stats[0];
      cnt2018 = props.stats[1];
      cnt2019 = props.stats[2];
      cnt2020 = props.stats[3];
      cnt2021 = props.stats[4];
      cnt2022 = props.stats[5];
      cnt2023 = props.stats[6];
  }
  else {
    cnt2017 = 0;
    cnt2018 = 0;
    cnt2019 = 0;
    cnt2020 = 0;
    cnt2021 = 0;
    cnt2022 = 0;
    cnt2023 = 0;
  }
    console.log(cnt2017, cnt2018, cnt2019, cnt2020, cnt2021, cnt2022, cnt2023)
  }

  // 1, 1, 1, 1, 1, 1, 1

  const data = {
    labels: [1, 1, 1, 1, 1, 1, 1],
    datasets: [
      {
        label: "# of Collections",

        data: [1, 1, 1, 1, 1, 1, 1],
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
