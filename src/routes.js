const express = require('express')
const router = express.Router()

// Modelo
const Pergunta = require('./models/Pergunta')
const Quiz = require('./models/Quiz')

// obter todas perguntas
router.get('/perguntas', async (req, res) =>{
    try{
        const perguntas = await Pergunta.find();
        return res.status(200).json(perguntas)

    } catch (error) {
        return res.status(500).json({"error": error})
    }
})

// obter uma pergunta específica
router.get('/perguntas/:id', async (req, res) =>{
    try{
        const _id = req.params.id;

        const pergunta = await Pergunta.findOne({_id})
        if(!pergunta) {
            return res.status(404).json({})
        } else {
            return res.status(200).json(pergunta)
        }

    } catch (error){
        return res.status(500).json({"error": error})
    }
})

// criar uma nova pergunta
router.post('/perguntas', async (req, res) =>{
    try {
        const { description } = req.body;
        const { alternatives } = req.body;

        const pergunta = await Pergunta.create({
            description,
            alternatives
        });

        return res.status(201).json(pergunta)

    } catch (error){
        return res.status(500).json({"error":error})
    }
})

// alterar uma pergunta
router.put('/perguntas/:id', async (req, res) =>{
    try {
        const _id = req.params.id
        const { description, alternatives } = req.body

        let pergunta = await Pergunta.findOne({_id})

        if (!pergunta) {
            pergunta = await Pergunta.create({
                description,
                alternatives
            })
            return res.status(201).json(pergunta)
        } else {
            pergunta.description = description
            pergunta.alternatives = alternatives
            await pergunta.save()
            return res.status(200).json(pergunta)
        }
    } catch (error){
        return res.status(500).json({"error":error})
    }
})


// remover uma pergunta
router.delete('/perguntas/:id', async (req, res) =>{
    try {
        const _id = req.params.id

        const pergunta = await Pergunta.deleteOne({_id})

        if (pergunta.deletedCount === 0) {
            return res.status(404).json()
        } else {
            return res.status(204).json()
        }

    } catch (error){
        return res.status(500).json({"error":error})
    }
})

// Quizzes

// Obter todos quizzes
router.get('/quiz', async (req, res) =>{
    try{
        const quizzes = await Quiz.find();
        return res.status(200).json(quizzes)

    } catch (error) {
        return res.status(500).json({"error": error})
    }
})

// obter um quiz específico
router.get('/quiz/:id', async (req, res) =>{
    try{
        const _id = req.params.id;

        const quiz = await Quiz.findOne({_id}).populate("perguntas")

        if(!quiz) {
            return res.status(404).json({})
        } else {
            return res.status(200).json(quiz)
        }

    } catch (error){
        console.log(error)
        return res.status(500).json({"error": error})
    }
})

// Criar novo quiz
router.post('/quiz', async (req, res) =>{
    try {
        const { description } = req.body;
        const { perguntas } = req.body

        const quiz = await Quiz.create({
            description,
            perguntas
        });

        return res.status(201).json(quiz)

    } catch (error){
        return res.status(500).json({"error":error})
    }
})

// alterar um quiz
router.put('/quiz/:id', async (req, res) =>{
    try {
        const _id = req.params.id
        const { description, perguntas } = req.body

        let quiz = await Quiz.findOne({_id})

        if (!quiz) {
            quiz = await Pergunta.create({
                description,
                perguntas
            })
            return res.status(201).json(quiz)
        } else {
            quiz.description = description
            quiz.perguntas = perguntas
            await quiz.save()
            return res.status(200).json(quiz)
        }
    } catch (error){
        console.log(error)
        return res.status(500).json({"error":error})
    }
})

// remover um quiz
router.delete('/quiz/:id', async (req, res) =>{
    try {
        const _id = req.params.id

        const quiz = await Quiz.deleteOne({_id})

        if (quiz.deletedCount === 0) {
            return res.status(404).json()
        } else {
            return res.status(204).json()
        }

    } catch (error){
        return res.status(500).json({"error":error})
    }
})

// Avaliar respostas
router.post('/responder', async (req, res) =>{
    try{
        const respostas = req.body;
        
        let resultado = [];
        for(var p in respostas) {
            const tentativa = respostas[p]
            const pergunta = await Pergunta.findOne({_id: p})
            pergunta.alternatives.map( (alternative, index) =>
                {if (alternative._id == tentativa) {resultado.push(alternative)}}
            )
        }
        
        return res.status(200).json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).json({"error": error})
    }
})

module.exports = router