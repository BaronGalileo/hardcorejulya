import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputField } from "../../ui/Input/InputField";

export const ContactForm = () => {
  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormContext();

  const TELEGRAM_BOT_TOKEN = "8087330508:AAFQAkGPs1GmzMLHQSYo6vTXljqlDv8Jd9E";
  const TELEGRAM_CHAT_ID = "@TestChatForJulya";
  const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const [resultForm, setResultForm] = useState<"sent" | "not sent" | "">("");

  const dictResult = {
    sent: "Сообщение успешно отправлено!",
    "not sent": "Сообщение не отправлено! Попробуйте позже!",
  };

  const triggerResultForm = () => {
    const res = document.querySelector(".result-form") as HTMLElement | null;

    if (res instanceof HTMLElement) {
      res.classList.remove("error-message");
      if (resultForm === "sent") {
        res.textContent = dictResult[resultForm];
      } else if (resultForm === "not sent") {
        res.classList.add("error-message");
        res.textContent = dictResult[resultForm];
      } else {
        res.textContent = resultForm;
      }
    }

  }

  useEffect(() => {
    triggerResultForm()
  }, [resultForm]);

  const onSubmit = async (data: any) => {
    const btn = document.querySelector(".btn-submit");
    if (btn) {
      btn.textContent = "Loading...";
    }
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message}`,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      setResultForm("sent");
    } catch (error) {
      setResultForm("not sent")
      console.error(error);
    } finally {
      if (btn) {
        btn.textContent = "Отправить";
      }
      reset();
    }
  };

  return (
    <div className="contact-form-wrapper">
      <div className="conteyner-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="name"
            label="Введите ваше имя"
            placeholder="Ваше имя"
            rules={{ required: "Представьтесь, пожалуйста" }}
            onFocus={() => setResultForm("")}
          />
          <InputField
            name="email"
            label="Введите ваш email"
            placeholder="Ваш email"
            rules={{
              required: "Введите email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Некорректный формат email",
              },
            }}
            srcImg="../images/email.png"
            onFocus={() => setResultForm("")}
          />
          <InputField
            name="phone"
            label="Ваш номер телефона"
            placeholder="Ваш номер телефона"
            rules={{
              required: "Введите номер телефона",
              pattern: {
                value: /^\+?[0-9]{10,15}$/,
                message: "Некорректный формат номера телефона",
              },
            }}
            srcImg="../images/phone.png"
            onFocus={() => setResultForm("")}
          />
          <InputField
            name="message"
            label="Напишите сообщение"
            placeholder="Ваше сообщение"
            srcImg="../images/messag.png"
            onFocus={() => setResultForm("")}
          />
          <button className="btn-submit" disabled={!isValid}>
            Отправить
          </button>
          <div className="result-form"></div>
        </form>
      </div>
    </div>
  );
};
