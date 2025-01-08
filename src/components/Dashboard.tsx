import styled from "styled-components";
import { Paper, Typography, LinearProgress } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  // PieChart,
  // Pie,
  // Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  // PolarRadiusAxis,
  // BarChart,
  // Bar,
} from "recharts";
import AnimatedNumber from "./AnimatedNumber";

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 100%;
`;

const MetricCard = styled(Paper)`
  padding: 20px;
  border-radius: 10px !important;
  background-color: #242424 !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const WideCard = styled(MetricCard)`
  grid-column: 1 / -1;
  height: 300px;
`;

const MediumCard = styled(MetricCard)`
  grid-column: span 2;
  height: 300px;
  @media (max-width: 1200px) {
    grid-column: 1 / -1;
  }
`;

const SmallCard = styled(MetricCard)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 140px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ProgressContainer = styled.div`
  margin-top: 10px;
  width: 100%;
`;

const ChartTitle = styled(Typography)`
  margin-bottom: 16px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

// const MetricValue = styled(Typography)`
//   font-size: 2.5rem !important;
//   font-weight: 600 !important;
//   background: linear-gradient(45deg, #00a2ff, #0077ff);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   margin: 8px 0 !important;
// `;

const carData = {
  audi: {
    specs: {
      fuelEfficiency: 5.2,
      speed: 250,
      range: 580,
      maintenance: 92,
      power: 450,
      acceleration: 3.9,
      weight: 1620,
      price: 85000,
    },
    fuelHistory: [
      { month: "Jan", value: 420 },
      { month: "Feb", value: 380 },
      { month: "Mar", value: 450 },
      { month: "Apr", value: 400 },
      { month: "May", value: 520 },
      { month: "Jun", value: 480 },
    ],
    performance: [
      { aspect: "Speed", value: 95 },
      { aspect: "Handling", value: 88 },
      { aspect: "Comfort", value: 90 },
      { aspect: "Efficiency", value: 85 },
      { aspect: "Technology", value: 92 },
    ],
    maintenanceStats: [
      { name: "Engine", value: 95 },
      { name: "Brakes", value: 88 },
      { name: "Suspension", value: 92 },
      { name: "Electronics", value: 96 },
    ],
  },
  challenger: {
    specs: {
      fuelEfficiency: 13.8,
      speed: 327,
      range: 450,
      maintenance: 86,
      power: 717,
      acceleration: 3.4,
      weight: 2025,
      price: 79995,
    },
    fuelHistory: [
      { month: "Jan", value: 520 },
      { month: "Feb", value: 540 },
      { month: "Mar", value: 510 },
      { month: "Apr", value: 530 },
      { month: "May", value: 550 },
      { month: "Jun", value: 525 },
    ],
    performance: [
      { aspect: "Speed", value: 96 },
      { aspect: "Handling", value: 88 },
      { aspect: "Comfort", value: 85 },
      { aspect: "Efficiency", value: 70 },
      { aspect: "Technology", value: 88 },
    ],
    maintenanceStats: [
      { name: "Engine", value: 92 },
      { name: "Brakes", value: 88 },
      { name: "Suspension", value: 85 },
      { name: "Electronics", value: 89 },
    ],
  },
  truck: {
    specs: {
      fuelEfficiency: 12.5,
      speed: 180,
      range: 800,
      maintenance: 85,
      power: 510,
      acceleration: 7.2,
      weight: 2800,
      price: 75000,
    },
    fuelHistory: [
      { month: "Jan", value: 680 },
      { month: "Feb", value: 720 },
      { month: "Mar", value: 650 },
      { month: "Apr", value: 700 },
      { month: "May", value: 730 },
      { month: "Jun", value: 690 },
    ],
    performance: [
      { aspect: "Speed", value: 65 },
      { aspect: "Handling", value: 70 },
      { aspect: "Comfort", value: 85 },
      { aspect: "Efficiency", value: 75 },
      { aspect: "Technology", value: 88 },
    ],
    maintenanceStats: [
      { name: "Engine", value: 88 },
      { name: "Brakes", value: 85 },
      { name: "Suspension", value: 90 },
      { name: "Electronics", value: 87 },
    ],
  },
  range: {
    specs: {
      fuelEfficiency: 7.8,
      speed: 210,
      range: 650,
      maintenance: 87,
      power: 395,
      acceleration: 5.8,
      weight: 2200,
      price: 92000,
    },
    fuelHistory: [
      { month: "Jan", value: 520 },
      { month: "Feb", value: 490 },
      { month: "Mar", value: 510 },
      { month: "Apr", value: 540 },
      { month: "May", value: 500 },
      { month: "Jun", value: 530 },
    ],
    performance: [
      { aspect: "Speed", value: 82 },
      { aspect: "Handling", value: 78 },
      { aspect: "Comfort", value: 92 },
      { aspect: "Efficiency", value: 75 },
      { aspect: "Technology", value: 90 },
    ],
    maintenanceStats: [
      { name: "Engine", value: 89 },
      { name: "Brakes", value: 86 },
      { name: "Suspension", value: 91 },
      { name: "Electronics", value: 88 },
    ],
  },
  supra: {
    specs: {
      fuelEfficiency: 8.2,
      speed: 250,
      range: 480,
      maintenance: 90,
      power: 382,
      acceleration: 4.3,
      weight: 1540,
      price: 56000,
    },
    fuelHistory: [
      { month: "Jan", value: 390 },
      { month: "Feb", value: 420 },
      { month: "Mar", value: 380 },
      { month: "Apr", value: 410 },
      { month: "May", value: 400 },
      { month: "Jun", value: 430 },
    ],
    performance: [
      { aspect: "Speed", value: 92 },
      { aspect: "Handling", value: 94 },
      { aspect: "Comfort", value: 82 },
      { aspect: "Efficiency", value: 78 },
      { aspect: "Technology", value: 85 },
    ],
    maintenanceStats: [
      { name: "Engine", value: 92 },
      { name: "Brakes", value: 90 },
      { name: "Suspension", value: 88 },
      { name: "Electronics", value: 85 },
    ],
  },
  gtr: {
    specs: {
      fuelEfficiency: 9.8,
      speed: 315,
      range: 520,
      maintenance: 85,
      power: 565,
      acceleration: 2.7,
      weight: 1750,
      price: 115000,
    },
    fuelHistory: [
      { month: "Jan", value: 480 },
      { month: "Feb", value: 510 },
      { month: "Mar", value: 490 },
      { month: "Apr", value: 520 },
      { month: "May", value: 500 },
      { month: "Jun", value: 530 },
    ],
    performance: [
      { aspect: "Speed", value: 98 },
      { aspect: "Handling", value: 95 },
      { aspect: "Comfort", value: 80 },
      { aspect: "Efficiency", value: 72 },
      { aspect: "Technology", value: 88 },
    ],
    maintenanceStats: [
      { name: "Engine", value: 88 },
      { name: "Brakes", value: 92 },
      { name: "Suspension", value: 90 },
      { name: "Electronics", value: 86 },
    ],
  },
};

