
import './App.css'
import UseStatePractice from "./components/useStatePractice.jsx"
import { UseEffectPractice } from "./components/useEffectPractice.jsx";
import UseContextPractice from "./components/useContextPractice.jsx";

function App() {

  return (
      <div className="app">
        <h1>------useState Practice------</h1>
        {/*  useState 练习 */}
        <section className="state-hook-practice-section">
          <UseStatePractice />
        </section>

        {/*/!*  useEffect 练习 *!/*/}
        <hr/>
        <h1>------useEffect Practice------</h1>
        <section className="effect-hook-practice-section">
          <UseEffectPractice />
        </section>

        {/*/!*  useContext 练习 *!/*/}
        <hr/>
        <h1>------useContext Practice------</h1>
        <section className="context-hook-practice-section">
          <UseContextPractice />
        </section>
      </div>
  )
}

export default App
