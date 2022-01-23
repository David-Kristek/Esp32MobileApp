import React, { useMemo } from "react";
import { Text, Dimensions } from "react-native";
import style from "../Style";
import { LineChart } from "react-native-chart-kit";
interface Props {
  title: string;
  data: number[];
  time: string[];
  color: {
    r: number;
    g: number;
    b: number;
  };
}
export default function Chart({ data, time, title, color }: Props) {
  const hiddenPoints: number[] | never[] = useMemo(() => {
    const dataLenght = data.length;
    if (dataLenght < 10) return [];
    const arr = [];
    var j = 1;
    for (let i = 0; i < dataLenght; i++) {
      if (!i) continue;
      if (Math.round(dataLenght * 0.22 * j) === i) {
        j++;
        continue;
      }
      arr.push(i);
    }
    return arr;
  }, [data]);
  return (
    <>
      <Text style={[style.font2, style.bmPad]}>{title}</Text>
      <LineChart
        data={{
          labels: time,
          datasets: [
            {
              data,
            },
          ],
        }}
        width={Dimensions.get("window").width}
        height={280}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "orangered",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(${color.r},${color.g},${color.b})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "2",
            strokeWidth: "0.5",
            stroke: "blue",
          },
        }}
        withInnerLines={false}
        bezier
        style={{
          marginVertical: 8,
        }}
        hidePointsAtIndex={hiddenPoints}
      />
    </>
  );
}
