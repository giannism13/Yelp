import { Bar, getElementAtEvent } from 'react-chartjs-2'
import React, { useRef } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

import { useNavigate, createSearchParams } from 'react-router-dom';

const Barchart = (props) => {
	const { attribute, chartData, state, city } = props

	const chartRef = useRef();

	const navigate = useNavigate();

	const onClick = (event) => {
		var valueIndexClicked = getElementAtEvent(chartRef.current, event)[0].index;

		var valueClicked = labels[valueIndexClicked];
		window.open(`/index?state=${state}&city=${city}&attribute=${attribute}&attributeValue=${valueClicked}`, '_self');
		//navigate({ pathname: '/index', search: createSearchParams({ state, city, attribute, attributeValue: valueClicked }).toString() });

	}


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

	return <Bar options={options} data={data} ref={chartRef} onClick={onClick} />;
}

export default Barchart