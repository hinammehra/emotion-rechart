import "./styles.css";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "30 seconds ago",
    uv: 1.5
  },
  {
    name: "",
    uv: 1.8
  },
  {
    name: "",
    uv: 2.5
  },
  {
    name: "",
    uv: 2.5
  },
  {
    name: "",
    uv: 2
  },
  {
    name: "",
    uv: 1
  },
  {
    name: "5 seconds ago",
    uv: 0.5
  }
];

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;
    const values = { 4: "🙂", 3: "😯", 2: "😐", 1: "🙁", 0: "😡" };

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={-10}
          dy={16}
          textAnchor="end"
          fill="#666"
          className="xlabel"
        >
          {values[payload.value]}
        </text>
      </g>
    );
  }
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const labels = {
      4: "Happy",
      3: "Surprised",
      2: "Neutral",
      1: "Sad 🙁",
      0: "Angry"
    };
    const value = payload[0].value;
    const label = labels[value];

    return (
      <div>
        <p className="label">{`${label}`}</p>
        <p className="sublabel">{`10 seconds ago`}</p>
      </div>
    );
  }

  return null;
};

export default function App() {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 25,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        tick={{ fontFamily: '"Lato", sans-serif', fontSize: "14px" }}
        tickMargin={10}
        dataKey="name"
        minTickGap="1"
      />
      <YAxis tick={<CustomizedAxisTick />} ticks={[0, 1, 2, 3, 4]} />
      <Tooltip
        content={<CustomTooltip />}
        wrapperStyle={{
          boxShadow: "rgba(0, 17, 51, 0.1) 0px 3px 15px",
          background: "white",
          borderRadius: "10px",
          padding: "5px 25px"
        }}
      />

      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
  );
}
