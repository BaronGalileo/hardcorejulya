import { CardWithFoto } from "./CardWithFoto/CardWithFoto";
import { Header } from "./Header/Header";

export const App = () => {
  return (
  <div className="App">
    <Header/>
    <section className="item">
      <CardWithFoto url="images/web-icon.png" label={"Название проекта"} context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."/>
      <CardWithFoto url="images/web-icon.png" label={"Название проекта"} context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."/>
    </section>
    <section className="test-main">
      <CardWithFoto url="images/web-icon.png" label={"Название проекта"} context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время. Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время.
      Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время.Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время.Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."/>
      <CardWithFoto url="images/web-icon.png" label={"Название проекта"} context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."/>
    </section>
    <section className="item">
      <CardWithFoto url="images/web-icon.png" label={"Название проекта"} context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."/>
      <CardWithFoto url="images/web-icon.png" label={"Название проекта"} context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."/>
    </section>
    <section className="item">
      <CardWithFoto url="images/web-icon.png" label={"Название проекта"} context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."/>
      <CardWithFoto url="images/web-icon.png" label={"Название проекта"} context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."/>
    </section>
    <section className="item">
      <CardWithFoto url="images/web-icon.png" label={"Название проекта"} context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."/>
      <CardWithFoto url="images/web-icon.png" label={"Название проекта"} context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."/>
    </section>
    <section className="item home">
      <div>Начало</div>
      {/* <TestView/> */}
      <div>Конец</div>
    </section>
    <section className="item main">
      <CardWithFoto url="images/web-icon.png" label={"Название проекта"} duration={3000} context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."/>
      <CardWithFoto url="images/web-icon.png" label={"Название проекта"} duration={8000} context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."/>
    </section>
    <section className="item tree">
      {/* <TestView/> */}
    </section>
    <section className="item four"></section>
  </div>
  );
}

