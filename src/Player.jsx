import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function Player() {
    return (
        <div className="player">
            <AudioPlayer
                autoPlay
                src="https://mangoradio.stream.laut.fm/mangoradio?t302=2024-01-31_11-23-51&uuid=9a591259-6b16-4207-9a39-d48448272a38"
                onPlay={(e) => console.log(e)}
            />
        </div>
    );
}

export default Player;
