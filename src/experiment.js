class Experiment {
  handler = '';

  file = '';

  bandwidth = 0;

  congestionControl = '';

  feedbackFrequency = 0;

  data = {};

  constructor({
    Handler, File, Bandwidth, Data, CongestionControl, FeedbackFrequency,
  }) {
    this.handler = Handler;
    this.file = File;
    this.bandwidth = Bandwidth;
    this.congestionControl = CongestionControl;
    this.feedbackFrequency = FeedbackFrequency;
    this.data = Data;
  }
}

export default Experiment;
