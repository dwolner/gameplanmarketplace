<template>
	<q-page class="flex">
		
		<IndexHero />

		<FeaturedExperiences />
		
	</q-page>
</template>

<script>
import IndexHero from "../components/IndexHero"
import FeaturedExperiences from "../components/FeaturedExperiences"

export default {
	name: "PageIndex",

	components: {
		IndexHero,
		FeaturedExperiences
	},

	data() {
		return {
			
		}
	},

	methods: {

	}
};
</script>

<style scoped>

</style>
