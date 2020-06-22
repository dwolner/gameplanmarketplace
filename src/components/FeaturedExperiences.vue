<template>
	<div class="well">
		<div class="row q-pa-lg">
			<div class="col-12 q-pa-md" align="center">
				<h6>Featured Experiences</h6>
			</div>
			<div
				v-if="index < 3"
				class="col-xs-12 col-sm-6 col-md-4 q-pa-sm"
				v-for="(item, index) in displayList"
			>
				<venueVerticalCard :item="item" />
			</div>
		</div>
	</div>
</template>

<script>
import { venues } from "../js/venues.js";
console.log("venues: ", venues);

import venueVerticalCard from "../components/venueVerticalCard"

export default {
	name: "venueCards",

	props: ["budgetRange", "sortSelected"],

	components: {
		venueVerticalCard
	},

	data() {
		return {
			allVenues: venues
		}
	},

	computed: {
		displayList() {
			let displayList = this.allVenues;

			if (this.budgetRange) {
				console.log("budgetRange: ", this.budgetRange);
				displayList = displayList.filter(
					item =>
						item.price > this.budgetRange.min &&
						item.price < this.budgetRange.max
				);
			}

			if (this.sortSelected) {
				let key = this.sortSelected.toLowerCase();
				console.log("sortSelected: ", key);

				displayList.sort((a, b) => {
					if (a[key] < b[key]) {
						return -1;
					}
					if (a[key] > b[key]) {
						return 1;
					}
					return 0;
				});
			}

			return displayList;
		}
	}
};
</script>
