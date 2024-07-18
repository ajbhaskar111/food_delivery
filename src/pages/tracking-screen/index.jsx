import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import ShareOnSocial from "react-share-on-social";

export default function TrackingScreen() {
  let { defaultintervalCount, defaulttime, defaultvalue } = useParams();
  const [visible, setVisible] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  let t = defaulttime ? new Date(defaulttime) : new Date();

  const [value, setValue] = useState(defaultvalue || 1);
  const [time, setTime] = useState(
    defaulttime ? new Date(Number(defaulttime)) : new Date()
  );
  const [intervalCount, setIntervalCount] = useState(
    defaultintervalCount || 1000
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, intervalCount);
    return () => clearInterval(interval);
  }, [intervalCount]);

  useEffect(() => {
    setIntervalCount(value * 1000);
  }, [value]);

  useEffect(() => {
    setShareUrl(
      window.location.origin +
        "/trackscreen/" +
        intervalCount +
        "/" +
        time.getTime() +
        "/" +
        value
    );
  }, [intervalCount, value, time]);

  const secondsStyle = {
    transform: `rotate(${time.getSeconds() * -6}deg)`,
  };

  const minutesStyle = {
    transform: `rotate(${time.getMinutes() * -6 + time.getSeconds() * 0.1}deg)`,
  };

  const hoursStyle = {
    transform: `rotate(${time.getHours() * 30 + time.getMinutes() * 1}deg)`,
  };

  const onShare = () => {
    setVisible(true);
  };

  return (
    <>
      <div className="pt-6 px-3">
        <div className={`grid `}>
          <div className="col-12 mb-4">
            <h4 className="txt-black text-2xl text-center mt-0 mb-3">
              Tracking your order
            </h4>
          </div>
          <div className="col-12 text-center mb-4">
            <div className="clock">
              <div className="hour-hand" style={hoursStyle} />
              <div className="minute-hand" style={minutesStyle} />
              <div className="second-hand" style={secondsStyle} />
              <div className="center-dot" />
              <span className="twelve">12</span>
              <span className="one">1</span>
              <span className="two">2</span>
              <span className="three">3</span>
              <span className="four">4</span>
              <span className="five">5</span>
              <span className="six">6</span>
              <span className="seven">7</span>
              <span className="eight">8</span>
              <span className="nine">9</span>
              <span className="ten">10</span>
              <span className="eleven">11</span>
            </div>
          </div>
          <div className="col-12 text-center">
            <div className="grid grid-nogutter w-14rem m-auto">
              <div className="col-1 text-left">1</div>
              <div className="col-10 text-center p-1">
                <Slider
                  value={value}
                  onChange={(e) => setValue(e.value)}
                  className="w-full"
                  min={1}
                  max={10}
                />
              </div>
              <div className="col-1 text-right">10</div>
            </div>
            <p> Interval : {intervalCount}</p>
            <p>Slider Value : {value}</p>
          </div>
          <div className="col-12 mt-5">
            {/* <ToastBox /> */}
            <div className="grid flex align-items-center">
              <div className="col-8">
                <ShareOnSocial link={shareUrl} linkTitle="Time track" noReferer>
                  <Button
                    onClick={onShare}
                    label="Share"
                    className="fs-14 p-button p-component p-button-primary no-underline text-center block"
                  />
                </ShareOnSocial>
              </div>
              <div className="col-4">
                <Link
                  to="/login"
                  className="txt-gray text-sm no-underline font-medium"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
