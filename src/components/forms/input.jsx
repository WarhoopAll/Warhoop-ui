import {useState} from "react";
import {Input} from "@nextui-org/react";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@/components/icons/icons";

export const TextInput = ({
                              id, label, value, onChange, type = "text", isPassword = false, onValueChange
                          }) => {
    const [visible, setVisible] = useState(false);
    const [internalValue, setInternalValue] = useState(value || "");

    const handleChange = (e) => {
        setInternalValue(e.target.value);
        if (onChange) {
            onChange(e);
        }
        if (onValueChange) {
            onValueChange(e.target.value);
        }
    };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (<Input
        id={id}
        label={label}
        autoComplete='on'
        size='lg'
        value={internalValue}
        onChange={handleChange}
        type={isPassword ? (visible ? "text" : "password") : type}
        classNames={{
            inputWrapper: "wow-input-bg-color", input: "wow-input-text-color"
        }}
        endContent={isPassword && (<button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
        >
            {visible ? (<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>)}
        </button>)}
    />);
};
