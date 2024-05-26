// LineChartComponent.js
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function LineChartComponent({ labels, data }) {
    const formattedLabels = labels.map(label => {
        const date = new Date(label);
        return `${date.getMonth() + 1} - ${date.getDate()}`; // MM/DD
    });
    
    const chartData = {
        labels: formattedLabels,
        datasets: [
            {
                data: data,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // color opcional
                strokeWidth: 2 // opcional
            }
        ]
    };

    const chartConfig = {
        backgroundColor: '#fff',
        backgroundGradientFrom: '#c6c6c6',
        backgroundGradientTo: '#c6c6c6',
        decimalPlaces: 2, // opcional, muestra dos decimales en los valores
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#f8f8f8'
        }
    };

    return (
        <View>
            <LineChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    );
}
