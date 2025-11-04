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
    <div className="h-auto transition-all group">
      <label htmlFor={name} className="text-xs font-semibold mb-1 block">
        {label}
      </label>
      {fieldType === "select" ? (
        <Select
          value={value}
          onValueChange={handleFormField}
          disabled={disabled}
        >
          <SelectTrigger className="ring-0 border-purple-200 focus:border-purple-400 transition-all rounded-lg hover:border-purple-300 bg-white/30 h-9 text-sm">
            <SelectValue placeholder={placeholder || "Choose"} />
          </SelectTrigger>
          <SelectContent className="max-h-[200px] overflow-y-auto">
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
          className="mt-0.5 border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all hover:border-purple-300 bg-white/30 text-sm min-h-[80px]"
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
          className="mt-0.5 w-full border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all hover:border-purple-300 bg-white/30 h-9 text-sm"
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
          className="mt-0.5 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all hover:border-purple-300 bg-white/30 h-9 text-sm"
          value={value}
          onChange={(e) => handleFormField(e.target.value)}
          disabled={disabled}
          {...props}
        />
      )}
      {error && <p className={"text-xs ml-0.5 mt-1 text-red-600 font-medium"}>{error}</p>}
    </div>
  );
};
