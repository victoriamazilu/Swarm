"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidtion } from "@/lib/validations/user";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from 'zod';
import Image from "next/image";
import { ChangeEvent } from "react";
import { Textarea } from "../ui/textarea";

interface Props {
    user: { 
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

const AccountProfile = ( { user, btnTitle }: Props ) => {
    const form = useForm({ 
        resolver: zodResolver(UserValidtion),
        defaultValues: {
            profile_photo: "",
            name: "",
            username: "",
            bio: "",
        }
    });
    
    const handleImage = (e: ChangeEvent, fieldChange: (value: string) => void) =>{
        e.preventDefault(); //no reload

    }
    //submit whatever must be in uservalidation
    function onSubmit(values: z.infer<typeof UserValidtion>) {
        console.log(values)
    }

    return(
        //form is a template from shadcn
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col justify-start gap-10">

                {/* Profile photo selector */}
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="account-form_image-label">
                                {field.value ? (
                                    <Image src={field.value} alt="profile photo" width={96} height={96} priority className="px-1 py-1 rounded-full object-contain"/> 
                                ):
                                    <Image src="/assets/profile.svg" alt="profile photo" width={48} height={48} className="px-1 py-1 rounded-full object-contain"/>
                                }
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input 
                                    type="file" 
                                    accept="image/*" 
                                    placeholder="Upload a photo" 
                                    className="account-form_image-input" 
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="text-base-semibold text-light-2 gap-3 w-full">
                                Name
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input 
                                    type="text"
                                    className="account-form_input no-focus" 
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Username */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="text-base-semibold text-light-2 gap-3 w-full">
                                Username
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input 
                                    type="text"
                                    className="account-form_input no-focus" 
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Bio */}
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="text-base-semibold text-light-2 gap-3 w-full">
                                Bio
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Textarea 
                                    rows={10}
                                    className="account-form_input no-focus" 
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-primary-500">Submit</Button>
            </form>
        </Form>
    )
}

export default AccountProfile