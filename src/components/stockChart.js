import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

import React from 'react';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);
const formatter = (number) => (number > 999999 ? (number / 1000000).toFixed(1) + 'M' : number);

const buildData = ({ chartData }) => ({
    labels: chartData.labels,
    datasets: [
        {
            label: '',
            data: chartData.data,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 1)',
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',
            fill: 'start',
            tension: 0.4,
        },
    ],
});

const options = {
    plugins: {
        legend: {
            display: false,
        }
    },
    scales: {
        yAxes: {
            ticks: {
                color: 'rgba(255, 255, 255, 1)'
            },
            grid: {
                display: false,
                drawBorder: false,
            },
        },

        xAxes: {
            ticks: {
                color: 'rgba(255, 255, 255, 1)'
            },
            grid: {
                circular: true,
                borderColor: 'rgba(255, 255, 255, .2)',
                color: 'rgba(255, 255, 255, .2)',
                borderDash: [5, 5]
            },
        },
    },
    layout: {
        padding: {
            right: 10,
        },
    },
};

const numberToFix = (number, fix) => (number || 0).toFixed(fix);

const StockChart = ({ info }) => {
    const data = buildData(info);

    return (
        <>
            <div className="rounded shadow-xl overflow-hidden w-full md:flex" style={{ maxWidth: '900px' }}>
                <div className="flex w-full md:w-1/2 px-5 pb-4 pt-8 bg-indigo-500 text-white items-center">
                    <Line type="line" data={data} options={options} />
                </div>
                <div className="flex w-full md:w-1/2 p-10 bg-gray-100 text-gray-600 items-center">
                    <div className="w-full">
                        <h3 className="text-lg font-semibold leading-tight text-gray-800">{info.stockFullName}</h3>
                        <h6 className="text-sm leading-tight mb-2">
                            <span>{info.stockShortName}</span>
                            &nbsp;&nbsp;-&nbsp;&nbsp;Aug 2nd 4:10pm AEST
                        </h6>
                        <div className="flex w-full items-end mb-6">
                            <span className="block leading-none text-3xl text-gray-800">{numberToFix(info.price.current, 3)}</span>
                            <span className="block leading-5 text-sm ml-4 text-green-500">
                                {`${info.price.high - info.price.low < 0 ? '▼' : '▲'} ${(info.price.high - info.price.low).toFixed(3)} (${((info.price.high / info.price.low) * 100 - 100).toFixed(3)}%)`}
                            </span>
                        </div>
                        <div className="flex w-full text-xs">
                            <div className="flex w-5/12">
                                <div className="flex-1 pr-3 text-left font-semibold">Open</div>
                                <div className="flex-1 px-3 text-right">{info.price.open.toFixed(3)}</div>
                            </div>
                            <div className="flex w-7/12">
                                <div className="flex-1 px-3 text-left font-semibold">Market Cap</div>
                                <div className="flex-1 pl-3 text-right">{formatter(info.price.cap)}</div>
                            </div>
                        </div>
                        <div className="flex w-full text-xs">
                            <div className="flex w-5/12">
                                <div className="flex-1 pr-3 text-left font-semibold">High</div>
                                <div className="px-3 text-right">{info.price.high.toFixed(3)}</div>
                            </div>
                            <div className="flex w-7/12">
                                <div className="flex-1 px-3 text-left font-semibold">P/E ratio</div>
                                <div className="pl-3 text-right">{info.price.ratio.toFixed(2)}</div>
                            </div>
                        </div>
                        <div className="flex w-full text-xs">
                            <div className="flex w-5/12">
                                <div className="flex-1 pr-3 text-left font-semibold">Low</div>
                                <div className="px-3 text-right">{info.price.low.toFixed(3)}</div>
                            </div>
                            <div className="flex w-7/12">
                                <div className="flex-1 px-3 text-left font-semibold">Dividend yield</div>
                                <div className="pl-3 text-right">{`${info.price.dividend}%`}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StockChart;
