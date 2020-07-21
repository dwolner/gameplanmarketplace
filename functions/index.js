const functions = require('firebase-functions')
const axios     = require('axios')
const url       = require('url')
const cors      = require('cors')({
	origin : true
})

function loadConfig() {
	try {
		return require('./config.local.json');
	} catch (e) {
		return require('./config.json');
	}
}

Array.prototype.unique = function () {
	return this.filter((value, index, self) => {
		return self.indexOf(value) === index;
	});
};

const config = loadConfig();

let getEntity = async (type, params) => {
	let paramString = ''

	if (params) {
		params.forEach((paramObj) => {
			paramString = `${paramString}${paramString ? '&' : '?'}${paramObj.key}=${paramObj.val}`
		})
	}

	try {
		let start = new Date().valueOf();
		let route = `${config.entityds.url}/v1/entity/${type}${paramString ? paramString : ''}`

		let res = await axios.get(route, {
			auth : {
				username : config.entityds.username,
				password : config.entityds.password,
			}
		});

		let end = new Date().valueOf();

		console.log(`EntityDS: ${config.entityds.url}/v1/entity/${type} (${res.data.length} results in ${end - start} ms, started at ${start})`);

		return res.data
	} catch (error) {
		console.log('ERROR: ')
		console.log(error)
	}
}

let createBusinessTagObjFromIDs = (IDs, key) => {
	return IDs.map(id => {
		return {
			key : key,
			val : id
		}
	})
}

let mediaUrl = (media, business) => {
	const mediaUrl = url.parse(media.url);

	if (mediaUrl.protocol === "cdn:") {
		const host    = mediaUrl.host;
		let bizConfig = business.provider_configuration.cdn || {};
		bizConfig     = bizConfig.hasOwnProperty(host) ? bizConfig[host] : null;
		const path    = mediaUrl.pathname.replace(/^\/+|\/+$/g, '');

		const cdn = "https://cdn.getgameplan.com";

		if (bizConfig !== null) {
			return cdn + "/" + bizConfig.replace(/^\/+|\/+$/g, '') + "/" + path;
		} else {
			switch (config.environment) {
				case "staging":
					return cdn + "/content/uploads/staging/vendors/" + business.id + "/" + path;
				case "demo":
					return cdn + "/content/uploads/demo/vendors/" + business.id + "/" + path;
				default:
					return cdn + "/content/uploads/vendors/" + business.id + "/" + path;
			}
		}
	}
}

let collectDataForBusinesses = async () => {
	// https://platform-staging.getgameplan.com/entityds/v1/entity/tag?id=1&id=2
	// https://platform-staging.getgameplan.com/entityds/v1/entity/media?types=PHOTO&businesses=3366&businesses=8378
	// https://platform-staging.getgameplan.com/entityds/v1/entity/experience?listedMarketplace=true&businessIds=3366&businessIds=8378
	// https://platform-staging.getgameplan.com/entityds/v1/entity/shop?listedMarketplace=true&businessIds=3366&businessIds=8378

	// map all venues with their tags, experiences, and shops

	return await Promise.all([
		getEntity('experience', [{
			key : 'listedMarketplace',
			val : true
		}]),

		getEntity('shop', [{
			key : 'listedMarketplace',
			val : true
		}]),

		// Tags don't necessarily need to be loaded if they're already stored on the client from the other endpoint
		// getEntity('tag')
	]).then(async (responses) => {
		let businessIds = [...responses[0].map(e => e.business_id), ...responses[1].map(e => e.business_id)].unique();

		let businesses = await getEntity('business', [
			...createBusinessTagObjFromIDs(businessIds, 'id')
		]);

		// TODO: load media

		return businesses.map((business) => {
			let id = parseInt(business.id)

			let buttons = [
				...responses[0].filter(exp => parseInt(exp.business_id) === id).map((experience) => ({
					type        : 'experience',
					name        : experience.name,
					destination : 'https://book.getgameplan.com/view/' + experience.id,
				})),
				...responses[1].filter(shop => parseInt(shop.business_id) === id).map((shop) => ({
					type        : 'shop',
					name        : shop.name,
					destination : 'https://shop.getgameplan.com/s/' + shop.slug,
				}))
			];

			return {
				id          : id,
				name        : business.name,
				description : business.description,
				buttons     : buttons,
				tags        : business.tags,
				location    : {
					address     : business.location_address,
					coordinates : {
						lat : business.latitude,
						lon : business.longitude
					}
				}
			};
		});
	});
}

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.getAllExperienceTags = functions.https.onRequest((request, res) => {
	getEntity('tag').then((data) => res.set({
		'Access-Control-Allow-Origin' : '*'
	}).send(data))
})

exports.getAllVenues = functions.https.onRequest((request, res) => {

	collectDataForBusinesses().then((data) => {
		res.set({
			'Access-Control-Allow-Origin' : '*'
		}).send(data)
	})

})