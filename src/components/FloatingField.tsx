import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

const sharedClasses =
  "peer w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-5 pb-3 pt-6 text-sm text-mist-50 outline-none transition-colors duration-300 placeholder-transparent focus:border-teal-400/60 focus:bg-teal-400/[0.04]";

function FieldLabel({ id, label }: { id: string; label: string }) {
  return (
    <label
      htmlFor={id}
      className="pointer-events-none absolute left-5 top-4 text-sm text-mist-500 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-teal-300 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]"
    >
      {label}
    </label>
  );
}

type InputFieldProps = { label: string; as?: "input"; className?: string } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "placeholder" | "className"
>;

type TextareaFieldProps = { label: string; as: "textarea"; className?: string } & Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "placeholder" | "className"
>;

export function FloatingField(props: InputFieldProps | TextareaFieldProps) {
  const id = useId();
  const { label, className = "" } = props;

  if (props.as === "textarea") {
    const { label: _l, as: _a, className: _c, ...rest } = props;
    return (
      <div className={`relative ${className}`}>
        <textarea id={id} placeholder={label} rows={5} className={sharedClasses} {...rest} />
        <FieldLabel id={id} label={label} />
      </div>
    );
  }

  const { label: _l, as: _a, className: _c, ...rest } = props;
  return (
    <div className={`relative ${className}`}>
      <input id={id} placeholder={label} className={sharedClasses} {...rest} />
      <FieldLabel id={id} label={label} />
    </div>
  );
}
