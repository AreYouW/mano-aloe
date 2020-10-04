import React from 'react';

import ArchiveCard from "./archiveCard";
import "./archiveSection.css";

export default function ArchiveSection(): JSX.Element {
    return (
        <div className="video-container">
            <ArchiveCard who="coco" style={{ float: "left" }} />
            <ArchiveCard who="haachama" style={{ float: "right" }} />
        </div>
    );
}
