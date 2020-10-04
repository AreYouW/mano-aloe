import React from "react";
import CSS from "csstype";

import SessionService from "../../services/session.service";
import ManoAloeService from "../../controllers/mano-aloe.service";
import {Archive, archiveFromJson, ArchiveJson} from "../../models/archive";
import "./archiveSection.css";

interface ArchiveCardProps {
    who: string;
    fallback: string;
    style: CSS.Properties;
}

interface ArchiveCardState {
    archive: Archive | null;
}

export default class ArchiveCard extends React.Component<ArchiveCardProps, ArchiveCardState> {
    constructor(props: ArchiveCardProps,
                private manoAloeService: ManoAloeService) {
        super(props);
        this.manoAloeService = new ManoAloeService();
    }

    state: ArchiveCardState = {
        archive: null
    };

    private loadArchiveFromAPI(): void {
        const { who } = this.props;
        this.manoAloeService.getRandomArchive(who)
            .then((randomArchive: Archive) => {
                this.setState({ archive: randomArchive });
            })
            .catch((error: Error) => {
                const fallbackArchiveJson: ArchiveJson = { archiveID: 0, archiveURL: this.props.fallback };
                this.setState({ archive: archiveFromJson(fallbackArchiveJson) });
                console.log(error);
            });
    }

    componentDidMount() {
        this.loadArchiveFromAPI();
    }

    render(): JSX.Element {
        const { archive } = this.state;
        if (archive) {
            return (
                <iframe title="A Random Archive" className="video-tag"
                        style={this.props.style}
                        src={archive.archiveURL} frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen />
            );
        } else {
            return (
                <div className="video-tag" style={this.props.style}>
                    Loading...
                </div>
            );
        }
    }
}
