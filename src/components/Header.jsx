export default function Header(props) {
    const { toggleNav } = props;

    return (
        <header>
            <button onClick={toggleNav} className="open-nav-button">
                <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
            <h1 className="text-gradient">Pokédex</h1>
        </header>

    )
}