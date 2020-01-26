<template>
    <q-page class="flex flex-center">
        
		<div class="well">
			<venueFilters />

			<venueList />
			<!-- <venueHorizontalCards /> -->
			<!-- <venueVerticalCards /> -->
		</div>

    </q-page>
</template>

<script>
import venueFilters from '../components/venueFilters'
import venueList from '../components/venueList'
import venueHorizontalCards from '../components/venueHorizontalCards'
import venueVerticalCards from '../components/venueVerticalCards'

export default {
	name: 'PageIndex',
	
	components: {
		venueFilters,
		venueList,
		venueHorizontalCards,
		venueVerticalCards
	},

    data() {
        return {
            displayList: [],
        }
    },
}
</script>
