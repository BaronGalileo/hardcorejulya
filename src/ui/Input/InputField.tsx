import { useFormContext } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  rules?: object;
  srcImg?: string;
  onFocus?: () => void;
}

export const InputField = ({ name, label, srcImg='',onFocus, placeholder, type = "text", rules }: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="input-wrapper">
      <label>{srcImg && <img src={srcImg} alt="" />}{label}</label>
      {error && <span className="error-message">{error}</span>}
      <input
        {...register(name, rules)}
        type={type}
        placeholder={placeholder}
        onFocus={onFocus}
      />
    </div>
  );
};


  