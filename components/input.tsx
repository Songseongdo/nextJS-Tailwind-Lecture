import { forwardRef, InputHTMLAttributes } from "react";

interface IFromInputProps {
	$name: string;
	$errors?: string[];
}

const _Input = forwardRef<HTMLInputElement, IFromInputProps & InputHTMLAttributes<HTMLInputElement>>(
	({ $name, $errors = [], ...rest }, ref) => {
		return (
			<div className="flex flex-col gap-2">
				<input
					ref={ref}
					className="p-4 bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
					name={$name}
					{...rest}
				/>

				{$errors?.map((error, index) => (
					<span key={index} className="text-red-500 font-medium">
						{error}
					</span>
				))}
			</div>
		);
	}
);

export default _Input;
