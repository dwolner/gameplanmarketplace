<template>
	<q-page class="flex flex-center">
		<div class="full-width">
			<div class="well">
				<venueFilters
					@budgetRange="updateBudgetRange"
					@sortSelected="updateSortSelected"
				/>
			</div>
		</div>
		<div class="full-width bg-grey-2">
			<div class="well">
				<div class="row">
					<div v-if="$q.screen.width > 767" class="col-xs-3">
						<MarketplaceSidebar />
					</div>
					<div class="col-xs-12 col-sm-9">
						<!-- <venueList /> -->
						<!-- <venueHorizontalCards /> -->
						<venueVerticalCards
							:budgetRange="budgetRange"
							:sortSelected="sortSelected"
						/>
					</div>
				</div>
			</div>
		</div>
	</q-page>
</template>

<script>
import venueFilters from "../components/venueFilters";
import MarketplaceSidebar from "../components/MarketplaceSidebar";
import venueList from "../components/venueList";
import venueHorizontalCards from "../components/venueHorizontalCards";
import venueVerticalCards from "../components/venueVerticalCards";

export default {
	name: "Marketplace",

	components: {
		venueFilters,
		MarketplaceSidebar,
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
