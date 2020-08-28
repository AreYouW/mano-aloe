import React from "react";
import Spinner from "../../components/spinner/spinner";

export interface BasePageProps {
}

export interface BasePageState {
    showSpinner: boolean
}

export default class BasePage<P extends BasePageProps, S extends BasePageState> extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
    }

    state = {
        showSpinner: true
    } as S

    public toggleSpinner(): void {
        this.setState({showSpinner: !this.state.showSpinner});
    }

    renderSpinner(): JSX.Element {
        return (
            <Spinner/>
        )
    }
}