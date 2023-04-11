import ReactPlayer from "react-player";
import styles from "./index.module.scss";

const VideoPlayer = (props) => {
  const {
    playbackId,
    fwdRef,
    onEnded = () => {},
    onStart = () => {},
    progressInterval = 1000,
    onProgress = () => {},
    controls = false,
    muted = true,
    ...rest
  } = props;

  return (
    <>
      <ReactPlayer
        className={styles.videoPlayer}
        width="100%"
        height="100%"
        url={`https://stream.mux.com/${playbackId}.m3u8`}
        playing={true}
        playsinline={true}
        muted={muted}
        ref={fwdRef}
        loop
        progressInterval={progressInterval}
        onProgress={onProgress}
        onEnded={onEnded}
        onStart={onStart}
        controls={controls}
        {...rest}
      />
    </>
  );
};

export default VideoPlayer;
