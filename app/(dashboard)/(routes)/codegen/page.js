"use client";

import Heading from "../../../../components/heading";
import {Code} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {formSchema} from "./constants";
import ReactMarkdown from 'react-markdown';

import {Form, FormControl, FormField, FormItem} from "../../../../components/ui/form";
import {Input} from "../../../../components/ui/input";
import {Button} from "../../../../components/ui/button";
import {useRouter} from "next/navigation";
import {useState} from "react";
import axios from "axios";
import Empty from "../../../../components/empty";
import Loader from "../../../../components/loader";
import {cn} from "../../../../lib/utils";
import UserAvatar from "../../../../components/user-avatar";
import BotAvatar from "../../../../components/bot-avatar";
import {useProModal} from "../../../../hooks/use-pro-model";


export default function ConversationPage() {

    const proModal = useProModal();
    const router = useRouter();
    const [messages, setMessages] = useState([]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async ({prompt}) => {
        try {
            const userMessage = {role: "user", content: prompt};
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/codegen", {messages: newMessages});
            setMessages(current => [...current, userMessage, response.data]);
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
                title="Code Generation"
                description="Generate code using descriptive text."
                icon={Code}
                iconColor="text-green-700"
                bgColor="bg-green-700/10"/>

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
                                               placeholder="Simple toggle button using react hooks."/>

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

                    {!messages?.length && !isLoading && <div><Empty label="No conversation started."/></div>}

                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map(message => <div
                            key={message.content}
                            className={cn("p-8 w-full flex items-center gap-x-8 rounded-lg",
                                message.role === "user"
                                    ? "bg-white border border-black/10"
                                    : "bg-muted ")}>
                            {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
                            <ReactMarkdown
                                className="text-sm overflow-hidden leading-7 w-full"
                                components={{
                                    pre: ({node, ...props}) =>
                                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                            <pre {...props}/>
                                        </div>,
                                    code: ({node, ...props}) =>
                                        <code className="bg-black/10 w-full rounded-lg p-1" {...props}/>
                                }}>
                                {message.content || ""}
                            </ReactMarkdown>
                        </div>)}
                    </div>
                </div>
            </div>

        </div>
    );
}
