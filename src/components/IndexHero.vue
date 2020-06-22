<template>

	<div class="full-width hero row" style="background-image: url('statics/group-of-people-gathering-inside-bar-1058277.jpg');">
		<div class="color-overlay"></div>

		<div class="well flex-center flex" style="z-index: 1;">
			<div class="row full-width">
				<div class="col-6 flex flex-center">
					<div class="">
						<h4 class="text-white">Book corporate & group dining</h4>
						<h6 class="text-white">Find it. Book it. Make it yours.</h6>
						<ol class="text-white">
							<li>Search venues with real-time availability</li>
							<li>Get automated price quotes for rooms & menus</li>
							<li>Book instantly and get confirmation within 24 hours</li>
						</ol>
					</div>
				</div>

				<div class="col-6" style="margin-bottom: -3rem;">
					<VenueFiltersVertical style="max-width: 400px; margin: 0 auto;" />
				</div>
			</div>
		</div>
	</div>
		
</template>

<script>
import VenueFiltersVertical from "../components/VenueFiltersVertical"

export default {
	name: "IndexHero",

	components: {
		VenueFiltersVertical
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
 .hero {
	position: relative;
	background-size: cover;
	background-position: 50%;
	/* max-height: 500px; */
 }
 .color-overlay {
	position: absolute;
	content: "";
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(60, 60, 60, .7);
}
</style>
