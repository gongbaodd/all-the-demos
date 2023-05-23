import { useState, useEffect, useRef } from "react";
import "./App.css";

// https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides/ftms-list-0000001055208574
const ServiceMap = {
  serviceFTMS: 0x1826,
  FTMSFeature: 0x2acc,
  FTMSStatus: 0x2ada,
  FTMSControlPoint: 0x2ad9,
  RowerData: 0x2ad1,
  TrainingStatus: 0x2ad3,
  InclinationRange: 0x2ad5,
  ResistenceLevelRange: 0x2ad6,
  HeartRateRange: 0x2ad7,
  PowerRange: 0x2ad8,
};

function App() {
  const device = useRef<BluetoothDevice | null>(null);

  return (
    <>
      <button
        onClick={() => {
          navigator.bluetooth
            .requestDevice({
              acceptAllDevices: true,
              optionalServices: Object.values(ServiceMap),
            })
            .then(async (d) => {
              device.current = d;
              console.log("device", d);
              const conn = await d.gatt?.connect();
              console.log("conn", conn);
              const ftms = await conn?.getPrimaryService(
                ServiceMap.FTMSFeature
              );
              console.log("FTMS", ftms);
            })
            .catch((e) => {
              console.log(e);
              console.log("CANCELLED");
            });
        }}
      >
        requestDevice
      </button>
    </>
  );
}

export default App;
