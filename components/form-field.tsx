import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const handleFormField = (value: string) => {
    handleChange(name, value, fieldType);
  };

  return (
    <div className="h-auto transition-all">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {fieldType === "select" ? (
        <Select
          defaultValue={value}
          onValueChange={handleFormField}
          disabled={disabled}
        >
          <SelectTrigger className="ring-0">
            <SelectValue placeholder={placeholder || "Choose"} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : fieldType === "textarea" ? (
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className="mt-0.5"
          value={value}
          onChange={(e) => handleFormField(e.target.value)}
          disabled={disabled}
          {...props}
        />
      ) : fieldType === "date" ? (
        <Input
          id={name}
          name={name}
          type="date"
          placeholder={placeholder}
          className="mt-0.5 w-full"
          value={value}
          onChange={(e) => handleFormField(e.target.value)}
          disabled={disabled}
          {...props}
        />
      ) : (
        <Input
          id={name}
          name={name}
          placeholder={placeholder}
          className="mt-0.5"
          value={value}
          onChange={(e) => handleFormField(e.target.value)}
          disabled={disabled}
          {...props}
        />
      )}
      {error && <p className={"text-xs ml-0.5 mt-1 text-primary"}>{error}</p>}
    </div>
  );
};
