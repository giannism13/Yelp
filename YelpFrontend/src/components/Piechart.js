import React, { useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, getElementAtEvent } from 'react-chartjs-2';
import { useNavigate, createSearchParams } from 'react-router-dom';

const Piechart = (props) => {
	const { attribute, chartData, state, city } = props

	const chartRef = useRef();

	const navigate = useNavigate();

	const onClick = (event) => {
		var valueIndexClicked = getElementAtEvent(chartRef.current, event)[0].index;

		var valueClicked = labels[valueIndexClicked];
		window.open(`/index?state=${state}&city=${city}&attribute=${attribute}&attributeValue=${valueClicked}`, '_self');
		//navigate({ pathname: '/index', search: createSearchParams({ state, city, attribute, attributeValue: valueClicked }).toString() });

	}

	ChartJS.register(ArcElement, Tooltip, Legend);

	const labels = chartData ? chartData.map((element) => element[attribute]) : [];

	const data = {
		labels,
		datasets: [
			{
				label: '# of Votes',
				data: chartData.map((element) => element.count),
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	return <Pie data={data} onClick={onClick} ref={chartRef} />;
}

export default Piechart