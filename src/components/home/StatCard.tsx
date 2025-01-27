import Tippy from "@tippyjs/react";
import { InfoIcon } from "lucide-react";

interface StatCardProps { count?: number; label: string; tooltipContent: string }

export const StatCard = ({ count, label, tooltipContent }: StatCardProps) => (
    <div className='bg-white border border-gray-200 rounded-lg p-4 text-center'>
        <div className='text-2xl font-light text-colorprimary mb-1'>
            {count}
        </div>
        <p className='text-xs text-gray-400'>
            {label}
            <Tippy
                content={tooltipContent}
                placement="bottom"
                theme="custom"
                trigger="click"
                interactive
            >
                <span className='cursor-help text-gray-400 hover:text-colorprimary transition-colors'>
                    <InfoIcon className="w-5 h-5 text-blue-400" />
                </span>
            </Tippy>
        </p>
    </div>
);
