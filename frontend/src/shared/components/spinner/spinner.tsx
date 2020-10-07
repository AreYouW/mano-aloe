import React from "react";
import AloeHeartIcon from '../../../assets/icons/AloeHeartIcon.png';
import './spinner.css';

interface SpinnerProps {
}

interface SpinnerState {
}

export default class Spinner extends React.Component<SpinnerProps, SpinnerState> {
    constructor(props: SpinnerProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>
                <div className="loading-background height-width-100"/>
                <img className="loading-icon-center App-logo" src={AloeHeartIcon} alt="logo" />
            </div>
        )
    }
}
