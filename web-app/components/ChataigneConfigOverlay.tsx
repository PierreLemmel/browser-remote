'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultChataigneHost, defaultChataignePort, useChataigneContext } from '@/contexts/ChataigneContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface ChataigneConfigForm {
    host: string;
    port: number;
    open: boolean;
}

export function ChataigneConfigOverlay() {
    const { host, port, setConnection } = useChataigneContext();
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<ChataigneConfigForm>({
        defaultValues: {
            host,
            port,
            open: isOpen,
        },
    });

    const onSubmit = (data: ChataigneConfigForm) => {
        setConnection(data.host, data.port);
        setIsOpen(false);
    };

    const handleOpen = () => {
        form.reset({ host, port });
        setIsOpen(true);
    };


    const handleDefault = () => {
        form.reset({ host: defaultChataigneHost, port: defaultChataignePort });
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="outline"
                size="sm"
                className="fixed top-4 right-4 z-50"
            >
                ⚙️ Config
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                    
                    <div className="relative bg-background border rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Chataigne Configuration</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleClose}
                                className="h-6 w-6"
                            >
                                ✕
                            </Button>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="host"
                                    rules={{
                                        required: "Host is required",
                                        pattern: {
                                            value: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^localhost$/,
                                            message: "Please enter a valid IP address or localhost"
                                        }
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Host</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={defaultChataigneHost}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="port"
                                    rules={{
                                        required: "Port is required",
                                        min: { value: 1, message: "Port must be at least 1" },
                                        max: { value: 65535, message: "Port must be at most 65535" }
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Port</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder={defaultChataignePort.toString()}
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex gap-2 pt-4">
                                    <Button type="submit" className="flex-1">
                                        Save Configuration
                                    </Button>
                                    <Button
                                        type="button" variant="outline" onClick={handleDefault}
                                        disabled={form.watch('host') === defaultChataigneHost && form.watch('port') === defaultChataignePort}
                                    >
                                        Default
                                    </Button>
                                    <Button type="button" variant="outline" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </Form>

                        <div className="mt-4 p-3 bg-muted rounded-md">
                            <p className="text-sm text-muted-foreground">
                                <strong>Current:</strong> {host}:{port}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
