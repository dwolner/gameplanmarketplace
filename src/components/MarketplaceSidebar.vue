<template>
	<div class="q-pa-md">
		<h6>Filter Results</h6>
		<hr />
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
