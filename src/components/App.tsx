import { FormProvider, useForm } from "react-hook-form";
import { CardWithFoto } from "./CardWithFoto/CardWithFoto";
import { ContactForm } from "./ContactForm/ContactForm";
import { Header } from "./Header/Header";
import { SliderWithBackground } from "./SliderWithBackround/SliderWithBackground";
import { TestView } from "./test/TestView";

const slides = [
  {
    image: "icons/icon1.png",
    text: "Первый слайд",
    context:
      "Какой-то текст здесь написанный на слайде sdn asdjnkjdnkaj asjdbasjsdbasjbdasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdb",
  },
  {
    image: "icons/icon8.png",
    text: "Второй слайд",
    context:
      "Какой-то текст здесь написанный на слайде sdn asdjnkjdnkaj asjdbasjsdbasjbdasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdb",
  },
  {
    image: "icons/icon18.png",
    text: "Третий слайд",
    context:
      "Какой-то текст здесь написанный на слайде sdn asdjnkjdnkaj asjdbasjsdbasjbdasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdb",
  },
];

export const App = () => {
  
  const methods = useForm({
    mode: "onTouched"
  });

  return (
    <div className="App">
      <FormProvider {...methods}>
        <Header />
        <TestView/>
        <section className="item-one">
          <SliderWithBackground slides={slides} interval={2000} />
        </section>
        <section className="item-two" id="section-sport">
          <CardWithFoto
            url="images/web-icon.png"
            label={"Название проекта"}
            context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."
          />
          <CardWithFoto
            url="images/web-icon.png"
            label={"Название проекта"}
            context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."
          />
        </section>
        <section className="item-three" id="section-contact">
          <ContactForm />
        </section>
      </FormProvider>
    </div>
  );
};
