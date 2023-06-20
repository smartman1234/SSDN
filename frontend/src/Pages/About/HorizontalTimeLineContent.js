import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import HorizontalTimeline from "./HorizontalTimeLine";
import HorizontalTimelineConfigurator from "./HorizontalTimeLineConfiguration";

export default class HorizontalTimelineContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      previous: 0,
      showConfigurator: false,
      minEventPadding: 20,
      maxEventPadding: 20,
      linePadding: 100,
      labelWidth: 100,
      fillingMotionStiffness: 150,
      fillingMotionDamping: 25,
      slidingMotionStiffness: 150,
      slidingMotionDamping: 25,
      stylesForeground: "#46c894",
      stylesOutline: "var(--color-white)",
      isTouchEnabled: true,
      isKeyboardEnabled: true,
      isOpenEnding: true,
      isOpenBeginning: true,
    };
  }

  static propTypes = {
    content: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  componentWillMount() {
    this.dates = this.props.content.map((entry) => entry.date);
  }

  componentWillReceiveProps(nextProps) {
    this.dates = nextProps.content.map((entry) => entry.date);
  }

  render() {
    const state = this.state;

    const views = this.props.content.map((entry, index) => {
      return (
        <div className="container" key={index}>
          {entry.component}
        </div>
      );
    });

    let configurator = <div></div>;
    if (this.state.showConfigurator) {
      configurator = (
        <HorizontalTimelineConfigurator
          setConfig={(key, value) => {
            this.setState({ [key]: value });
          }}
          {...this.state}
        />
      );
    }

    return (
      <div>
        <div style={{ width: "100%", height: "100px" }}>
          <HorizontalTimeline
            fillingMotion={{
              stiffness: state.fillingMotionStiffness,
              damping: state.fillingMotionDamping,
            }}
            index={this.state.value}
            indexClick={(index) => {
              this.setState({ value: index, previous: this.state.value });
            }}
            getLabel={function (date) {
              return date?.slice(0, 4);
            }}
            isKeyboardEnabled={state.isKeyboardEnabled}
            isTouchEnabled={state.isTouchEnabled}
            labelWidth={state.labelWidth}
            linePadding={state.linePadding}
            maxEventPadding={state.maxEventPadding}
            minEventPadding={state.minEventPadding}
            slidingMotion={{
              stiffness: state.slidingMotionStiffness,
              damping: state.slidingMotionDamping,
            }}
            styles={{
              background: state.stylesBackground,
              foreground: state.stylesForeground,
              outline: state.stylesOutline,
            }}
            values={this.dates}
            isOpenEnding={state.isOpenEnding}
            isOpenBeginning={state.isOpenBeginning}
          />
        </div>
          <SwipeableViews
            index={this.state.value}
            onChangeIndex={(value, previous) => {
              this.setState({ value: value, previous: previous });
            }}
            resistance
          >
            {views}
          </SwipeableViews>
      </div>
    );
  }
}
