import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Nav from "./components/nav.jsx";
import NameCard from "./components/nameCard.jsx";
import AppSlide from "./components/appSlide.jsx";
import WhiteAlbum from "./components/whiteAlbum.jsx";
import Footer from "./components/footer.jsx";
// import SettingTab from "./components/settingTab.jsx";
import Apps from "./components/apps.jsx";
import Journey from "./components/journey.jsx";
import BGDecoration from "./components/parts/bgDecoration.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMode: false,
      appNum: 0,
      language: "",
      time: 0, //0,1,2,3 => morning,afternoon,evening,midnight
      displayApps: false,
      displayJourney: false,
      lightApps: false,
      lightJourney: false,
      appsDisplayID: 0
    };
    this.setIndexState = this.setIndexState.bind(this);
    this.switchApps = this.switchApps.bind(this);
    this.switchJourney = this.switchJourney.bind(this);
  }
  setIndexState(obj) {
    this.setState(obj);
  }
  switchApps() {
    var temp = !this.state.displayApps;
    document.body.style.overflowY = temp ? "hidden" : "auto";
    this.setState({ displayApps: temp, displayJourney: false });
    return temp;
  }
  switchJourney() {
    var temp = !this.state.displayJourney;
    if (temp)
      document.querySelector("#journeys-branch-mask-anime").beginElement(); // get by id won't work
    document.body.style.overflowY = temp ? "hidden" : "auto";
    this.setState({ displayJourney: temp, displayApps: false });
    return temp;
  }
  getTime() {
    var date = new Date();
    var hour = date.getHours();
    console.log(
      `Local time: ${("0" + hour).slice(-2)}:${("0" + date.getMinutes()).slice(
        -2
      )}`
    );
    if (hour < 5) hour = 3;
    //midnight
    else if (hour < 12) hour = 0;
    //morning
    else if (hour < 17) hour = 1;
    //afternoon
    else if (hour < 23) hour = 2;
    //evening
    else hour = 3;
    this.setState({ time: hour });
  }
  // getLang() {
  //   var language = window.navigator.userLanguage || window.navigator.language;
  //   console.log(`System language ${language} detected`);
  // }
  // checkWindowSize() {
  //   var notCalled = true;
  //   const alertSize = () => {
  //     if (notCalled && window.innerHeight > 1382) {
  //       alert("Sorry!\nThe current styling might not fit your device");
  //       notCalled = false;
  //     }
  //   };
  //   alertSize();
  //   window.addEventListener("resize", alertSize);
  // }
  initMobile() {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
      navigator.userAgent.match(/Opera Mini/i) ||
      navigator.userAgent.match(/IEMobile/i)
    ) {
      var temp = confirm(
        "Sorry! Current styling and animation might not fit your device\n" +
          "Do you want to rotate the view into landscape?"
      );
      if (temp) {
        // order of these styling can not be changed. the position is affected by the transform origin point
        document.body.style.overflow = "hidden";
        document.documentElement.classList.add("landscape");
        document.documentElement.style.width = window.innerHeight + "px";
        document.documentElement.style.top =
          window.innerHeight - window.innerWidth - 1000;
        this.setState({ mobileMode: true });
      }
    }
  }
  componentDidMount() {
    console.log("version:1.0.11");
    this.getTime();
    // this.getLang();
    // this.checkWindowSize();
    this.initMobile();
    axios.post("https://whitealbum.herokuapp.com/porthub/visit");
  }
  render() {
    return (
      <div>
        <BGDecoration />
        <Nav
          mobileMode={this.state.mobileMode}
          setIndexState={this.setIndexState}
          switchJourney={this.switchJourney}
          switchApps={this.switchApps}
          displayApps={this.state.displayApps}
          displayJourney={this.state.displayJourney}
          lightApps={this.state.lightApps}
          lightJourney={this.state.lightJourney}
        />
        <Apps
          displayApps={this.state.displayApps}
          appsDisplayID={this.state.appsDisplayID}
          setIndexState={this.setIndexState}
        />
        <Journey
          displayJourney={this.state.displayJourney}
          setIndexState={this.setIndexState}
        />
        {/* <SettingTab /> */}
        <div id="content">
          <NameCard appNum={this.state.appNum} time={this.state.time} />
          <AppSlide
            setIndexState={this.setIndexState}
            mobileMode={this.state.mobileMode}
          />
          <WhiteAlbum />
        </div>
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
