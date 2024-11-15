"use client";

import Heading from "../../../../components/heading";
import {Download, ImageIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {zodResolver} from "@hookform/resolvers/zod";
import {amountOptions, formSchema, resolutionOptions} from "./constants";

import {Form, FormControl, FormField, FormItem} from "../../../../components/ui/form";
import {Input} from "../../../../components/ui/input";
import {Button} from "../../../../components/ui/button";
import {Select, SelectItem} from "../../../../components/ui/select";
import {useRouter} from "next/navigation";
import {useState} from "react";
import axios from "axios";
import Empty from "../../../../components/empty";
import Loader from "../../../../components/loader";
import {SelectContent, SelectTrigger, SelectValue} from "@radix-ui/react-select";
import {Card, CardFooter} from "../../../../components/ui/card";
import Image from "next/image";
import {useProModal} from "../../../../hooks/use-pro-model";


export default function ConversationPage() {

    const proModal = useProModal();
    const router = useRouter();
    const [images, setImages] = useState([]);


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "1024x1024"
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values) => {
        try {
            setImages([]);

            const response = await axios.post("/api/imagegen", values);
            const urls = response.data.map(({url}) => url);
            setImages(urls);

            form.reset();
        } catch (e) {
            if (e?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Something went wrong!")
            }
            console.log(e);
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Image Generation"
                description="Turn your prompt into an image."
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"/>

            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6
                            focus-within:shadow-sm grid grid-cols-12 gap-2">

                            <FormField name="prompt" render={({field}) =>
                                <FormItem className="col-span-12 lg:col-span-6">
                                    <FormControl className="m-0 p-0">
                                        <Input {...field}
                                               className="border-0 outline-none
                                        focus-visible:ring-0
                                        focus-visible:ring-transparent"
                                               disabled={isLoading}
                                               placeholder="A picture of a cow in The Alps."/>
                                    </FormControl>
                                </FormItem>
                            }/>

                            <FormField
                                name="amount"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-2">

                                        <Select
                                            className="border"
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="p-1 mt-1 w-full border rounded-sm">
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="p-1 px-3 border rounded-sm bg-white">
                                                {amountOptions.map(option => <SelectItem
                                                    key={option.value} value={option.value}>{option.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>

                                    </FormItem>
                                )}/>

                            <FormField
                                name="resolution"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="p-1 mt-1 w-full border rounded-sm">
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="p-1 px-3 border rounded-sm bg-white">
                                                {resolutionOptions.map(option => <SelectItem
                                                    key={option.value} value={option.value}>{option.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}/>

                            <Button
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}>Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">

                    {isLoading && <div className="p-20">
                        <Loader/>
                    </div>}

                    {!images?.length && !isLoading && <div><Empty label="No images generated."/></div>}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map(src =>
                            <Card
                                key={src}
                                className="rounded-lg overflow-hidden">

                                <div className="relative aspect-square">
                                    <Image src={src} fill/>
                                </div>

                                <CardFooter className="p-2">
                                    <Button
                                        onClick={() => {
                                            window.open(src);
                                        }}
                                        variant="secondary"
                                        className="w-full">
                                        <Download className="h-4 w-4 mr-2"/>Download</Button>
                                </CardFooter>

                            </Card>)}
                    </div>
                </div>
            </div>

        </div>
    )
        ;
}
