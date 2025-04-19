import { Header } from "./Header/Header";
import { TestView } from "./test/TestView";

export const App = () => {
  return (
  <div className="App">
    <Header/>
    <section className="item home">
      <div>Начало</div>
      <TestView/>
      <div>Конец</div>
    </section>
    <section className="item main"></section>
    <section className="item tree">
      <TestView/>
    </section>
    <section className="item four"></section>
  </div>
  );
}

