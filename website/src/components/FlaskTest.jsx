import { useEffect, useState } from "react";
import { Content } from "./Content";

export const FlaskTest = () => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
        setCurrentTime(data.time);
    });
    }, []);
    return (
        <Content title="Test">
            <div className="flex">
                Time: {currentTime}
            </div>
        </Content>
    )
}