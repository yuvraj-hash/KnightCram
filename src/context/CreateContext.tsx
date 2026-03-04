import { createContext, useContext, useState, ReactNode } from "react";

export type CreateView = "menu" | "post" | "resource" | null;

interface CreateContextType {
    view: CreateView;
    openCreate: () => void;
    openPost: () => void;
    openResource: () => void;
    close: () => void;
}

const CreateContext = createContext<CreateContextType | null>(null);

export const CreateProvider = ({ children }: { children: ReactNode }) => {
    const [view, setView] = useState<CreateView>(null);

    const openCreate = () => setView("menu");
    const openPost = () => setView("post");
    const openResource = () => setView("resource");
    const close = () => setView(null);

    return (
        <CreateContext.Provider value={{ view, openCreate, openPost, openResource, close }}>
            {children}
        </CreateContext.Provider>
    );
};

export const useCreate = () => {
    const ctx = useContext(CreateContext);
    if (!ctx) throw new Error("useCreate must be used within CreateProvider");
    return ctx;
};
