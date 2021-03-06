class Experiment {
  firebaseID = '';

  id = '';

  handler = '';

  file = '';

  bandwidth = 0;

  congestionControl = '';

  feedbackFrequency = 0;

  feedbackAlgorithm = '';

  version = '';

  requestKeyframes = false;

  data = {};

  constructor(firebaseID, {
    ID,
    handler,
    filename,
    bandwidth,
    // eslint-disable-next-line camelcase
    congestion_control,
    // eslint-disable-next-line camelcase
    feedback_frequency,
    // eslint-disable-next-line camelcase
    feedback_algorithm,
    version,
    // eslint-disable-next-line camelcase
    request_key_frames,
    iperf,
    data,
  }) {
    this.firebaseID = firebaseID;
    this.id = ID;
    this.handler = handler;
    this.file = filename;
    this.bandwidth = bandwidth;
    // eslint-disable-next-line camelcase
    this.congestionControl = congestion_control;
    // eslint-disable-next-line camelcase
    this.feedbackFrequency = feedback_frequency;
    // eslint-disable-next-line camelcase
    this.feedbackAlgorithm = feedback_algorithm;
    this.version = version;
    // eslint-disable-next-line camelcase
    this.requestKeyframes = request_key_frames;
    this.iperf = iperf;
    this.data = data;
  }

  title() {
    const title = [
      `${this.file}, ${this.bandwidthString()}`,
      this.congestionControlString(),
    ];
    if (this.iperf) {
      title.push('second stream: iperf');
    }
    return title;
  }

  bandwidthString() {
    if (this.bandwidth <= 0) {
      return 'no bw limit';
    }
    return `${this.bandwidth / 1000000}Mb/s`;
  }

  congestionControlString() {
    if (this.congestionControl === 'none') {
      return 'no cc';
    }
    return `${this.congestionControl}: ${this.feedbackFrequencyString()}, ${this.keyframeRequestString()}, feedback algo: ${this.feedbackAlgorithm}`;
  }

  feedbackFrequencyString() {
    if (this.congestionControl === 'none') {
      return '';
    }
    return `${this.feedbackFrequency / 1000000}ms`;
  }

  keyframeRequestString() {
    if (this.congestionControl === 'none') {
      return '';
    }
    return `${this.requestKeyframes ? 'keyframe requests' : 'no keyframe requests'}`;
  }
}

export default Experiment;
