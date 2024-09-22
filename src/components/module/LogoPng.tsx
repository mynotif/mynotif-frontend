import React from 'react';
import clsx from "clsx"


interface LogoPngProps {
    src?: string;
    alt?: string;
    size?: number | string;
    className?: string;
}

const LogoPng: React.FC<LogoPngProps> = ({
    src = "/ordopro/logo-cote.png",
    alt = "logo ordopro",
    size = 60,
    className,
}) => {
    return (
        <div className={clsx(className, `w-${size} h-auto w-24 mx-auto mb-4 ${className}`)}>
            <img src={src} alt={alt} />
        </div>
    );
};

export default LogoPng;