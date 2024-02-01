import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useStation } from "../contexts/StationContext";

function Player() {
    const { currentStation, selectNext, selectPrevious } = useStation();
    return (
        <div className="player">
            <AudioPlayer
                autoPlay
                src={currentStation?.url}
                onPlay={(e) => console.log(e)}
                showSkipControls={true}
                showJumpControls={false}
                header={
                    currentStation ? `Now playing: ${currentStation?.name}` : ""
                }
                onClickNext={(e) => {
                    selectNext();
                    console.log(e);
                }}
                onClickPrevious={(e) => {
                    selectPrevious();
                    console.log(e);
                }}
            />
        </div>
    );
}

export default Player;