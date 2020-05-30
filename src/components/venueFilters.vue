<template>
	<div>
		<q-toolbar class="text-primary">
			<q-btn flat round icon="fas fa-sort-amount-down">
				<q-menu>
					<div class="row no-wrap q-pa-md">
						<div class="column" style="min-width: 150px;">
							<q-select
								filled
								v-model="sortSelected"
								:options="sortOptions"
								label="Sort By"
								stack-label
								dense
								options-dense
							/>
							<q-btn
								flat
								dense
								size="sm"
								label="Remove sort"
								@click="sortSelected = ''"
							/>
						</div>
					</div>
				</q-menu>
			</q-btn>

			<q-toolbar-title>
				Top Results
			</q-toolbar-title>

			<q-btn flat round icon="fas fa-sliders-h">
				<q-menu>
					<div class="row no-wrap q-pa-md">
						<div class="column" style="min-width: 150px;">
							<h6 class="q-mb-md">Budget</h6>
							<q-range
								v-model="budgetRange"
								:min="0"
								:max="200"
								:step="5"
								:left-label-value="`$${budgetRange.min}`"
								:right-label-value="`$${budgetRange.max}`"
								drag-range
								label
								label-always
								markers
								snap
								color="primary"
							/>
							<q-separator vertical inset class="q-mx-lg" />

							<h6 class="q-mb-md">Within</h6>
							<q-slider
								v-model="distanceRange"
								:min="0"
								:max="100"
								:step="5"
								:label-value="`${distanceRange} mi.`"
								label
								label-always
								color="primary"
							/>
							<q-separator vertical inset class="q-mx-lg" />
						</div>
					</div>
				</q-menu>
			</q-btn>

			<q-btn flat round icon="fas fa-filter">
				<q-menu>
					<div class="row no-wrap q-pa-md">
						<div class="column">
							<q-input
								filled
								bottom-slots
								v-model="searchTagString"
								label="Search for tags"
								dense
							>
								<template v-slot:prepend>
									<q-icon name="fas fa-search" size="xs" />
								</template>
								<template v-slot:append>
									<q-icon
										name="fas fa-times"
										@click="searchTagString = ''"
										class="cursor-pointer"
										size="xs"
									/>
								</template>
							</q-input>

							<q-toggle
								v-if="displayTags && displayTags.length"
								v-for="tag in displayTags"
								v-model="tag.filter"
								:label="`${tag.name} (${tag.type})`"
							/>

						</div>
					</div>
				</q-menu>
			</q-btn>
		</q-toolbar>

		<q-dialog v-model="showTags"> </q-dialog>
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
