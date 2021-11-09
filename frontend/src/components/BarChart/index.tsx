import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'utils/request';
import { SalesSuccess } from 'types/sale';

type ChartData = {
    //labels: string[],
    labels: { categories: string[] },
    series: [{
        name: string,
        data: number[]
    }]
}

const BarChart = () => {

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

    const [chartData, setChartData] = useState<ChartData>({
        labels: { categories: [] }, series: [{
            name: '',
            data: []
        }]
    });


    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-seller`)
            .then(response => {

                
                const data = response.data as SalesSuccess[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => x.deals); //round( x.visited,   x.deals)
                
                setChartData({
                    labels: { categories: myLabels },
                    series: [{
                        name: "% Sucesso",
                        data: mySeries
                    }]
                });
            })

    }, [])

    /* const mockData = {
        labels: {
            categories: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
        },
        series: [
            {
                name: "% Sucesso",
                data: [43.6, 67.1, 67.7, 45.6, 71.1]                   
            }
        ]
    }; */

    return (

        <Chart
            options={{ ...options, xaxis: chartData.labels }}
            series={chartData.series}
            type="bar"
            height="240" />

    );
}

export default BarChart;
