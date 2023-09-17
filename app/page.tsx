'use client'
import { useState, ChangeEvent } from "react";

const Calculator: React.FC = () => {
  const [yearlyIncome, setYearlyIncome] = useState<string | number>(""); // Can be a string or a number to allow for empty input
  const [givebackRatePercent, setGivebackRatePercent] = useState<string | number>(""); // Can be a string or a number to allow for empty input
  const [result, setResult] = useState<Record<string, number> | null>(null); // Result is either null or an object with number values

  const calculate = (x: number = 1) => {

    if (typeof yearlyIncome === "string" || typeof givebackRatePercent === "string") return;

    const hourlyRate = yearlyIncome / 84600;
    const givebackRate = (givebackRatePercent / 100) * hourlyRate;// how much you give per hour
    const tonnePrice = 12; // https://marketplace.goldstandard.org
    const SCC = 130000;// USD/tonne
    const ROI = SCC / tonnePrice;
    const giveBackValue = givebackRate * ROI; // debatable, hp of instantaneity, hp of no double people-crediting
    const carbonIntensity = 0.26 // kg/USD, https://www.iea.org/data-and-statistics/charts/co2-emissions-intensity-of-gdp-1990-2021  , world
    const salaryCost = hourlyRate * carbonIntensity * SCC / 1000
    const hourlyNet = (hourlyRate + giveBackValue - salaryCost) * x
    const minutlyNet = hourlyNet / 60;
    const secondlyNet = minutlyNet / 60;
    const microsecondNet = secondlyNet / 1000;
    const hourPerTonne = hourlyNet / SCC;
    const minutePerKg = minutlyNet / (SCC / 1000);
    const secondPerGram = secondlyNet / (SCC / 1000000);

    setResult({
      hourlyNet,
      minutlyNet,
      secondlyNet,
      microsecondNet,
      hourPerTonne,
      minutePerKg,
      secondPerGram,
    })
  }

  return (
    <div className="container mx-auto p-8 bg-gray-800 ">
      <h1 className="text-xl">Tarif</h1>
      <label>
        Yearly Income ($):&nbsp;
        <input
          type="number"
          value={yearlyIncome}
          className="text-black"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setYearlyIncome(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        Giveback Rate (%):&nbsp;
        <input
          type="number"
          className="text-black"
          value={givebackRatePercent}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setGivebackRatePercent(Number(e.target.value))}
        />
      </label>
      <br />
      <button onClick={() => calculate()} className="text-m p-2 m-2 bg-green-500 text-white rounded">Calculate</button>

      {result && (
        <div>
          <h2 className="text-l">Results:</h2>
          Values in this section indicate your added value per unit of time. It can be used to discriminate actions worth your time.
          <div>Hourly Net: ${result.hourlyNet.toFixed(2)}</div>
          <div>Minutly Net: ${result.minutlyNet.toFixed(2)}</div>
          <div>Secondly Net: ${result.secondlyNet.toFixed(2)}</div>
          <div>Microsecond Net: ${result.microsecondNet.toFixed(6)}</div>
          <br />
          Values in this section give the max amount of time to spend to avoid emissions of yours. Anything below that is a must do.
          <div>hour per tonne: {result.hourPerTonne.toFixed(2)}</div>
          <div>minute per kg: {result.minutePerKg.toFixed(2)}</div>
          <div>second per gram: {result.secondPerGram.toFixed(2)}</div><br />
          <button onClick={() => calculate(10)} className="m-2 p-2 bg-yellow-500 text-white rounded">10x (focus mode)</button>
          <button onClick={() => calculate(100)} className="m-2 p-2 bg-red-500 text-white rounded">100x (sprint mode)
          </button>
        </div>
      )}
    </div>
  );
};

export default Calculator;
