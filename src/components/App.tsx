import { FormProvider, useForm } from "react-hook-form";
import { slidesForCover } from "../assets/data/slidersForCover";
import { CanvasLineAndCow } from "./Animations/CanvasLineAndCow";
import { LogoAnimation } from "./Animations/LogoAnimation";
import { CardWithFoto } from "./CardWithFoto/CardWithFoto";
import { ContactForm } from "./ContactForm/ContactForm";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { SliderWithBackground } from "./SliderWithBackround/SliderWithBackground";
import { VantaBackground } from "./VantaBackground/VantaBackground";


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
          <SliderWithBackground slides={slidesForCover} interval={15000} />
        </section>
        <section className="item-two" id="section-sport">
          <CardWithFoto
            url="images/step-1.jpg"
            label={"Степ-аэробика: энергия в движении"}
            context="Зарядись бодростью вместе с командой!
Групповое занятие по степ-аэробике — это динамичное кардио с ритмом и драйвом. Идеально подходит для тренировки сердечно-сосудистой системы, сжигания калорий, улучшения координации и поднятия настроения. Тренировка проходит под музыку, шаг за шагом — к более стройной и сильной версии себя."
          />
          <CardWithFoto
            url="images/gym.jpg"
            label={"Тренажерный зал: сила в каждом движении"}
            context="Индивидуальный подход к вашим целям.
Работа в тренажёрном зале — это не просто упражнения, а продуманная стратегия. Здесь можно точечно проработать именно те зоны, которые требуют особого внимания — будь то спина, ягодицы, ноги или руки. Я помогу составить эффективную программу для набора мышечной массы, похудения или общей коррекции фигуры. Каждое движение — под контролем, каждый шаг — к результату."
            imagePosition="right"
          />
          <CardWithFoto
            url="images/food.png"
            label={"Питание: основа результата"}
            context="Твой путь к телу мечты начинается на тарелке.
Правильное питание — не диета, а образ жизни. Я помогу составить персональную программу питания, которая будет вкусной, сбалансированной и подходящей именно под твои цели — снижение веса, набор мышечной массы или просто поддержание формы. Сочетая тренировки и питание, ты получишь устойчивый и видимый результат."
          />
        </section>

        <section className="item-three" id="section-contact">
          <CanvasLineAndCow />
          <ContactForm />
          <Footer />
        </section>
        <VantaBackground />
      </FormProvider>
    </div>
  );
};
