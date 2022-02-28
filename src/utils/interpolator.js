import React from "react";

export function useInterp(start, end, rate){
    const [startTime, setStartTime] = React.useState(Date.now());

    const [progress, setProgress] = React.useState(start);

    React.useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const portion = (now - startTime) / (1000 * rate);
            const newProgress = Math.trunc(Math.min(start + (end - start) * portion, end));
            setProgress(newProgress);
            if (newProgress == end){
                clearInterval(interval);
            }
        }, 5);

        return () => clearInterval(interval);
    });

    console.log("Prog",progress);

    return progress;
}

export function Interpolated(props){
    const {start, end} = props;
    let rate = props.rate || 1;
    const progress = useInterp(start, end, rate);
    return <>{progress}</>;
}