import "./Main.css"
import Card from "../components/Card"
import Search from "../components/Search"
import useSamplesDataset from "../hooks/useSamplesDataset"

const Home = () => {
    const [dataset] = useSamplesDataset()

    return (
        <>
            <div>
                {/* HEAD */}
                <h1>Main page</h1>
                <br /> {" • "} <a href="#/form/">Form</a>
                <br /> {" • "} <a href="#/about/">About Us</a>
                {/* BODY */}
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
