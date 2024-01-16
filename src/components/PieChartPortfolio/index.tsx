import React, { memo, useState } from 'react';
import { Dimensions, View } from 'react-native';
// import { PieChart } from 'react-minimal-pie-chart';
// import Pie from 'react-native-pie';
import { VictoryContainer, VictoryPie } from 'victory-native';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';

const colorScale = ['#8FC93A', '#FFBA08', '#950AEF', 'red'];

const PieChartPortfolio = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <View style={[globalStyles.container2, globalStyles.flexDirectionRow]}>
      <VictoryPie
        containerComponent={
          <VictoryContainer
            width={Dimensions.get('window').width / 1.15}
            height={scaleSize(280)}
            style={{ justifyContent: 'flex-end', backgroundColor: 'blue', right: scaleSize(46) }}
          />
        }
        data={[
          { x: '5%', y: 5, id: 1 },
          { x: '45%', y: 45, id: 2 },
          { x: '20%', y: 20, id: 3 },
          { x: '30%', y: 30, id: 4 },
        ]}
        colorScale={colorScale}
        labelPosition={'centroid'}
        labels={data => {
          return data.datum.y < 10 && selectedId !== data.datum.id ? '' : data.datum.x;
        }}
        radius={datum => {
          return datum.datum.id === selectedId ? 100 : 90;
        }}
        innerRadius={datum => {
          return datum.datum.id === selectedId ? 0 : 15;
        }}
        labelRadius={datum => {
          return datum.datum.id === selectedId ? 110 : 30;
        }}
        style={{
          // parent: {
          //   backgroundColor: 'blue',
          //   // height: scaleSize(100),
          //   marginTop: -60
          // },
          labels: {
            fill: (datum: any) => {
              return datum.datum.id === selectedId ? colorScale[datum.index] : Colors.WHITE;
            },
            fontSize: 18,
          },
        }}
        // labelComponent={<VictoryLabel
        //   ariaLabel={'wth'}
        //   backgroundComponent={<View style={{ width: 30, height: 30, backgroundColor: 'blue' }}></View>}
        // />}
        labelPlacement={'vertical'}
        padAngle={2}
        // theme={VictoryTheme.material}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onPress: () => {
                return [
                  {
                    target: 'data',
                    mutation: ({ datum }) => {
                      if (selectedId !== datum.id) {
                        setSelectedId(datum.id);
                      } else {
                        setSelectedId(null);
                      }
                      return null;
                    },
                  },
                  // {
                  //   target: "labels",
                  //   mutation: ({ style }) => {
                  //     return style.fill === Colors.WHITE ? { style: { ...style, fill: Colors.BLACK } } : null;
                  //   }
                  // }
                ];
              },
            },
          },
        ]}
      />
      <View style={[globalStyles.container2, { backgroundColor: 'red' }]}>
        <View style={globalStyles.flexDirectionRow}>
          <View
            style={{
              width: scaleSize(16),
              height: scaleSize(16),
              backgroundColor: '#8FC93A',
              borderRadius: 10,
            }}
          ></View>
          {/* <Text allowFontScaling={false}>Bank</Text> */}
        </View>
      </View>
    </View>
  );
};

export default memo(PieChartPortfolio);
