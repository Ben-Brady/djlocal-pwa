import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    createContext,
    FC,
    useCallback,
    useContext,
    useState,
} from "preact/compat";
import classNames from "classnames";

type DrawerOption = {
    text: string;
    icon: IconProp;
    callback: () => void;
};

type DrawerHook = {
    openDrawer: (options: DrawerOption[]) => void;
};

const drawerContext = createContext<DrawerHook | null>(null);

export const DrawerProvider: FC<{ className: string }> = ({
    children,
    className,
}) => {
    const [options, setOptions] = useState<DrawerOption[]>([]);
    const [open, setOpen] = useState(false);
    const openDrawer = useCallback((options: DrawerOption[]) => {
        setOptions(options);
        setOpen(true);
    }, []);

    return (
        <drawerContext.Provider value={{ openDrawer }}>
            <div
                className={className}
                onClick={(e) => {
                    // if (open) setOpen(false);
                }}
            >
                <div class={classNames({ "opacity-20": open })}>{children}</div>
                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    options={options}
                />
            </div>
        </drawerContext.Provider>
    );
};

export const useDrawer = (): DrawerHook => {
    const context = useContext(drawerContext);
    if (!context) throw new Error("Context Bad");

    return context;
};

const Drawer: FC<{
    options: DrawerOption[];
    open: boolean;
    onClose: () => void;
}> = ({ options, open, onClose }) => {
    if (!open) return null;
    return (
        <div class="absolute bottom-0 left-0 h-fit w-full flex-col bg-tertiary">
            {options.map(({ callback, icon, text }) => (
                <div
                    class="flex gap-6 p-4"
                    onClick={() => {
                        callback();
                        onClose();
                    }}
                >
                    <div class="size-6">
                        <FontAwesomeIcon icon={icon} />
                    </div>
                    <span class="capitalize">{text}</span>
                </div>
            ))}
        </div>
    );
};
