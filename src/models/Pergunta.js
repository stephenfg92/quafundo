const mongoose = require('mongoose')

const SchemaPergunta = new mongoose.Schema({
	description: String,
	alternatives: [
		{
			text: {
				type: String,
				required: true
			},
			isCorrect: {
				type: Boolean,
				required: true,
				default: false
			}
		}
	]
})

module.exports = mongoose.model('Pergunta', SchemaPergunta)