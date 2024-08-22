import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';

function App() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [investmentData, setInvestmentData] = useState([initialInvestment]);
  const [periods, setPeriods] = useState(10);
  const [growthRate, setGrowthRate] = useState(5); 

  const calculateInvestment = () => {
    let data = [initialInvestment];
    for (let i = 1; i <= periods; i++) {
      let newValue = data[i - 1] * (1 + growthRate / 100);
      data.push(newValue);
    }
    setInvestmentData(data);
  };

  const handleInvestmentChange = (e) => {
    setInitialInvestment(Number(e.target.value));
  };

  const handlePeriodsChange = (e) => {
    setPeriods(Number(e.target.value));
  };

  const handleGrowthRateChange = (e) => {
    setGrowthRate(Number(e.target.value));
  };

  const data = {
    labels: Array.from({ length: periods + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: 'Investment Value',
        data: investmentData,
        fill: false,
        backgroundColor: '#00ffff',
        borderColor: '#00ffff',
      },
    ],
  };

  return (
    <div className="container">
      <h1>Simulador de Investimentos</h1>
      <div className="form-group">
        <label>Investimento Inicial:</label>
        <input
          type="number"
          value={initialInvestment}
          onChange={handleInvestmentChange}
        />
      </div>

      <div className="form-group">
        <label>Períodos (anos):</label>
        <input
          type="number"
          value={periods}
          onChange={handlePeriodsChange}
        />
      </div>

      <div className="form-group">
        <label>Taxa de Crescimento Anual (%):</label>
        <input
          type="number"
          value={growthRate}
          onChange={handleGrowthRateChange}
        />
      </div>

      <button onClick={calculateInvestment}>Simular</button>

      <div className="chart-container">
        <Line data={data} />
      </div>
    </div>
  );
}

export default App;
