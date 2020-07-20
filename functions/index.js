const functions = require('firebase-functions');
const axios = require('axios')
const cors = require('cors')({
	origin: true
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.getAllExperienceTags = functions.https.onRequest((request, res) => {
	axios.get(`https://platform.getgameplan.com/entityds/v1/entity/tag`, {
			auth: {
				username: 'com.getgameplan.marketplace',
				password: 'HJwvL2FrCynIRKg1okUO3wj86NzRdfW887UGGhrqHwgTqc'
			}
		})
		.then((response) => {
			// handle success
			console.log('TAGS: ', response.data);
			res.set({
				'Access-Control-Allow-Origin': '*'
			}).send(response.data);
		})
		.catch((error) => {
			// handle error
			console.log(error);
		})
		.finally(() => {
			// always executed
		})
})

exports.getAllVenues = functions.https.onRequest((request, res) => {
	axios.get(`https://platform.getgameplan.com/entityds/v1/entity/business?hasExperiences=true&hasShops=true`, {
			auth: {
				username: 'com.getgameplan.marketplace',
				password: 'HJwvL2FrCynIRKg1okUO3wj86NzRdfW887UGGhrqHwgTqc'
			}
		})
		.then((response) => {
			// handle success
			console.log('VENUES: ', response.data)

			// https://platform-staging.getgameplan.com/entityds/v1/entity/tag?id=1&id=2
			// https://platform-staging.getgameplan.com/entityds/v1/entity/media?types=PHOTO&businesses=3366&businesses=8378
			// https://platform-staging.getgameplan.com/entityds/v1/entity/experience?listedMarketplace=true&businessIds=3366&businessIds=8378
			// https://platform-staging.getgameplan.com/entityds/v1/entity/shop?listedMarketplace=true&businessIds=3366&businessIds=8378

			// map all venues with their tags, experiences, and shops

			res.set({
				'Access-Control-Allow-Origin': '*'
			}).send(response.data);
		})
		.catch((error) => {
			// handle error
			console.log(error);
		})
		.finally(() => {
			// always executed
		})
})