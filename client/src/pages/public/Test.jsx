import TestContainer from 'components/base/TestContainer';
import { Box, Text } from '@chakra-ui/react';
import { ResponsiveLine } from '@nivo/line';
const data = [
  {
    id: 'Iron Cactus',
    data: [
      {
        x: 'Mon',
        y: 23.44,
      },
      {
        x: 'tues',
        y: 27.66,
      },
      {
        x: 'Wed',
        y: 32.56,
      },
      {
        x: 'thurs',
        y: 35.66,
      },
      {
        x: 'fri',
        y: 44.35,
      },
      {
        x: 'Sat',
        y: 39.97,
      },
      {
        x: 'Sun',
        y: 36.76,
      },
    ],
  },
  {
    id: 'The Ladle',
    data: [
      {
        x: 'Mon',
        y: 21.44,
      },
      {
        x: 'tues',
        y: 22.66,
      },
      {
        x: 'Wed',
        y: 32.56,
      },
      {
        x: 'thurs',
        y: 35.66,
      },
      {
        x: 'fri',
        y: 44.35,
      },
      {
        x: 'Sat',
        y: 39.97,
      },
      {
        x: 'Sun',
        y: 36.76,
      },
    ],
  },
  {
    id: 'Macheveli',
    data: [
      {
        x: 'Mon',
        y: 24.44,
      },
      {
        x: 'tues',
        y: 25.66,
      },
      {
        x: 'Wed',
        y: 29.56,
      },
      {
        x: 'thurs',
        y: 32.66,
      },
      {
        x: 'fri',
        y: 42.35,
      },
      {
        x: 'Sat',
        y: 34.97,
      },
      {
        x: 'Sun',
        y: 32.76,
      },
    ],
  },
];

const Test = () => {
  return (
    <TestContainer>
      <Text>Hello there</Text>
      <Box height='24rem' width='36rem'>
        <ResponsiveLine
          theme={{
            axis: { legend: { text: { fontSize: 16 } } },
            grid: { line: { stroke: 'rgb(200, 200, 200)' } },
            legends: { text: { fontSize: 12, opacity: 1 } },
          }}
          data={data}
          margin={{ top: 30, right: 110, bottom: 60, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          yFormat=' >-.2f'
          curve='natural'
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Day of Week',
            legendOffset: 44,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Total Per Hour',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          pointSize={9}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              text: { fontSize: 24 },
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 16,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </TestContainer>
  );
};

export default Test;
