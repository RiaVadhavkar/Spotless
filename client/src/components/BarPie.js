import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function BarPie() {
  const labels = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
  ];
  const data = {
    labels: labels,
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
        color: '#FFFFFF',
      },
    ],
  };

  return (
    <section class="flex items-center justify-center bg-neutral-900 rounded-2xl mt-3">
      {/* <section class="grid grid-cols-4 w-full justify-items-center my-6"> */}
        {/* <div className="w-full h-52"> */}
          <Bar data={data}/>
        {/* </div> */}
      {/* </section> */}
    </section>
  );
}
