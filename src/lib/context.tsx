import { createContext, FC, ReactNode, useContext } from "react";

export const createBasicContext = <
    TContext extends any = any,
    TInput extends Record<string, any> = Record<string, any>,
>(
    name: string,
    transform: (input: TInput) => {
        hook: TContext;
        children?: ReactNode | undefined;
    },
): [FC<{ children: ReactNode } & TInput>, () => TContext] => {
    const context = createContext<TContext | null>(null);

    const useBasicContext = () => {
        const data = useContext(context);
        if (!data) throw new Error(`Didn't use ${name}'s Provider`);
        return data;
    };

    const Provider: FC<{ children: ReactNode } & TInput> = (props) => {
        const { hook, children } = transform(props);

        return (
            <context.Provider value={hook}>
                {props.children}
                {children}
            </context.Provider>
        );
    };
    return [Provider, useBasicContext];
};
