import React from "react";

interface FadeProps {
    mounted: boolean,
    childComponent: React.ReactElement
}

interface FadeState {
    show: boolean;
    style: {
        opacity: number,
        transition: string
    }
}

export default class Fade extends React.Component<FadeProps, FadeState> {
    constructor(props: FadeProps) {
        super(props);
        this.transitionEnd = this.transitionEnd.bind(this);
        this.mountStyle = this.mountStyle.bind(this);
        this.unMountStyle = this.unMountStyle.bind(this);
    }

    state: FadeState = {
        show: this.props.mounted,
        style: {
            opacity: 0,
            transition: 'all 2s ease',
        }
    }

    componentDidUpdate(prevProps: Readonly<FadeProps>, prevState: Readonly<FadeState>): void {
        if (this.state.style.opacity === 0 && this.props.mounted && !this.state.show) {
            this.mountComponent();
            setTimeout(this.mountStyle, 10);
        }
        if (this.state.style.opacity === 1 && !this.props.mounted && this.state.show) {
            this.unMountStyle();
        }
    }

    unMountStyle(): void {
        this.setState({
            style: {
                opacity: 0,
                transition: 'all 1s ease',
            }
        })
    }

    mountStyle(): void {
        this.setState({
            style: {
                opacity: 1,
                transition: 'all 1s ease',
            }
        })
    }

    mountComponent(): void {
        this.setState({show: true});
    }

    unMountComponent(): void {
        this.setState({show: false});
    }

    transitionEnd(): void{
        if(!this.props.mounted){
            setTimeout(this.unMountComponent.bind(this), 1000);
        }
    }

    renderFade(): JSX.Element {
        return (
            <div style={this.state.style} onTransitionEnd={this.transitionEnd}>
                {this.props.childComponent}
            </div>
        )
    }

    render() {
        return this.state.show ? this.renderFade() : <div/>;
    }
}