const COLORS = ["#00a2ff", "#0077ff", "#0044ff", "#0022ff"];

interface DashboardProps {
  selectedModel: string;
}

function Dashboard({ selectedModel }: DashboardProps) {
  const data = carData[selectedModel as keyof typeof carData] || carData.audi;

  return (
    <DashboardGrid>
      <SmallCard>
        <Typography variant="h6">Power Output</Typography>
        <AnimatedNumber
          value={data.specs.power}
          formatValue={(v) => Math.round(v).toString()}
        />
        <Typography variant="subtitle1">HP</Typography>
      </SmallCard>

      <SmallCard>
        <Typography variant="h6">Acceleration</Typography>
        <AnimatedNumber
          value={data.specs.acceleration}
          formatValue={(v) => v.toFixed(1)}
        />
        <Typography variant="subtitle1">0-60 mph (s)</Typography>
      </SmallCard>

      <SmallCard>
        <Typography variant="h6">Top Speed</Typography>
        <AnimatedNumber
          value={data.specs.speed}
          formatValue={(v) => Math.round(v).toString()}
        />
        <Typography variant="subtitle1">km/h</Typography>
      </SmallCard>

      <MediumCard>
        <ChartTitle variant="h6" gutterBottom>
          Performance Metrics
        </ChartTitle>
        <ResponsiveContainer width="100%" height="90%">
          <RadarChart
            data={data.performance}
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          >
            <PolarGrid stroke="#ffffff22" />
            <PolarAngleAxis dataKey="aspect" stroke="#fff" />
            {/* <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#ffffff44" /> */}
            <Radar
              name="Performance"
              dataKey="value"
              stroke="#00a2ff"
              fill="#00a2ff"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </MediumCard>

      <SmallCard>
        <Typography variant="h6" gutterBottom>
          Maintenance Status
        </Typography>
        {data.maintenanceStats.map((stat, index) => (
          <ProgressContainer key={stat.name}>
            <Typography
              variant="body2"
              style={{ marginBottom: "4px", textAlign: "left" }}
            >
              {stat.name}: {stat.value}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={stat.value}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "#ffffff22",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: COLORS[index],
                  borderRadius: 4,
                },
              }}
            />
          </ProgressContainer>
        ))}
      </SmallCard>

      <WideCard>
        <ChartTitle variant="h6" gutterBottom>
          Fuel Consumption History
        </ChartTitle>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            data={data.fuelHistory}
            margin={{ top: 10, right: 30, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00a2ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00a2ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
            <XAxis dataKey="month" stroke="#ffffff88" />
            <YAxis stroke="#ffffff88" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#242424",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00a2ff"
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </WideCard>

      <SmallCard>
        <Typography variant="h6">Range</Typography>
        <AnimatedNumber
          value={data.specs.range}
          formatValue={(v) => Math.round(v).toString()}
        />
        <Typography variant="subtitle1">km</Typography>
      </SmallCard>

      <SmallCard>
        <Typography variant="h6">Weight</Typography>
        <AnimatedNumber
          value={data.specs.weight}
          formatValue={(v) => Math.round(v).toString()}
        />
        <Typography variant="subtitle1">kg</Typography>
      </SmallCard>

      <SmallCard>
        <Typography variant="h6">Price</Typography>
        <AnimatedNumber
          value={data.specs.price / 1000}
          formatValue={(v) => `$${Math.round(v)}K`}
        />
        <Typography variant="subtitle1">USD</Typography>
      </SmallCard>
    </DashboardGrid>
  );
}

export default Dashboard;
