'use client'

import { useState, useEffect } from 'react';
import { addHabit, getCategories, getSubcategories } from '@/utils/firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { useFlamePoints } from '@/contexts/FlamePointContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  habit: z.string().min(1, "Habit name is required"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().optional(),
  flamePointValue: z.number().min(1, "Flame point value must be at least 1"),
});

export default function HabitForm({ onHabitAdded }: { onHabitAdded: () => void }) {
  const { user } = useAuth();
  const { addFlamePoints } = useFlamePoints();
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      habit: '',
      category: '',
      subcategory: '',
      flamePointValue: 1,
    },
  });

  useEffect(() => {
    if (user) {
      getCategories(user.uid).then(setCategories);
    }
  }, [user]);

  useEffect(() => {
    if (user && form.watch('category')) {
      getSubcategories(user.uid, form.watch('category')).then(setSubcategories);
    }
  }, [user, form.watch('category')]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (user) {
      try {
        const habitData = {
          name: values.habit,
          category: values.category,
          subcategory: values.subcategory,
          flamePointConversion: { type: 'simple' as const, simpleConversion: values.flamePointValue },
          attributes: [],
          relatedSkills: [],
        };
        await addHabit(user.uid, habitData);
        addFlamePoints(values.category, values.flamePointValue);
        form.reset();
        onHabitAdded();
      } catch (error) {
        console.error('Error adding habit:', error);
      }
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      form.setValue('category', newCategory);
      setNewCategory('');
    }
  };

  const handleAddSubcategory = () => {
    if (newSubcategory && !subcategories.includes(newSubcategory)) {
      setSubcategories([...subcategories, newSubcategory]);
      form.setValue('subcategory', newSubcategory);
      setNewSubcategory('');
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
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2">
          <Input
            placeholder="New category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button type="button" onClick={handleAddCategory}>Add Category</Button>
        </div>
        <FormField
          control={form.control}
          name="subcategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subcategory" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subcategories.map((subcategory) => (
                    <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2">
          <Input
            placeholder="New subcategory"
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
          />
          <Button type="button" onClick={handleAddSubcategory}>Add Subcategory</Button>
        </div>
        <FormField
          control={form.control}
          name="flamePointValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flame Point Value</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
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