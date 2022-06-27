import { Bar } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

const Barchart = (props) => {
	const { attribute, chartData } = props

	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: attribute,
			},
		},
	};

	console.log("chart data: " + chartData.count)
	const labels = chartData ? chartData.map((element) => element[attribute]) : [];


	const data = {
		labels,
		datasets: [
			{
				label: '',
				data: chartData.map((element) => element.count),
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};

	return <Bar options={options} data={data} />;
}

export default Barchart