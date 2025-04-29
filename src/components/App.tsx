import { FormProvider, useForm } from "react-hook-form";
import { CanvasLineAndCow } from "./Animations/CanvasLineAndCow";
import { LogoAnimation } from "./Animations/LogoAnimation";
import { CardWithFoto } from "./CardWithFoto/CardWithFoto";
import { ContactForm } from "./ContactForm/ContactForm";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { SliderWithBackground } from "./SliderWithBackround/SliderWithBackground";
import { VantaBackground } from "./VantaBackground/VantaBackground";

const slides = [
  {
    image: "images/cat.jpg",
    text: "Первый слайд",
    context:
      "Какой-то текст здесь написанный на слайде sdn asdjnkjdnkaj asjdbasjsdbasjbdasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdb",
  },
  {
    image: "images/coy.jpg",
    text: "Второй слайд",
    context:
      "Какой-то текст здесь написанный на слайде sdn asdjnkjdnkaj asjdbasjsdbasjbdasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdb",
  },
  {
    image: "images/yangl.jpg",
    text: "Третий слайд",
    context:
      "Какой-то текст здесь написанный на слайде sdn asdjnkjdnkaj asjdbasjsdbasjbdasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdbasjdb",
  },
];

export const App = () => {
  const methods = useForm({
    mode: "onTouched",
  });

  return (
    <div className="App">
      <FormProvider {...methods}>
        <Header />
        <LogoAnimation />
        <section className="item-one">
          <SliderWithBackground slides={slides} interval={2000} />
        </section>
        <section className="item-two" id="section-sport">
          <CardWithFoto
            url="images/yangl.jpg"
            label={"Название проекта"}
            context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."
          />
          <CardWithFoto
            url="images/coy.jpg"
            label={"Название проекта"}
            context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."
            imagePosition="right"
          />
          <CardWithFoto
            url="images/cat.jpg"
            label={"Название проекта"}
            context="Привет, здесь написано про занятия фитнесом. Записать занятия можно, выбрав день недели и время."
          />
        </section>

        <section className="item-three" id="section-contact">
          <CanvasLineAndCow />
          <ContactForm />
          <Footer />
        </section>
        {/* <section className="item-three" id="section-contact">
          <CanvasLineAndCow/>
          <ContactForm />
          <Footer/>
        </section> */}
        <VantaBackground />
      </FormProvider>
    </div>
  );
};
