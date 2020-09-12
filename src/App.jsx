const continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe']
const helloContinents = Array.from(continents, c => `Hi, ${c}!`);
const message = helloContinents.join(' ');

const element = (
    <div title="loaded from separate file">
        <h1>{helloContinents.map(item => {
                return (
                    <>
                    {item}
                    <br/>
                    <br/>
                    </>
                );}
        )}</h1>
    </div>
);

ReactDOM.render(element, document.getElementById("root"));