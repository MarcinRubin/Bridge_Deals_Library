import { Flex } from '@chakra-ui/react';

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Radar } from 'react-chartjs-2';

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  ChartJS.defaults.color = 'white';
  ChartJS.defaults.borderColor = '#68D391';

const DifficultyPlot = ({difficulty_data}) => {


    const dataPoints = [0, 0, 0, 0, 0];
    difficulty_data.forEach(item => dataPoints[item.difficulty - 1] = item.count)



    const data = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
          {
            label: 'Difficulty',
            data: dataPoints,
            backgroundColor: 'rgba(246, 224, 94, 0.4)',
            borderColor: '#2D3748',
            borderWidth: 1,
          },
        ],
      };

      const options = {
        scales: {
          r: {
            ticks: {
              backdropColor: '#276749'
            }
          }
        }
      }

      return (
        <Flex w='100%' bgColor='green.700' borderRadius='1rem' border='4px' borderColor='green.400 '>
          <Radar data={data} options={options} />
        </Flex>
      );
    };

export default DifficultyPlot
