import React from "react";

interface FadeProps {
    mounted: boolean,
    childComponent: React.ReactElement
}

interface FadeState {
    show: boolean;
    style :{
        fontSize: number,
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

    state: FadeState ={
        show: true,
        style: {
            fontSize: 60,
            opacity: 0,
            transition: 'all 2s ease',
        }
    }

    componentWillReceiveProps(newProps: FadeProps): void {
        if(!newProps.mounted)
            return this.unMountStyle();
        this.setState({
            show: true
        })
        setTimeout(this.mountStyle, 10);
    }

    unMountStyle(): void {
        this.setState({
            style: {
                fontSize: 60,
                opacity: 0,
                transition: 'all 1s ease',
            }
        })
    }

    mountStyle(): void {
        this.setState({
            style: {
                fontSize: 60,
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
        return this.state.show && this.renderFade();
    }
}
