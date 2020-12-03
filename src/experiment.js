class Experiment {
  handler = '';

  file = '';

  bandwidth = 0;

  congestionControl = '';

  feedbackFrequency = 0;

  version = '';

  data = {};

  constructor({
    Handler, File, Bandwidth, Data, CongestionControl, FeedbackFrequency, Version,
  }) {
    this.handler = Handler;
    this.file = File;
    this.bandwidth = Bandwidth;
    this.congestionControl = CongestionControl;
    this.feedbackFrequency = FeedbackFrequency;
    this.version = Version;
    this.data = Data;
  }
}

export default Experiment;
