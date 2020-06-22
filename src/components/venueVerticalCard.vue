<template>

	<q-card class="full-width bg-grey-1" bordered style="height: 100%;">
		<q-card-section>
			<q-card-section align="center">
				<q-img
					v-if="item.imagesrc"
					:src="item.imagesrc"
					style="max-width: 100%;"
				/>
				<q-icon else name="fas fa-home" size="lg" />
			</q-card-section>

			<q-card-section>
				<h6
					v-if="item.name"
					class="text-weight-medium text-primary"
				>
					{{ item.name }}
				</h6>

				<div v-if="item.tagstring" class="text-weight-medium">
					{{ item.tagstring }}
				</div>
				<div else class="text-weight-medium">
					tag 1 | tag 2 | tag 3
				</div>

				<div v-if="item.desc">{{ item.desc }}</div>
				<div else>
					Short description that can go all the way to the end
					of the card so we can fit as much info as possible.
					It can even go to two lines, check that out!
				</div>
			</q-card-section>

			<q-card-actions vertical class="justify-around q-px-md">
				<q-btn color="secondary" size="md">
					Build Event
				</q-btn>
			</q-card-actions>
		</q-card-section>
	</q-card>

</template>

<script>
export default {
	name: "venueCards",

	props: ['item'],

	data() {
		return {

		}
	},

	computed: {
		
	}
}
</script>
