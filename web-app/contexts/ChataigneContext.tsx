'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';



export interface ChataigneContextType {
    host: string;
    port: number;
    setHost: (host: string) => void;
    setPort: (port: number) => void;
    setConnection: (host: string, port: number) => void;
}

export const ChataigneContext = createContext<ChataigneContextType | undefined>(undefined);

export interface ChataigneProviderProps {
    children: ReactNode;
    initialHost?: string;
    initialPort?: number;
}

export const defaultChataigneHost = '127.0.0.1';
export const defaultChataignePort = 42000;

export function ChataigneProvider(props: ChataigneProviderProps) {

    const { 
        children, 
        initialHost = defaultChataigneHost, 
        initialPort = defaultChataignePort 
    } = props;

    const [host, setHost] = useState<string>(initialHost);
    const [port, setPort] = useState<number>(initialPort);

    const setConnection = (newHost: string, newPort: number) => {
        setHost(newHost);
        setPort(newPort);
    };

    const value: ChataigneContextType = {
        host,
        port,
        setHost,
        setPort,
        setConnection,
    };

    return <ChataigneContext.Provider value={value}>
        {children}
    </ChataigneContext.Provider>;
}

export function useChataigneContext(): ChataigneContextType {
    const context = useContext(ChataigneContext);
    if (context === undefined) {
        throw new Error('useChataigne must be used within a ChataigneProvider');
    }
    return context;
}
