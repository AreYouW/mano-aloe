import React from 'react';

import ArchiveCard from "./archiveCard";
import "./archiveSection.css";

export default function ArchiveSection(): JSX.Element {
    return (
        <div id="video-anchor" className="video-container">
            <ArchiveCard who="coco" fallback="0ngDDHw45AM" />
            <ArchiveCard who="haachama" fallback="ZDoyb3CWQnE" />
        </div>
    );
}
