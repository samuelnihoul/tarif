'use client'
import { useState, ChangeEvent } from "react";

const Calculator: React.FC = () => {
  const [yearlyIncome, setYearlyIncome] = useState<string | number>(""); // Can be a string or a number to allow for empty input
  const [givebackRatePercent, setGivebackRatePercent] = useState<string | number>(""); // Can be a string or a number to allow for empty input
  const [result, setResult] = useState<Record<string, number> | null>(null); // Result is either null or an object with number values

  const calculate = () => {
    if (typeof yearlyIncome === "string" || typeof givebackRatePercent === "string") return;

    const hourlyRate = yearlyIncome / 84600;
    const givebackRate = (givebackRatePercent / 100) * hourlyRate;
    const tonnePrice = 14;
    const SCC = 130000;
    const ROI = SCC / tonnePrice;
    const giveBackValue = givebackRate * ROI;
    const carbonIntensity = 0.26 //kg/USD https://www.iea.org/data-and-statistics/charts/co2-emissions-intensity-of-gdp-1990-2021  , world
    const salaryCost = hourlyRate * carbonIntensity * SCC / 1000
    const hourlyNet = hourlyRate + giveBackValue - salaryCost;
    const minutlyNet = hourlyNet / 60;
    const secondlyNet = minutlyNet / 60;
    const microsecondNet = secondlyNet / 1000;

    const tonnePerHour = SCC / hourlyNet;
    const kgPerMinute = SCC / minutlyNet / 1000;
    const gramPerSecond = SCC / secondlyNet / 1000;

    setResult({
      hourlyNet,
      minutlyNet,
      secondlyNet,
      microsecondNet,
      tonnePerHour,
      kgPerMinute,
      gramPerSecond,
    });
  };

  return (
    <div className="container mx-auto p-8 bg-gray-800 ">
      <h1 className="">Tarif</h1>
      <label>
        Yearly Income ($):&nbsp;
        <input
          type="number"
          value={yearlyIncome}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setYearlyIncome(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        Giveback Rate (%):&nbsp;
        <input
          type="number"
          value={givebackRatePercent}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setGivebackRatePercent(Number(e.target.value))}
        />
      </label>
      <br />
      <button onClick={calculate}>Calculate</button>

      {result && (
        <div>
          <h2>Results:</h2>
          <div>Hourly Net: ${result.hourlyNet.toFixed(2)}</div>
          <div>Minutly Net: ${result.minutlyNet.toFixed(2)}</div>
          <div>Secondly Net: ${result.secondlyNet.toFixed(2)}</div>
          <div>Microsecond Net: ${result.microsecondNet.toFixed(6)}</div>
          <br />
          <div>Tonnes per Hour: {result.tonnePerHour.toFixed(2)}</div>
          <div>kg per Minute: {result.kgPerMinute.toFixed(2)}</div>
          <div>g per Second: {result.gramPerSecond.toFixed(2)}</div>
          *Values in the second section say how much CO2 you are saving per unit of time. Any action more efficient than that is a must do, anything below is a pass.
        </div>
      )}
    </div>
  );
};

export default Calculator;
