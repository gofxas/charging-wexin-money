import { useEffect, useRef, useState } from "react";
import coinLogo from "/coin.svg";
import "./App.css";
import VConsole from "vconsole";
import CountUp from "react-countup";
import Modal from "./components/modal";
if (!location.host.includes("cpdd.cool")) {
  const vConsole = new VConsole();
}

function App() {
  const [status, updateStatus] = useState(false);
  const [number, setNumber] = useState(0);
  const [bnumber, setbNumber] = useState(0);
  // const [batteryManager, setbatteryManager] = useState(null);
  const batteryManager = useRef(null);
  const [msg, setMsg] = useState(false);
  const [msgtext, setMsgtext] = useState("");
  let timer;

  useEffect(() => {
    initBatteryManager();
  }, []);

  const initBatteryManager = async () => {
    if (!batteryManager?.current) {
      const res = await navigator.getBattery();
      // await setbatteryManager(() => res);
      batteryManager.current = res;
      updateStatus(batteryManager.current?.charging);
      chargingChangeSetnumber(batteryManager.current?.charging);
      // chargingchange
      batteryManager.current.addEventListener("chargingchange", (event) => {
        updateStatus(batteryManager.current?.charging);
        chargingChangeSetnumber(batteryManager.current?.charging);
      });
    }
  };

  const chargingChangeSetnumber = (charging) => {
    if (charging) {
      const plused = Math.random() * 100;
      setNumber((pre) => {
        setbNumber(() => pre);
        return pre + plused;
      });
      timer = setInterval(() => {
        const plused = Math.random() * 100;
        setNumber((pre) => {
          setbNumber(() => pre);
          return pre + plused;
        });
      }, 2000);
    } else {
      clearInterval(timer);
      timer = null;
    }
  };

  const chargeNumber = () => {
    if (batteryManager.current?.charging) {
      setMsgtext("正在充值！");
      setMsg(true);
    } else {
      setMsgtext("请连接充电器！");
      setMsg(true);
    }
  };

  const withdraw = () => {
    setMsgtext("你想得美呢！");
    setMsg(true);
  };

  return (
    <>
      <img className="logo" src={coinLogo} alt="coin" />
      <p className="title">我的零钱</p>
      {/* <p>{status ? "充电中" : "未充电"}</p> */}
      <p className="fee">
        <span className="unit">￥</span>
        <CountUp
          className="money"
          start={bnumber}
          end={number}
          duration={2}
          separator=","
          decimals={2}
          decimal="."
          useEasing={false}
        />
      </p>
      <div onClick={chargeNumber} className="btn charge">
        <span>充值</span>
      </div>
      <div onClick={withdraw} className="btn get">
        <span>提现</span>
      </div>
      <Modal visible={msg} setVisible={setMsg}>
        <p style={{ margin: 0, textAlign: "center" }}>{msgtext}</p>
      </Modal>
    </>
  );
}

export default App;
