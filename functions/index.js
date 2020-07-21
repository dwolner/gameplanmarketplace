const functions = require('firebase-functions')
const axios = require('axios')
const cors = require('cors')({
	origin: true
})

// dev: use staging var to dynamically change url
const staging = false

// dev: convert to env file to not commit live credentials?
const credentials = staging ? {
	username: 'test',
	password: 'test'
} : {
	username: 'com.getgameplan.marketplace',
	password: 'HJwvL2FrCynIRKg1okUO3wj86NzRdfW887UGGhrqHwgTqc'
}

let getEntity = async (type, params) => {
	let paramString = ''

	if (params) {
		params.forEach((paramObj) => {
			paramString = `${ paramString }${ paramString ? '&' : '?' }${ paramObj.key }=${ paramObj.val }`
		})
	}
	
	try {
		let route = `https://platform${ staging ? '-staging' : '' }.getgameplan.com/entityds/v1/entity/${ type }${ paramString ? paramString : '' }`
		let res = await axios.get(route, { auth: credentials })

		console.log('DATA: ')
		console.log(res.data)

		return res.data
	} catch(error) {
		console.log('ERROR: ')
		console.log(error)
	}
}

let createBusinessTagObjFromIDs = (IDs, key) => {
	return IDs.map(id => {
		return {
			key: key,
			val: id
		}
	})
}

let getBusinesses = async () => {
	return await getEntity('business', [{
		key: 'hasExperiences',
		val: true
	}, {
		key: 'hasShops',
		val: true
	}])
}

let collectDataForBusinesses = async () => {
	// https://platform-staging.getgameplan.com/entityds/v1/entity/tag?id=1&id=2
	// https://platform-staging.getgameplan.com/entityds/v1/entity/media?types=PHOTO&businesses=3366&businesses=8378
	// https://platform-staging.getgameplan.com/entityds/v1/entity/experience?listedMarketplace=true&businessIds=3366&businessIds=8378
	// https://platform-staging.getgameplan.com/entityds/v1/entity/shop?listedMarketplace=true&businessIds=3366&businessIds=8378

	// map all venues with their tags, experiences, and shops

	let businesses = await getBusinesses()
		
	// dev: create businessesTags from businesses
	let businessesTags = []


	let responses = await Promise.all([
		getEntity('tag'),
		getEntity('media', [{
				key: 'types',
				val: 'PHOTO'
			},
			...createBusinessTagObjFromIDs(businessesTags, 'businesses')
		]),
		getEntity('experience', [{
				key: 'listedMarketplace',
				val: true
			},
			...createBusinessTagObjFromIDs(businessesTags, 'businessIds')
		]),
		getEntity('shop', [{
				key: 'listedMarketplace',
				val: true
			},
			...createBusinessTagObjFromIDs(businessesTags, 'businessIds')
		])
	])

	let businessData = businesses.map((business) => {
		let id = business.id

		return {}
	})

	return businessData
}

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.getAllExperienceTags = functions.https.onRequest((request, res) => {
	getEntity('tag').then((data) => res.set({
		'Access-Control-Allow-Origin': '*'
	}).send(data))
})

exports.getAllVenues = functions.https.onRequest((request, res) => {

	collectDataForBusinesses().then((data) => {
		res.set({
			'Access-Control-Allow-Origin': '*'
		}).send(data)
	})

})