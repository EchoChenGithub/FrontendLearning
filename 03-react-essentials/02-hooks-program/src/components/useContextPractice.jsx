import {createContext, useContext, useState} from 'react';
import { places } from './data.jsx';
import { getImageUrl } from './utils.jsx';
import { sizeContext } from'./Context.jsx';

// Example 1
function LargeImage() {
    const [isLarge, setIsLarge] = useState(false);
    const imageSize = isLarge ? 150 : 100;

    return (
        <sizeContext.Provider value={imageSize}>
            <label>
                <input
                    type="checkbox"
                    checked={isLarge}
                    onChange={e => {
                        setIsLarge(e.target.checked);
                    }}
                />
                Use large images
            </label>
            <List />
        </sizeContext.Provider>
    )
}
function List() {
    const listItems = places.map(place =>
        <li key={place.id}>
            <Place
                place={place}
            />
        </li>
    );
    return <ul>{listItems}</ul>;
}
function Place({ place }) {
    return (
        <>
            <PlaceImage
                place={place}
            />
            <p>
                <b>{place.name}</b>
                {': ' + place.description}
            </p>
        </>
    );
}
function PlaceImage({ place }) {
    const imageSize = useContext(sizeContext);
    return (
        <img
            src={getImageUrl(place)}
            alt={place.name}
            width={imageSize}
            height={imageSize}
        />
    );
}


// Example 2
const ThemeContext = createContext(null);
function Theme() {
    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={theme} >
            <Form />
            <label>
                <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={e => {
                        setTheme(e.target.checked ? "dark" : "light");
                    }}/>
                    Use dark mode
            </label>
        </ThemeContext.Provider>
    )
}
function Form() {
    return (
        <Panel title="Welcome">
            <Button>Sign up</Button>
            <Button>Log in</Button>
        </Panel>
    );
}
function Panel({ title, children }) {
    const theme = useContext(ThemeContext);
    const className = 'panel-' + theme;
    return (
        <section className={className}>
            <h1>{title}</h1>
            {children}
        </section>
    )
}
function Button({ children }) {
    const theme = useContext(ThemeContext);
    const className = 'button-' + theme;
    return (
        <button className={className}>
            {children}
        </button>
    );
}


export default function useContextPractice() {
    return (
        <>
            <hr/>
            <h3>Example 1/4</h3>
            <div className="context-hook-practice-section">
                <LargeImage />
            </div>
            <hr/>
            <h3>Example 2/4: Theme</h3>
            <div className="context-hook-practice-section">
                <Theme />
            </div>
        </>

    )
    }
