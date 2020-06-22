<template>
	<q-card class="bg-primary">
		<q-card-section>
			<h6 class="text-white" align="center">PLAN YOUR EVENT</h6>
		</q-card-section>

		<q-card-section>
			<q-select
				dark
				filled
				label="Location"
				
				v-model="model"
				use-input
				use-chips
				multiple
				input-debounce="0"
				@new-value="createValue"
				:options="filterOptions"
				@filter="filterFn"
			>
				<template v-slot:prepend>
					<q-icon name="fas fa-map-marker" />
				</template>
			</q-select>
		</q-card-section>

		<q-card-section>
			<q-input dark filled v-model="text" :readonly="readonly" :disable="disable" label="Budget">
				<template v-slot:prepend>
					<q-icon name="fas fa-dollar-sign" />
				</template>
			</q-input>
		</q-card-section>

		<q-card-section>
			<q-input dark filled v-model="text" :readonly="readonly" :disable="disable" label="# of Guests">
				<template v-slot:prepend>
					<q-icon name="fas fa-user" />
				</template>
			</q-input>
		</q-card-section>

		<q-card-section>
			<q-input filled v-model="date" dark label="Date And Time">
				<template v-slot:prepend>
					<q-icon name="fas fa-calendar" class="cursor-pointer">
					<q-popup-proxy transition-show="scale" transition-hide="scale">
						<q-date v-model="date" mask="YYYY-MM-DD HH:mm" />
					</q-popup-proxy>
					</q-icon>
				</template>

				<template v-slot:append>
					<q-icon name="fas fa-clock" class="cursor-pointer">
					<q-popup-proxy transition-show="scale" transition-hide="scale">
						<q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h />
					</q-popup-proxy>
					</q-icon>
				</template>
			</q-input>
		</q-card-section>

		<q-card-section>
			<q-btn class="bg-white text-primary full-width" size="lg" @click="$router.push('/market')">
				<h6 class="q-mr-md">Start Planning</h6>
				<q-icon name="fas fa-chevron-right" size="sm" />
			</q-btn>

			<q-btn flat class="text-white full-width q-mt-md" @click="$router.push('/market')">
				<span class="q-mr-md">or browse all</span>
				<q-icon name="fas fa-chevron-right" size="xs" />
			</q-btn>
		</q-card-section>
	</q-card>
</template>

<script>

export default {
	name: "VenueFiltersVertical",

	data() {
		return {
			
		}
	},

	computed: {
		
	},

	watch: {
		
	},

	created() {

	}
}
</script>
