import React from 'react';
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { DateRange } from "react-day-picker"
import { ReloadIcon } from "@radix-ui/react-icons"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useLanguage } from '@/context/LanguageContext';

// Define a schema for the form values
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price_type: z.string(),
  price: z.string().regex(new RegExp(/^\d+\.\d{2}$/), {
    message: "Price must be in the format 0.00"
  }),
  images: z.string().url({ message: "Invalid URL" }),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }).optional(),
});

// Fix the date validation schema so it correctly works with TypeScript
const dateRangeSchema = z.object({
  price_type: z.string(),
  date_from: z.date(),
  date_to: z.date(),
}).refine((data) => {
  // Use refine on the entire object instead of superRefine on a single field
  return data.date_to >= data.date_from;
}, {
  message: "End date must be after start date",
  path: ["date_to"], // This indicates which field has the error
});

const data = [
  {
    name: "Suite 1",
    description: "This is a description of suite 1",
    price_type: "Per night",
    price: "100.00",
    images: "https://picsum.photos/200/300",
    date_from: new Date(),
    date_to: new Date(),
  },
  {
    name: "Suite 2",
    description: "This is a description of suite 2",
    price_type: "Per night",
    price: "200.00",
    images: "https://picsum.photos/200/300",
    date_from: new Date(),
    date_to: new Date(),
  },
]

const Admin = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = React.useState(false)
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 10),
  })

  // Initialize the form using useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price_type: "",
      price: "",
      images: "",
    },
  });

  // Define what happens on form submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast({
      title: "Success!",
      description: "Your form has been submitted.",
    })
    console.log(values)
  }

  return (
    <>
      <section className="section-padding bg-apple-silver">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium mb-4 font-playfair">{t('admin.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-justify">{t('admin.description')}</p>
          </div>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Add Suite</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Add Suite</DrawerTitle>
                <DrawerDescription>
                  Make changes to your profile here. Click save when you're done.
                </DrawerDescription>
              </DrawerHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name of Suite" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the name of the suite.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Description of Suite"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Write a brief description of the suite.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a price type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="per_night">Per Night</SelectItem>
                            <SelectItem value="per_week">Per Week</SelectItem>
                            <SelectItem value="per_month">Per Month</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This is the price type of the suite.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the price of the suite.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the URL of the suite image.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-3">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value?.from ? (
                                  field.value.to ? (
                                    `${format(field.value.from, "PPP")} - ${format(field.value.to, "PPP")}`
                                  ) : (
                                    format(field.value.from, "PPP")
                                  )
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="center">
                            <Calendar
                              mode="range"
                              defaultMonth={new Date()}
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Choose the availability dates for the suite.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DrawerFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Submit
                    </Button>
                  </DrawerFooter>
                </form>
              </Form>
            </DrawerContent>
          </Drawer>

          <div className="mx-auto w-full max-w-2xl">
            <Table>
              <TableCaption>A list of your recent suites.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price Type</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((suite) => (
                  <TableRow key={suite.name}>
                    <TableCell className="font-medium">{suite.name}</TableCell>
                    <TableCell>{suite.description}</TableCell>
                    <TableCell>{suite.price_type}</TableCell>
                    <TableCell className="text-right">{suite.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$0.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;
