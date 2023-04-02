import { Component, ReactNode } from "react"

export interface CardProps {
    image: string
    header: string
    description?: string | ReactNode
}

class Card extends Component<CardProps, object> {
    constructor(props: CardProps) {
        super(props)
    }

    render(): ReactNode {
        return (
            <div className="card">
                <img className="card-image" src={this.props.image} />
                <div className="card-bottom">
                    <h2 className="card-header">{this.props.header}</h2>
                    {this.props.description && (
                        <span className="card-description">
                            {this.props.description}
                        </span>
                    )}
                </div>
            </div>
        )
    }
}

export default Card
