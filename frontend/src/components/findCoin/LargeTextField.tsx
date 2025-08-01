import { useState } from "react";

interface LargeTextFieldProps {
    title?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    description?: string;
    error?: string | null;
    maxLength?: number;
}

const LargeTextField = (props: LargeTextFieldProps) => {
    const {
        title,
        value,
        placeholder = "",
        description = "",
        maxLength,
        error = null,
        onChange,
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const decoratedOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (maxLength !== undefined && e.target.value.length > maxLength) {
            e.target.value = e.target.value.slice(0, maxLength);
        }
        onChange(e);
    }

    const borderColorClass = error
        ? "border-red-500" // 에러 상태
        : isFocused
            ? "border-VB-50" // 활성 상태
            : "border-gray-200"; // 비활성 상태

    return (
        <div className="large-text-field w-full h-full pb-4">
            {title && <div className={`
                large-text-field-title
                ml-2
                mb-2
                block
                font-bold
                text-sm
                text-grey-70
            `}>{title}</div>}
            <textarea
                className={`
                    w-full
                    box-border
                    rounded-2xl
                    transition-colors
                    duration-200
                    py-4
                    px-3
                    line-15
                    text-[15px]
                    font-medium
                    placeholder:text-grey-90
                    placeholder:text-[15px]
                    focus:outline-none
                    bg-grey-98
                    focus:bg-white
                    resize-none
                    overflow-y-auto
                    h-full
                    border-2
                    ${borderColorClass}
                `}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={decoratedOnChange}
                value={value}
                placeholder={placeholder}></textarea>
                
            {/* 하단 오류나 글자 수 출력 부분이 컴포넌트에 안들어가는 문제 있음. 추후에 수정. 일단은 부모 태그에 패딩 넣어놓은 상태 */}
            <div className="flex justify-between mt-1.5 text-xs">
                <span className={`${error ? "text-red-500" : "text-grey-70"} ml-2`}>
                    {error || description}
                </span>
                {maxLength && 
                <span className="text-grey-70 mr-2">
                    {value.length}/{maxLength}
                </span>
                }
            </div>
        </div>
    )
}

export default LargeTextField;