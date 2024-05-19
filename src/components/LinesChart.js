import { Line } from "react-chartjs-2";
import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function LineChart({ labels, data }) {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Accion',
                data: data,
                tension: 0.5,
                fill: true,
                borderColor: 'rgb(255,99,132)',
                backgroundColor: 'rgba(22,99,132,0.5)',
                pointRadius: 5,
                pointBorderColor: 'rgba(255,99,132)',
                pointBackgroundColor: 'rgba(255,99,132)',
            },
        ],
    };

    return <Line data={chartData} />;
}
