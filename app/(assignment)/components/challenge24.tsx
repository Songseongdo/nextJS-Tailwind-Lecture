export default function Challenge24() {
	return (
		<div className="p-5">
			<div className="flex items-center gap-2">
				<div className="pb-2 font-semibold">March 2021</div>
				<div className="size-5">
					<svg
						data-slot="icon"
						fill="none"
						strokeWidth="1.5"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
					</svg>
				</div>
			</div>
			<div className="w-full border-b-1"></div>

			<div className="my-6 flex flex-col items-center justify-center text-xl font-semibold">
				<div>Hello, Bruno!</div>
				<div>Your medicines for tody</div>
			</div>

			<div className="flex items-center justify-between px-3 ">
				<div className="dayweek-container">
					<div className="day-style">16</div>
					<div className="week-style">Mon</div>
				</div>
				<div className="dayweek-container">
					<div className="day-style">17</div>
					<div className="week-style">The</div>
				</div>
				<div className="dayweek-container">
					<div className="day-style">18</div>
					<div className="week-style">Wed</div>
				</div>
				<div className="dayweek-container">
					<div className="day-style">19</div>
					<div className="week-style">Thu</div>
				</div>
				<div className="dayweek-container">
					<div className="day-style">20</div>
					<div className="week-style">Fri</div>
				</div>
				<div className="dayweek-container">
					<div className="day-style">21</div>
					<div className="week-style">Sat</div>
				</div>
			</div>

			<div className="relative mt-[150px] text-black">
				<label className="relative w-full cursor-pointer items-center space-x-2">
					<input type="checkbox" className="peer hidden" />
					<div className="medicine-default-bg bg-yellow-200">
						<div>
							<div className="medicine-name">Nora - BE</div>
							<div className="medicine-detail">Norenthindrone - 0.35mg</div>
						</div>

						<div className="medicine-time">7:30 am</div>
					</div>
					<div className="medicine-checked">
						<div className="relative size-6">
							<svg
								data-slot="icon"
								fill="none"
								strokeWidth="4"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
							</svg>
						</div>
					</div>
				</label>
				<label className="relative w-full cursor-pointer items-center space-x-2">
					<input type="checkbox" className="peer hidden" />
					<div className="medicine-default-bg bg-green-400">
						<div>
							<div className="medicine-name">Feosol</div>
							<div className="medicine-detail">Ferrous Sulfate - 600mg</div>
						</div>

						<div className="medicine-time">7:30 am</div>
					</div>
					<div className="medicine-checked">
						<div className="relative size-6">
							<svg
								data-slot="icon"
								fill="none"
								strokeWidth="4"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
							</svg>
						</div>
					</div>
				</label>
			</div>
		</div>
	);
}
