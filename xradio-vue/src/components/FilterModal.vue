<template>
	<div
		class="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50 z-20"
		@click="toggleModal"
	>
		<div
			tabindex="-1"
			id="modal"
			class="bg-white dark:bg-nord-gray4 rounded-lg w-5/6 max-w-3xl overflow-y-auto overscroll-none"
			@click.stop
		>
			<div class="flex flex-col p-4">
				<div class="flex w-full">
					<div class="font-bold text-lg">Filter results</div>
					<button
						class="ml-auto rounded p-1 hover:bg-nord-white1 dark:hover:bg-nord-gray2 transition-colors duration-100 ease-out"
						@click="toggleModal"
					>
						<svg
							class="m-auto fill-current w-6 h-6"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 18 18"
						>
							<path
								d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
							/>
						</svg>
						<span class="sr-only">Close</span>
					</button>
				</div>
				<div class="py-2">
					<!-- <button
						id="dropCountry"
						class="rounded-md flex content-center items-center justify-between w-full p-1 hover:bg-nord-white2 dark:hover:bg-nord-gray2 transition-colors duration-100 ease-out"
						@click="showCountries = !showCountries"
					>
						Choose countries
						<svg
							class="w-4 h-4"
							aria-hidden="true"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							></path>
						</svg>
					</button> -->
                    <p class="pb-2">
                        Choose countries
                    </p>
					<div
						:class="showCountries ? '' : 'hidden'"
						class="z-20 w-full max-h-72 overflow-y-scroll mx-3"
					>
						<button
							class="rounded-md py-1 px-2 hover:bg-nord-white1 dark:hover:bg-nord-gray2 transition-colors duration-100 ease-out"
                            @click="toggleCountries"
						>
							Toggle all
						</button>
						<ul
							class="text-sm"
							v-for="country in $store.state.countries"
							:key="country"
						>
							<li>
								<div
									class="flex items-center p-2 rounded hover:bg-nord-white1 dark:hover:bg-nord-gray2"
								>
									<input
										:id="country.iso_3166_1"
										type="checkbox"
										:value="country.iso_3166_1"
                                        :checked="selectedCountries.has(country.iso_3166_1)"
										class="w-4 h-4 text-blue-600 bg-nord-frost1 rounded border-nord-frost1 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2"
                                        @change="changeCountrySelection"
									/>
									<label
										:for="country.iso_3166_1"
										class="ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300"
									>
										<img
											class="w-6 inline mr-1"
											:src="
												'https://flagcdn.com/w20/' +
												country.iso_3166_1.toLowerCase() +
												'.png'
											"
											:srcset="
												'https://flagcdn.com/w40/' +
												country.iso_3166_1.toLowerCase() +
												'.png 2x'
											"
											:alt="country.iso_3166_1"
										/>{{ country.name }}
									</label>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<div class="ml-auto flex flex-col xs2:flex-row">
					<button
						class="ripple transition-colors duration-100 ease-out hover:bg-nord-white1 dark:hover:bg-nord-gray2 mt-2 xs2:mt-0 xs2:ml-2 py-2 px-4 rounded"
						@click="toggleModal"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			changed: false,
			showCountries: true,
			showQualities: false,
			selectedCountries: new Set(),
		}
	},
	created() {
		this.selectedCountries = this.$store.state.selectedCountries
	},
	mounted() {
		window.addEventListener("keydown", this.keyboardEvent)
	},
	methods: {
		keyboardEvent(event) {
			if (event.code == "Escape") {
				this.toggleModal()
			}
		},
		toggleModal() {
            if(this.changed){
                this.$store.dispatch("setSelectedCountries", this.selectedCountries);
            }
			this.$emit("close", this.changed)
		},
        toggleCountries(){
            this.changed = true
            if(this.selectedCountries.size != this.$store.state.countries.length){
                for(let i = 0; i < this.$store.state.countries.length; i++){
                    this.selectedCountries.add(this.$store.state.countries[i].iso_3166_1)
                }
            }
            else{
                this.selectedCountries.clear()
            }
        },
        changeCountrySelection(element){
            this.changed = true
            if (element.target.checked){
                this.selectedCountries.add(element.target.value)
            }
            else{
                if(selectedCountries.has(element.target.value)){
                    this.selectedCountries.delete(element.target.value)
                }
            }
        }
	},
	beforeUnmount() {
		window.removeEventListener("keydown", this.keyboardEvent)
	},
}
</script>
