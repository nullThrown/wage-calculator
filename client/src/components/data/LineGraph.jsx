import { ResponsiveLine } from '@nivo/line';

const LineGraph = ({ data }) => {
  return (
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
  );
};

export default LineGraph;
