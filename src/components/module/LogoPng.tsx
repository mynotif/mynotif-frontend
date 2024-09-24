import React from 'react';
import clsx from "clsx"

interface LogoPngProps {
    src?: string;
    alt?: string;
    size?: number | string;
    className?: string;
    fontSize?: number;
}

const LogoPng: React.FC<LogoPngProps> = ({
    src = "/ordopro/logo-cote.png",
    alt = "logo ordopro",
    size = 60,
    className = "",
    fontSize = "100px",
}) => {
    const style = {
        width: size,
        fontSize: fontSize
      }
    return (
        <div className={clsx(className, `my-4 ${className}`)}
            style={ style }
        >
            <img src={src} alt={alt} />
        </div>
    );
};

export default LogoPng;