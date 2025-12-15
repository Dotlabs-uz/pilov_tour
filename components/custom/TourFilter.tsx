"use client";
import { Input } from "../ui/input";
import FieldShell from "./FieldShell";

const TourFilter = () => {
	return (
		<>
			<div className="flex flex-col items-center gap-2 shadow-lg w-[1232px] h-[120px] justify-center">
				<FieldShell label="From - To">
					<Input
						type="text"
						placeholder="From"
						className="w-full bg-transparent border-none p-4 focus:outline-none focus:ring-0 font-medium placeholder:text-gray-400"
					/>
					-
					<Input
						type="text"
						placeholder="To"
						className="w-full bg-transparent border-none p-4 focus:outline-none focus:ring-0 font-medium placeholder:text-gray-400"
					/>
				</FieldShell>
			</div>
		</>
	);
};

export default TourFilter;
