class Experiment {
  handler = '';

  file = '';

  bandwidth = 0;

  congestionControl = '';

  feedbackFrequency = 0;

  version = '';

  requestKeyframes = false;

  data = {};

  constructor({
    handler,
    filename,
    bandwidth,
    // eslint-disable-next-line camelcase
    congestion_control,
    // eslint-disable-next-line camelcase
    feedback_frequency,
    version,
    // eslint-disable-next-line camelcase
    request_key_frames,
    iperf,
    data,
  }) {
    this.handler = handler;
    this.file = filename;
    this.bandwidth = bandwidth;
    // eslint-disable-next-line camelcase
    this.congestionControl = congestion_control;
    // eslint-disable-next-line camelcase
    this.feedbackFrequency = feedback_frequency;
    this.version = version;
    // eslint-disable-next-line camelcase
    this.requestKeyframes = request_key_frames;
    this.iperf = iperf;
    this.data = data;
  }

  title() {
    return `${this.file}, ${this.bandwidth / 1000000}Mb/s, ${this.congestionControl}, ${this.feedbackFrequency / 1000000}ms, ${this.requestKeyframes ? 'keyframe requests' : ''}, ${this.iperf ? 'iperf' : ''}`;
  }
}

export default Experiment;
