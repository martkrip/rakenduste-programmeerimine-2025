"use client";
import { createClient } from "@/lib/supabase/client";
import { Button, Group, Textarea, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";

export default function CreateForm() {
  const supabase = createClient();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateTime: new Date(),
      message: "",
    },

    validate: {
      firstName: (value) =>
            (value.trim()  ? null : "Required"),
        
      email: (value) =>
        (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
    
      const [dateTime, setDateTime] = useState<Date | null>(new Date());
    
  return (
    <form onSubmit={form.onSubmit((values) => console.log({...values, dateTime}))}>
      <TextInput
        withAsterisk
        label="FirstName"
        placeholder="Henry"
        key={form.key("firstName")}
        {...form.getInputProps("firstName")}
      />
      <TextInput
        withAsterisk
        label="LastName"
        placeholder="Stickman"
        key={form.key("lastName")}
        {...form.getInputProps("lastName")}
      />
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@example.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <TextInput
        withAsterisk
        label="Phone"
        placeholder="+372 0000 0000"
        key={form.key("phone")}
        {...form.getInputProps("phone")}
      />
      <DateTimePicker
        value={dateTime}
        label="Date and Time"
        placeholder="Select date and time"
        onChange={(value: string | null) =>
          setDateTime(value ? new Date(value) : null)
        }
      />
      <Textarea
        label="Message"
        placeholder="Type your message..."
        withAsterisk
        {...form.getInputProps("message")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
