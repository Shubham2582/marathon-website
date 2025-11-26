"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/store/useLanguage";
import { useTeamRegistrationStore } from "@/store/useTeamRegistration";
import { useStep } from "@/store/useStep";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  team_name: z.string().min(2, {
    message: "Team name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  members: z
    .array(
      z
        .object({
          name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
          }),
          mobile: z.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, {
            message: "Mobile number must be 10 digits.",
          }),
          gender: z.enum(["MALE", "FEMALE"]),
          wantsTshirt: z.boolean().default(false),
          tShirtSize: z.enum(["S", "M", "L", "XL", ""]).default(""),
        })
        .refine(
          (data) => {
            if (data.wantsTshirt && !data.tShirtSize) {
              return false;
            }
            return true;
          },
          {
            message: "Please select a T-shirt size.",
            path: ["tShirtSize"],
          },
        ),
    )
    .length(4, {
      message: "There must be 4 members in a team.",
    }),
});

export function TeamDetails() {
  const { setStep, setProgress } = useStep();
  const { setTeamDetails, teamDetails } = useTeamRegistrationStore();
  const t = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      team_name: teamDetails.team_name,
      email: teamDetails.email,
      city: teamDetails.city,
      members: teamDetails.members,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setTeamDetails(values);
      setStep(2);
      setProgress(50);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="team_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.team_details.team_name}</FormLabel>
              <FormControl>
                <Input placeholder={t.team_details.team_name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.personal.fields.email}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t.personal.fields.email_placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.personal.fields.city}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t.personal.fields.city_placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2 p-4 border rounded-md">
              <h3 className="font-semibold">
                {t.team_details.member} {index + 1}
              </h3>
              <FormField
                control={form.control}
                name={`members.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.team_details.name}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.team_details.name} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`members.${index}.mobile`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.team_details.mobile}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.team_details.mobile} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`members.${index}.gender`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.verification.gender_label}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t.verification.gender_placeholder}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">
                          {t.verification.male}
                        </SelectItem>
                        <SelectItem value="FEMALE">
                          {t.verification.female}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`members.${index}.wantsTshirt`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {t.team_details.wants_tshirt.replace("{price}", "200")}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              {form.watch(`members.${index}.wantsTshirt`) && (
                <FormField
                  control={form.control}
                  name={`members.${index}.tShirtSize`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.team_details.tshirt_size}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                t.team_details.tshirt_size_placeholder
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="XL">XL</SelectItem>
                          <SelectItem value="XXL">XXL</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button type="submit">{t.personal.next_button}</Button>
        </div>
      </form>
    </Form>
  );
}
