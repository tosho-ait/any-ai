"use client";

import Heading from "../../../../components/heading";
import {Music} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {formSchema} from "./constants";

import {Form, FormControl, FormField, FormItem} from "../../../../components/ui/form";
import {Input} from "../../../../components/ui/input";
import {Button} from "../../../../components/ui/button";
import {useRouter} from "next/navigation";
import {useState} from "react";
import axios from "axios";
import Empty from "../../../../components/empty";
import Loader from "../../../../components/loader";
import {useProModal} from "../../../../hooks/use-pro-model";


export default function MusicPage() {

    const proModal = useProModal();
    const router = useRouter();
    const [music, setMusic] = useState();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values) => {
        try {
            setMusic(undefined);

            const response = await axios.post("/api/musicgen", values);
            setMusic(response.data.audio);

            form.reset();

        } catch (e) {
            if (e?.response?.status === 403) {
                proModal.onOpen();
            }
            console.log(e);
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Music Generation"
                description="Turn your prompt into music."
                icon={Music}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"/>

            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6
                            focus-within:shadow-sm grid grid-cols-12 gap-2">

                            <FormField name="prompt" render={({field}) =>
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">

                                        <Input {...field}
                                               className="border-0 outline-none
                                        focus-visible:ring-0
                                        focus-visible:ring-transparent"
                                               disabled={isLoading}
                                               placeholder="Guitar solo."/>

                                    </FormControl>
                                </FormItem>
                            }/>
                            <Button
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}>Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">

                    {isLoading && <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                        <Loader/>
                    </div>}

                    {!music && !isLoading && <div><Empty label="No music generated."/></div>}

                    {music && <div>
                        <audio controls className="w-full my-8">
                            <source src={music}/>
                        </audio>
                    </div>}

                </div>
            </div>

        </div>
    );
}
