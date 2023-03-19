import { Component, ReactNode } from "react"
import "./Main.css"

interface SearchState {
    query: string
}
interface CardProps {
    image: string
    header: string
    description?: string
}

class Search extends Component<object, SearchState> {
    constructor(props: object) {
        super(props)

        const q = localStorage.getItem("saved_query")
        this.state = { query: q ?? "" }
    }
    componentWillUnmount(): void {
        localStorage.setItem("saved_query", this.state.query)
    }
    render(): ReactNode {
        return (
            <div className="search">
                <input
                    className="search-input"
                    type="text"
                    placeholder="How can I help you?"
                    value={this.state.query}
                    onChange={(e) => {
                        this.setState({
                            query: e.target.value,
                        })
                    }}
                />
                <button
                    className="search-submit"
                    onClick={() => {
                        alert("Not implemented :(")
                    }}
                >
                    See results
                </button>
            </div>
        )
    }
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

const dataset: CardProps[] = [
    {
        image: "https://kakogo-chisla.ru/wp-content/uploads/2022/06/Den-fotografii-prirody-2048x1363.jpg",
        header: "Nice picture",
        description:
            "abddfsdf sfsdf sabddfsdf sfsdf sabddfsdf sfsdf sabddfsdf sfsdf s",
    },
    {
        image: "https://img2.goodfon.ru/original/3614x2408/f/73/afonin-aleksandr-ostrov.jpg",
        header: "Nice picture",
        description: "sfsdf s",
    },
    {
        image: "https://kakogo-chisla.ru/wp-content/uploads/2022/06/Den-fotografii-prirody-2048x1363.jpg",
        header: "Very Nice picture 33",
    },
    {
        image: "https://img2.goodfon.ru/original/3614x2408/f/73/afonin-aleksandr-ostrov.jpg",
        header: "Nice picture",
        description: "sfsdf s",
    },
    {
        image: "https://kakogo-chisla.ru/wp-content/uploads/2022/06/Den-fotografii-prirody-2048x1363.jpg",
        header: "Nice picture",
        description:
            "abddfsdf sfsdf sabddfsdf sfsdf sabddfsdf sfsdf sabddfsdf sfsdf s",
    },
    {
        image: "https://kakogo-chisla.ru/wp-content/uploads/2022/06/Den-fotografii-prirody-2048x1363.jpg",
        header: "Very Nice picture 33",
    },
    {
        image: "https://kakogo-chisla.ru/wp-content/uploads/2022/06/Den-fotografii-prirody-2048x1363.jpg",
        header: "Very Nice picture 33",
    },
    {
        image: "https://kakogo-chisla.ru/wp-content/uploads/2022/06/Den-fotografii-prirody-2048x1363.jpg",
        header: "Very Nice picture 33",
    },
]

const Home = () => {
    return (
        <>
            <div>
                <h1>Main page</h1> • <a href="#/about/">About Us</a>
                <div className="spacing" />
                <Search />
                <div className="spacing" />
                <div className="cardholder">
                    {dataset.map((cardprops, i: number) => {
                        return <Card {...cardprops} key={i} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Home
