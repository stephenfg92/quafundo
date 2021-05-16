const mongoose = require('mongoose')
const Pergunta = require('./Pergunta')

const SchemaQuiz = new mongoose.Schema({
    description: String,
    //perguntas: [mongoose.Types.ObjectId]
    perguntas: [{type: mongoose.Types.ObjectId, ref: "Pergunta"}]
})

module.exports = mongoose.model('Quiz', SchemaQuiz)