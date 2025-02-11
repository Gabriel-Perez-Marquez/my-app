import React from "react";

interface PopUpProps {
    isVisible: boolean;
    form: React.ReactNode;
}


export default function PopUp({ isVisible, form }: PopUpProps) {
    return (
        <div className={isVisible ? "visible" : "hidden"}>
            {form}
        </div>
    );
}
