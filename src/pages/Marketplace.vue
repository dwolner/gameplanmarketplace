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
					<div class="col-12 q-pa-sm" align="right">
						<q-btn-group>
							<q-btn class="bg-grey-7 text-white" size="sm" @click="cardLayout = 'venueVerticalCards'">
								<q-icon name="fas fa-th-large" /> 
								<span class="q-ml-sm">Grid</span>
							</q-btn>
							<q-btn class="bg-grey-7 text-white" size="sm" @click="cardLayout = 'venueHorizontalCards'">
								<q-icon name="fas fa-list" /> 
								<span class="q-ml-sm">List</span>
							</q-btn>
						</q-btn-group>
					</div>
					<div v-if="$q.screen.width > 767" class="col-xs-3">
						<MarketplaceSidebar />
					</div>
					<div class="col-xs-12 col-sm-9">
						<component 
							:is="cardLayout"
							:allVenues="allVenues"
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
			allVenues: [],
			allTags: [],
			budgetRange: null,
			sortSelected: null,
			cardLayout: 'venueVerticalCards'
		};
	},

	methods: {
		updateBudgetRange(val) {
			this.budgetRange = val;
		},
		updateSortSelected(val) {
			this.sortSelected = val;
		},
		getAllMarketplaceTags() {
			this.$axios.get(`https://us-central1-gpln-marketplace.cloudfunctions.net/getAllExperienceTags`)
			.then((response) => {
				// handle success
				console.log('TAGS: ', response);
				this.allTags = response.data
			})
			.catch((error) => {
				// handle error
				console.log(error);
			})
			.finally(() => {
				// always executed
			})
		},
		getAllVenues() {
			this.$axios.get(`https://us-central1-gpln-marketplace.cloudfunctions.net/getAllVenues`)
			.then((response) => {
				// handle success
				console.log('VENUES: ', response);
				this.allVenues = response.data
			})
			.catch((error) => {
				// handle error
				console.log(error);
			})
			.finally(() => {
				// always executed
			})
		}
	},

	created() {
		this.getAllMarketplaceTags()
		this.getAllVenues()
	}
};
</script>
