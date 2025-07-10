
import './App.css'
import UseStatePractice from "./components/useStatePractice.jsx"

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
        {/*<section className="effect-hook-practice-section">*/}
        {/*  <UseEffectPractice />*/}
        {/*</section>*/}

        {/*/!*  useRef 练习 *!/*/}
        <hr/>
        <h1>------useRef Practice------</h1>
        {/*<section className="ref-hook-practice-section">*/}
        {/*  <UseRefPractice />*/}
        {/*</section>*/}
      </div>
  )
}

export default App
