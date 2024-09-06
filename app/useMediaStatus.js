import { useEffect, useState } from 'react';

export default function MediaQualityCheck() {
  const [videoQuality, setVideoQuality] = useState({});
  const [audioQuality, setAudioQuality] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let videoTrack, audioTrack, audioContext, analyser, mediaStreamSource;

    async function checkMediaQuality() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        // Video Quality Check
        videoTrack = stream.getVideoTracks()[0];
        const videoSettings = videoTrack.getSettings();
        const videoQuality = {
          width: videoSettings.width,
          height: videoSettings.height,
          frameRate: videoSettings.frameRate,
        };
        setVideoQuality(videoQuality);

        // Audio Quality Check
        audioTrack = stream.getAudioTracks()[0];
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        mediaStreamSource = audioContext.createMediaStreamSource(stream);
        mediaStreamSource.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteTimeDomainData(dataArray);

        const isSilent = dataArray.every(value => value === 128); // 128 means silence

        setAudioQuality(isSilent ? 'No input detected' : 'Microphone is working');

        setIsReady(true);

      } catch (err) {
        console.error('Error accessing media devices.', err);
        setIsReady(false);
      }
    }

    checkMediaQuality();

    return () => {
      if (videoTrack) videoTrack.stop();
      if (audioTrack) audioTrack.stop();
      if (audioContext) audioContext.close();
    };
  }, []);

  return (
    <div>
      <h2>Media Quality Check</h2>
      {isReady ? (
        <>
          <div>
            <h3>Video Quality</h3>
            <p>Resolution: {videoQuality.width}x{videoQuality.height}</p>
            <p>Frame Rate: {videoQuality.frameRate} fps</p>
          </div>
          <div>
            <h3>Audio Quality</h3>
            <p>{audioQuality}</p>
          </div>
        </>
      ) : (
        <p>Checking media quality...</p>
      )}
    </div>
  );
}
