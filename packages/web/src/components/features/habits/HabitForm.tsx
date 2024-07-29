'use client'

import { addHabit } from '@/utils/firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  habit: z.string().min(1, "Habit name is required"),
});

export default function HabitForm({ onHabitAdded }: { onHabitAdded: () => void }) {
  const { user } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      habit: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (user) {
      try {
        await addHabit(user.uid, values.habit);
        form.reset();
        onHabitAdded();
      } catch (error) {
        console.error('Error adding habit:', error);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="habit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Habit</FormLabel>
              <FormControl>
                <Input placeholder="Enter a new habit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Habit</Button>
      </form>
    </Form>
  );
}