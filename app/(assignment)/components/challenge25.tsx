export default function Challenge24() {
	return (
		<div className="flex h-screen w-screen items-center justify-center overflow-x-auto bg-[#FFF2F9]">
			<div className="flex w-4xl items-center justify-center gap-3 p-3 font-sans md:gap-3 md:p-4">
				<div className="card_container bg-white">
					<div className="mb-10 text-2xl font-extrabold md:text-3xl">Weather</div>
					<div className="weather_box">
						<div className="weather_box_left">
							<div className="weather_box_left_title">Casius</div>
							<div className="weather_box_left_sub">Mars, 12AM</div>
						</div>
						<div className="weather_box_right">
							<div className="weather_box_right_img">
								<svg
									data-slot="icon"
									fill="none"
									stroke-width="1.5"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
									></path>
								</svg>
							</div>
							<div className="weather_box_right_label">85˚</div>
						</div>
					</div>
					<div className="weather_box bg-[#FFBD11]">
						<div className="weather_box_left">
							<div className="weather_box_left_title">Dlacria</div>
							<div className="weather_box_left_sub">Mars, 12AM</div>
						</div>
						<div className="weather_box_right">
							<div className="weather_box_right_img">
								<svg
									data-slot="icon"
									fill="none"
									stroke-width="1.5"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
									></path>
								</svg>
							</div>
							<div className="weather_box_right_label">85˚</div>
						</div>
					</div>
					<div className="weather_box bg-[#00C6AD]">
						<div className="weather_box_left">
							<div className="weather_box_left_title">New York</div>
							<div className="weather_box_left_sub">USA, 12AM</div>
						</div>
						<div className="weather_box_right">
							<div className="weather_box_right_img">
								<svg
									data-slot="icon"
									fill="none"
									stroke-width="1.5"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
									></path>
								</svg>
							</div>
							<div className="weather_box_right_label">85˚</div>
						</div>
					</div>
					<div className="weather_box bg-[#F85A2B] text-white">
						<div className="weather_box_left">
							<div className="weather_box_left_title">Zomato</div>
							<div className="weather_box_left_sub">India, 12AM</div>
						</div>
						<div className="weather_box_right">
							<div className="weather_box_right_img">
								<svg
									data-slot="icon"
									fill="none"
									stroke-width="1.5"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
									></path>
								</svg>
							</div>
							<div className="weather_box_right_label">20˚</div>
						</div>
					</div>

					<div className="mt-10 flex w-full justify-center">
						<div className="circle_btn">
							<svg
								data-slot="icon"
								fill="none"
								stroke-width="3"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
							</svg>
						</div>
					</div>
				</div>

				<div className="card_container bg-white">
					<div className="circle_btn mb-1">
						<svg
							data-slot="icon"
							fill="none"
							stroke-width="3"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
						</svg>
					</div>

					<div className="mb-8 w-full">
						<div className="mb-2 text-center text-[10px] font-semibold md:text-xs">SIMPLE TAG</div>
						<div>
							<div className="text-center text-xl leading-6 font-bold md:text-2xl">
								<p>Work With Best</p>
								<p>designers</p>
							</div>
						</div>
					</div>

					<div className="mb-8 grid grid-cols-2 gap-3">
						<div className="tag_box bg-[#FFBD11]">
							<svg
								data-slot="icon"
								fill="none"
								stroke-width="1"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								></path>
							</svg>
						</div>
						<div className="tag_box bg-[#00C6AD]">
							<svg
								data-slot="icon"
								fill="none"
								stroke-width="1"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								></path>
							</svg>
						</div>
						<div className="tag_box bg-[#FF89BB]">
							<svg
								data-slot="icon"
								fill="none"
								stroke-width="1"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								></path>
							</svg>
						</div>
						<div className="tag_box bg-[#F85A2B]">
							<svg
								data-slot="icon"
								fill="none"
								stroke-width="1"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								></path>
							</svg>
						</div>
					</div>

					<div className="flex h-10 w-full items-center justify-center rounded-xl bg-[#1947E5]">
						<span className="text-sm font-extrabold text-white md:text-base">Let's get it done</span>
					</div>
				</div>

				<div className="card_container bg-[#FFBD11]">
					<div className="relative mb-6 flex items-center justify-center">
						<div className="circle_btn absolute left-0 bg-white">
							<svg
								data-slot="icon"
								fill="none"
								stroke-width="3"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 19.5 8.25 12l7.5-7.5"
								></path>
							</svg>
						</div>
						<div className="text-center text-lg font-extrabold md:text-xl">Friends</div>
					</div>
					<div className="relative mb-4">
						<input
							type="text"
							placeholder="Search with love ..."
							className="w-full rounded-md border border-b-3 bg-white py-1 pr-8 pl-2 text-xs ring ring-neutral-200 placeholder:text-neutral-600 focus:ring-2 focus:ring-fuchsia-400 focus:outline-none md:text-sm"
						/>
						<div className="absolute top-0 right-1.5 size-3.5 translate-y-1/2 text-neutral-700 md:right-2 md:size-4">
							<svg
								data-slot="icon"
								fill="none"
								stroke-width="1"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
								></path>
							</svg>
						</div>
					</div>

					<div className="friends_box">
						<div className="flex items-center gap-2">
							<div className="friends_charecter friends_charecter_man1"></div>
							<div className="flex flex-col pb-1 leading-2.5">
								<div className="friends_box_name">Bill Rizer</div>
								<div className="friends_box_job">Planet Designer</div>
							</div>
						</div>
						<label className="relative cursor-pointer">
							<input type="checkbox" className="peer hidden" />
							<div className="friends_box_invite peer-checked:hidden">Invite</div>
							<div className="friends_box_invite hidden peer-checked:block">Invited</div>
						</label>
					</div>

					<div className="friends_box">
						<div className="flex items-center gap-2">
							<div className="friends_charecter friends_charecter_woman1"></div>
							<div className="flex flex-col pb-1 leading-2.5">
								<div className="friends_box_name">Genbei Yagy</div>
								<div className="friends_box_job">Planet Designer</div>
							</div>
						</div>
						<label className="relative cursor-pointer">
							<input type="checkbox" className="peer hidden" />
							<div className="friends_box_invite peer-checked:hidden">Invite</div>
							<div className="friends_box_invite hidden peer-checked:block">Invited</div>
						</label>
					</div>
					<div className="friends_box">
						<div className="flex items-center gap-2">
							<div className="friends_charecter friends_charecter_man2"></div>
							<div className="flex flex-col pb-1 leading-2.5">
								<div className="friends_box_name">Lancy Neo</div>
								<div className="friends_box_job">Rogue Corp</div>
							</div>
						</div>
						<label className="relative cursor-pointer">
							<input type="checkbox" className="peer hidden" />
							<div className="friends_box_invite peer-checked:hidden">Invite</div>
							<div className="friends_box_invite hidden peer-checked:block">Invited</div>
						</label>
					</div>
					<div className="friends_box">
						<div className="flex items-center gap-2">
							<div className="friends_charecter friends_charecter_woman2"></div>
							<div className="flex flex-col pb-1 leading-2.5">
								<div className="friends_box_name">Bill Rizer</div>
								<div className="friends_box_job">Hard Cops</div>
							</div>
						</div>
						<label className="relative cursor-pointer">
							<input type="checkbox" className="peer hidden" />
							<div className="friends_box_invite peer-checked:hidden">Invite</div>
							<div className="friends_box_invite hidden peer-checked:block">Invited</div>
						</label>
					</div>
					<div className="friends_box">
						<div className="flex items-center gap-2">
							<div className="friends_charecter friends_charecter_woman3"></div>
							<div className="flex flex-col pb-1 leading-2.5">
								<div className="friends_box_name">Konami</div>
								<div className="friends_box_job">Xenon Creator</div>
							</div>
						</div>
						<label className="relative cursor-pointer">
							<input type="checkbox" className="peer hidden" />
							<div className="friends_box_invite peer-checked:hidden">Invite</div>
							<div className="friends_box_invite hidden peer-checked:block">Invited</div>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
