
import './App.css'
import UseStatePractice from "./components/useStatePractice.jsx"
import { UseEffectPractice } from "./components/useEffectPractice.jsx";
import UseContextPractice from "./components/useContextPractice.jsx";
import UseMemoPractice from "./components/useMemoPractice.jsx";
import Calculator from "./components/liftStateUp.jsx";

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

        {/*/!*  useMemo 练习 *!/*/}
        <hr/>
        <h1>------useMemo Practice------</h1>
        <section className="memo-hook-practice-section">
            <UseMemoPractice />
        </section>

          {/*/!*  lift state up 练习 *!/*/}
          <hr/>
          <h1>------lift state up Practice------</h1>
          <section className="lift-practice-section">
              <Calculator />
          </section>

      </div>
  )
}

export default App
