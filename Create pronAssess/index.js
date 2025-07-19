const sdk = require('microsoft-cognitiveservices-speech-sdk');

module.exports = async function (context, req) {
  const speechKey = process.env.SPEECH_KEY;
  const region = process.env.SPEECH_REGION;

  const config = sdk.SpeechConfig.fromSubscription(speechKey, region);
  config.speechRecognitionLanguage = req.body.language || "zh-HK";

  const audio = Buffer.from(req.body.audio, 'base64');
  const audioConfig = sdk.AudioConfig.fromWavFileInput(audio);

  const assessConfig = sdk.PronunciationAssessmentConfig.fromJson({
    referenceText: req.body.referenceText || "友誼",
    gradingSystem: "HundredMark",
    granularity: "Word",
    enableMiscue: true
  });

  const recognizer = new sdk.SpeechRecognizer(config, audioConfig);
  assessConfig.applyTo(recognizer);

  recognizer.recognizeOnceAsync(result => {
    const feedback = result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult);
    context.res = { status: 200, body: JSON.parse(feedback) };
    recognizer.close();
  });
};
