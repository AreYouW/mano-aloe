import React from 'react';

import ArchiveCard from "./archiveCard";
import "./archiveSection.css";

export default function ArchiveSection(): JSX.Element {
    return (
        <div>
            <div className="header-section">
                Scroll down to see today's random archives!
            </div>
            <div id="video-anchor" className="video-container">
                <ArchiveCard who="coco" fallback="0ngDDHw45AM" />
                <ArchiveCard who="haachama" fallback="ZDoyb3CWQnE" />
            </div>
        </div>
    );
}
