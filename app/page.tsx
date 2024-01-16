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
    const tonnePrice = 2.6; // https://marketplace.goldstandard.org
    const SCC = 130000;// USD/tonne
   
    const minutlyNet = hourlyRate / 60;
    const secondlyNet = minutlyNet / 60;
    const millisecondNet = secondlyNet / 1000;
    const hourPerTonne = SCC / hourlyRate;
    const minutePerKg = (SCC / 1000) / minutlyNet;
    const secondPerGram = (SCC / 1000000) / secondlyNet;

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
      <h1 className="text-4xl m-3 text-center">Tarif</h1>
      <h2 className="text-3xl m-2 text-center">Which CO2 emissions you should avoid right now.</h2>
      <label>
        Yearly Gross Income ($):&nbsp;
        <input
          type="number"
          value={yearlyIncome}
          className="text-black"
          onChange={(e: ChangeEvent<HTMLInputElement>) => { e.target.value ? setYearlyIncome(Number(e.target.value)) : setYearlyIncome("") }}
        />
      </label>
      <button onClick={() => calculate()} className="text-m p-2 m-2 bg-green-500 text-white rounded">Calculate</button>

      {result && (
        <div>
          <h2 className="text-l p-2 m-2">Results:</h2>
        <p>  Values in this section indicate your added value per unit of time. It can be used to discriminate actions worth your time.
          </p>
          <ul>
          <li>hourly net: ${result.hourlyNet.toFixed(2)}</li>
          <li>minutly net: ${result.minutlyNet.toFixed(2)}</li>
          <li>secondly net: ${result.secondlyNet.toFixed(2)}</li>
          <li>millisecond net: ${result.microsecondNet.toFixed(6)}</li>
         </ul>
         <p> Values in this section give the max amount of time to spend to avoid emissions of yours. Anything below that is a must do.
          </p>
           <ul>
          <li>hour per tonne: {result.hourPerTonne.toFixed(2)}</li>
          <li>minute per kg: {result.minutePerKg.toFixed(2)}</li>
          <li>second per gram: {result.secondPerGram.toFixed(2)}</li>
          </ul>
          <button onClick={() => calculate(1)} className="m-2 p-2 bg-green-500 text-white rounded">1x (relax mode)</button>
          <button onClick={() => calculate(10)} className="m-2 p-2 bg-yellow-500 text-white rounded">10x (focus mode)</button>
          <button onClick={() => calculate(100)} className="m-2 p-2 bg-red-500 text-white rounded">100x (sprint mode)
          </button>
        </div>
      )}
    </div>
  );
};

export default Calculator;
