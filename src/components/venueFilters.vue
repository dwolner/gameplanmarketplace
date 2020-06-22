<template>
	<div>
		<q-toolbar class="text-primary">
			<div class="q-px-sm">
				<q-select
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
			</div>

			<div class="q-px-sm">
				<q-input filled v-model="text" :readonly="readonly" :disable="disable" label="Budget">
					<template v-slot:prepend>
						<q-icon name="fas fa-dollar-sign" />
					</template>
				</q-input>
			</div>

			<div class="q-px-sm">
				<q-input filled v-model="text" :readonly="readonly" :disable="disable" label="# of Guests">
					<template v-slot:prepend>
						<q-icon name="fas fa-user" />
					</template>
				</q-input>
			</div>

			<div class="q-px-sm">
				<q-input filled v-model="date" label="Date And Time">
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
			</div>

			<div class="q-px-sm">
				<q-btn class="bg-white text-primary full-width" flat size="sm" @click="$router.push('/market')">
					<q-icon name="fas fa-undo" size="xs" />
					<span class="">Reset</span>
				</q-btn>
			</div>
		</q-toolbar>

		<q-dialog v-model="showTags"> 
			<div class="q-px-sm">
				<q-select
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
			</div>

			<div class="q-px-sm">
				<q-input filled v-model="text" :readonly="readonly" :disable="disable" label="Budget">
					<template v-slot:prepend>
						<q-icon name="fas fa-dollar-sign" />
					</template>
				</q-input>
			</div>

			<div class="q-px-sm">
				<q-input filled v-model="text" :readonly="readonly" :disable="disable" label="# of Guests">
					<template v-slot:prepend>
						<q-icon name="fas fa-user" />
					</template>
				</q-input>
			</div>

			<div class="q-px-sm">
				<q-input filled v-model="date" label="Date And Time">
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
			</div>

			<div class="q-px-sm">
				<q-btn class="bg-white text-primary full-width" flat size="sm" @click="$router.push('/market')">
					<q-icon name="fas fa-undo" size="xs" />
					<span class="">Reset</span>
				</q-btn>
			</div>
		</q-dialog>
	</div>
</template>

<script>
import { tags } from "../js/tags.js";
export default {
	name: "venueList",

	data() {
		return {
			showTags: false,
			searchTagString: "",
			tagData: tags,
			sortSelected: null,
			distanceRange: 0,
			budgetRange: {
				min: 5,
				max: 145
			},
			sortOptions: ["Price", "Name"]
		};
	},

	computed: {
		allTags() {
			return this.tagData.map(tag => (tag.filter = false));
		},
		displayTags() {
			return this.searchTagString
				? this.tagData.filter(tag =>
						tag.name
							.toLowerCase()
							.includes(this.searchTagString.toLowerCase())
				  )
				: this.tagData;
		},
		selectedTags() {
			return this.tagData.map(tag => tag.filter)
		}
	},

	watch: {
		budgetRange: {
			deep: true,
			handler(val) {
				this.$emit("budgetRange", val);
			}
		},
		sortSelected() {
			this.$emit("sortSelected", this.sortSelected);
		}
	},

	created() {
		console.log("TAGS: ", this.allTags);
	}
};
</script>
