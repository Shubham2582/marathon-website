import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormFieldType } from "@/types/form";

export const FormField = ({
  label,
  name,
  placeholder,
  value,
  handleChange,
  disabled = false,
  fieldType = "text",
  options = [],
  error,
  ...props
}: FormFieldType) => {
  return (
    <div className="h-auto transition-all">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {fieldType === "select" ? (
        <select
          id={name}
          name={name}
          className="w-full rounded-md border border-input py-2.5 px-2 text-sm focus:outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : fieldType === "textarea" ? (
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className="focus:border-blue-500 mt-0.5"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
      ) : fieldType === "date" ? (
        <Input
          id={name}
          name={name}
          type="date"
          placeholder={placeholder}
          className="focus:border-blue-500 mt-0.5 w-full"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
      ) : (
        <Input
          id={name}
          name={name}
          placeholder={placeholder}
          className="focus:border-blue-500 mt-0.5"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
      )}
      {error && <p className={"text-xs ml-0.5 mt-1 text-red-500"}>{error}</p>}
    </div>
  );
};
