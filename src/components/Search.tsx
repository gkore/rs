import { Component, ReactNode } from "react"

interface SearchState {
    query: string
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

export default Search
