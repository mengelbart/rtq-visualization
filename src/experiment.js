class Experiment {
  id = '';

  handler = '';

  file = '';

  bandwidth = 0;

  congestionControl = '';

  feedbackFrequency = 0;

  version = '';

  requestKeyframes = false;

  data = {};

  constructor(id, {
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
    this.id = id;
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
    return `${this.congestionControl}: ${this.feedbackFrequencyString()}, ${this.keyframeRequestString()}`;
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
