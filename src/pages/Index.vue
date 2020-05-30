<template>
	<q-page class="flex flex-center">
		<div class="well">
			<venueFilters
				@budgetRange="updateBudgetRange"
				@sortSelected="updateSortSelected"
			/>

			<!-- <venueList /> -->
			<!-- <venueHorizontalCards /> -->
			<venueVerticalCards
				:budgetRange="budgetRange"
				:sortSelected="sortSelected"
			/>
		</div>
	</q-page>
</template>

<script>
import venueFilters from "../components/venueFilters";
import venueList from "../components/venueList";
import venueHorizontalCards from "../components/venueHorizontalCards";
import venueVerticalCards from "../components/venueVerticalCards";

export default {
	name: "PageIndex",

	components: {
		venueFilters,
		venueList,
		venueHorizontalCards,
		venueVerticalCards
	},

	data() {
		return {
			displayList: [],
			budgetRange: null,
			sortSelected: null
		};
	},

	methods: {
		updateBudgetRange(val) {
			this.budgetRange = val;
		},
		updateSortSelected(val) {
			this.sortSelected = val;
		}
	}
};
</script>
