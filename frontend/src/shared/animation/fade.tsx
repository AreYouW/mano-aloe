import React from "react";

interface FadeProps {
    mounted: boolean,
    childComponent: React.ReactElement
}

interface FadeState {
    show: boolean;
    style :{
        opacity: number,
        transition: string
    }
}

export default class Fade extends React.Component<FadeProps, FadeState> {
    constructor(props: FadeProps) {
        super(props);
        this.transitionEnd = this.transitionEnd.bind(this);
        this.mountStyle = this.mountStyle.bind(this);
    }

    state: FadeState ={
        show: true,
        style: {
            opacity: 0,
            transition: 'all 2s ease',
        }
    }

    static getDerivedStateFromProps(props: FadeProps, state: FadeState): FadeState {
        let newState: FadeState = {
            show: state.show,
            style: {
                opacity: state.style.opacity,
                transition: state.style.transition
            }
        };
        if(!props.mounted) {
            newState.style.opacity = 0;
            return newState;
        }
        newState.show = true;
        return newState;
    }

    mountStyle(): void {
            this.setState({
                style: {
                    opacity: 1,
                    transition: 'all 1s ease',
                }
            })
    }

    componentDidMount(): void {
        setTimeout(this.mountStyle, 10);
    }

    transitionEnd(): void{
        if(!this.props.mounted){
            this.setState({
                show: false
            })
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
