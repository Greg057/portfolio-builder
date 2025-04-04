export default function Spinner() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full">
			<div className="w-12 h-12 border-4 mt-32 border-gray-300 border-t-primary rounded-full animate-spin" />
			<div className="text-2xl pt-7 text-center font-bold">Loading...</div>
		</div>
	);
}