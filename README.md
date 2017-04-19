# koijarinunelma

kloonauksen jälkeen npm install

Etusivun reitti on kirjautumisen takana malliksi. Vaihdetaan ylläpitotoimintojen sivuun myöhemmin.

Esimerkki credentials.js kurssin kirjasta. Korvaa [] merkitty sisältö

module.exports = {

	cookieSecret: '[keksin salaisuus]',

	mongo: {

		development: {

			connectionString: '[tietokannan yhteyspolku, esim. mongodb localhost]',
		},

		production: {

			connectionString: '[tietokannan yhteyspolku, esim. mongodb localhost]',
		},
	},
}
