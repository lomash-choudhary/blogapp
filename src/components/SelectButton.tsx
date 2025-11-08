import React, { useId } from "react"

const SelectButton = ({
    options,
    label,
    className="",
    ...props
}:{
    options:string[],
    label:string,
    className:string
}, ref:React.Ref<HTMLSelectElement>) => {

    const id = useId()

  return (
    <div className="w-full">
        {
            label && <label
            htmlFor={id}
            className=""
            >
                <select
                {...props}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                id={id}
                >
                    {
                        options?.map((option, idx) => (
                            <option key={idx} value={option}>
                                {option}
                            </option>
                        ))
                    }

                </select>
            </label>
        }
    </div>
  )
}

export default React.forwardRef(SelectButton)