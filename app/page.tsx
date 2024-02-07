'use client'
import React, { useState, ChangeEvent } from "react";

class Metrics {
  hourlyNet: number;
  minutelyNet: number;
  secondlyNet: number;
  millisecondNet: number;
  hourPerTonne: number;
  minutePerKg: number;
  secondPerGram: number;
  constructor(
    hourlyRate: number,
    minutelyNet: number,
    secondlyNet: number,
    millisecondNet: number,
    hourPerTonne: number,
    minutePerKg: number,
    secondPerGram: number
  ) {
    this.hourlyNet = hourlyRate;
    this.minutelyNet = minutelyNet;
    this.secondlyNet = secondlyNet;
    this.millisecondNet = millisecondNet;
    this.hourPerTonne = hourPerTonne;
    this.minutePerKg = minutePerKg;
    this.secondPerGram = secondPerGram;
  }
}

const Calculator: React.FC = () => {
  const [yearlyIncome, setYearlyIncome] = useState<number>(0);
  const [givebackRate, setGivebackRate] = useState<number>(0);
  const [result, setResult] = useState<Metrics>(
    new Metrics(0, 0, 0, 0, 0, 0, 0)
  );
  const SCC = 130000;
  const calculate = () => {
    if (!yearlyIncome) return;

    const hourlyRate = yearlyIncome / 8760;
    const hourlyGiveback = (givebackRate / 100) * hourlyRate;
    const tonnePrice = 2.6;

    const hourlyNet = hourlyGiveback / tonnePrice * SCC + hourlyRate;
    const minutelyNet = hourlyNet / 60;
    const secondlyNet = minutelyNet / 60;
    const millisecondNet = secondlyNet / 1000;
    const hourPerTonne = SCC / hourlyNet;
    const minutePerKg = (SCC / 1000) / minutelyNet;
    const secondPerGram = (SCC / 1000000) / secondlyNet;


    setResult(
      new Metrics(
        hourlyNet,
        minutelyNet,
        secondlyNet,
        millisecondNet,
        hourPerTonne,
        minutePerKg,
        secondPerGram
      )
    );
  };

  return (
    <div className="container mx-auto p-8 bg-gray-800 ">
      <h1 className="text-4xl m-3 text-center">Tarif</h1>
      <h2 className="text-3xl m-2 text-center">
        Which CO2 emissions you should avoid right now.
      </h2>
      <label>
        Yearly Gross Income ($):&nbsp;
        <input
          type="number"
          value={yearlyIncome}
          className="text-black"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setYearlyIncome(Number(e.target.value));
          }}
        />
      </label>
      <br />
      <label>
        Giveback Rate (%):&nbsp;
        <input
          type="number"
          value={givebackRate}
          className="text-black"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setGivebackRate(Number(e.target.value));
          }}
        />
      </label>
      <br />
      <button
        onClick={() => calculate()}
        className="text-m p-2 m-2 bg-green-500 text-white rounded"
      >
        Calculate
      </button>

      {yearlyIncome != 0 && (
        <div>
          <h2 className="text-l p-2 m-2">Results:</h2>
          <p>
            Values in this section indicate your added value per unit of time.
            It can be used to discriminate actions worth your time.
          </p>
          <ul>
            <li>hourly net: ${result.hourlyNet.toFixed(2)}</li>
            <li>minutely net: ${result.minutelyNet.toFixed(2)}</li>
            <li>secondly net: ${result.secondlyNet.toFixed(2)}</li>
            <li>millisecond net: ${result.millisecondNet.toFixed(6)}</li>
          </ul>
          <p>
            Values in this section give the max amount of time to spend to
            avoid emissions of yours. Anything below that is a must do.
          </p>
          <ul>
            <li>hour per tonne: {result.hourPerTonne.toFixed(2)}</li>
            <li>minute per kg: {result.minutePerKg.toFixed(2)}</li>
            <li>second per gram: {result.secondPerGram.toFixed(2)}</li>
          </ul>
          <ul>
            <li>SCC per tonne: {SCC}</li>
            <li>SCC per kg: {SCC / 1000}</li>
            <li>SCC per gram: {SCC / 1000000}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calculator;
