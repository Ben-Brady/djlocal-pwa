import { FC, useEffect, useRef, useState } from "preact/compat";
import RegionsPlugin, {
    type Region,
} from "wavesurfer.js/dist/plugins/regions.js";
import Wavesurfer from "wavesurfer.js";
import { clamp } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

const random = (min: number, max: number) => Math.random() * (max - min) + min;
const randomColor = () =>
    `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

const WaveSurfer: FC<{ data: Blob }> = ({ data }) => {
    const wsRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [ws, setWs] = useState<Wavesurfer | undefined>(undefined);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const container = wsRef.current;
        if (!container || !data) return;

        const regions = RegionsPlugin.create();

        const ws = Wavesurfer.create({
            container,
            width: "100%",
            autoplay: false,
            height: "auto",
            barGap: 2,
            barHeight: 1,
            barWidth: 3,
            barRadius: 9999,
            plugins: [regions],
        });
        setWs(ws);
        ws.setVolume(0);

        ws.loadBlob(data);
        regions.enableDragSelection({ color: "rgba(255, 0, 0, 0.1)" });

        regions.on("region-updated", (region) => {
            console.log("Updated region", region);
        });

        ws.on("play", () => setPlaying(true));
        ws.on("finish", () => setPlaying(false));
        ws.on("pause", () => setPlaying(false));

        ws.on("click", () => {
            ws.play();
        });

        ws.on("decode", (duration) => {
            setLoaded(true);

            regions.addRegion({
                start: 0,
                end: 10,
                color: randomColor(),
                content: "Fade In",
                id: "fade-in",
            });

            regions.addRegion({
                start: duration - 10,
                end: duration,
                color: randomColor(),
                content: "Fade Out",
                id: "fade-out",
            });
        });

        ws.on("timeupdate", (time) => {
            const allRegions = regions.getRegions();
            const fadeInRegion = allRegions.find(
                (region) => region.id === "fade-in",
            );
            const fadeOutRegion = allRegions.find(
                (region) => region.id === "fade-out",
            );

            const calculateRegionProgress = (region: Region) => {
                const regionDuration = region.end - region.start;
                const progress = time - region.start;
                const percent = progress / regionDuration;
                return clamp(percent, 0, 1);
            };

            if (fadeInRegion && time < fadeInRegion.end) {
                const percent = calculateRegionProgress(fadeInRegion);
                ws.setVolume(easeInQuart(percent));
            } else if (fadeOutRegion && time > fadeOutRegion.start) {
                const percent = calculateRegionProgress(fadeOutRegion);
                ws.setVolume(easeInQuart(1 - percent));
            } else {
                ws.setVolume(1);
            }

            if (fadeOutRegion && time > fadeOutRegion.end && ws.isPlaying())
                ws.pause();
        });

        return () => {
            setLoaded(false);
            ws.destroy();
            regions.destroy();
        };
    }, [data, wsRef]);

    return (
        <div class="size-full flex-row items-center gap-4">
            <div className="size-full" ref={wsRef} />
            <div
                class="size-8"
                role="button"
                onClick={() => {
                    setPlaying((playing) => {
                        if (playing && ws) ws.pause();
                        if (!playing && ws) ws.play();
                        return !playing;
                    });
                }}
            >
                <FontAwesomeIcon icon={!playing ? faPlay : faPause} />
            </div>
        </div>
    );
};

function easeInQuart(x: number): number {
    return x * x;
}

export default WaveSurfer;
