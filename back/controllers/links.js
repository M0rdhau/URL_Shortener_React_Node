const linksRouter = require('express').Router()
const Link = require('../models/link')
const Visit = require('../models/visit')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


linksRouter.get('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.userId){
    return response.status(401).json({ error : 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.userId)

  const links = await Link
    .find({ user: user.id })
    .populate('user', { username: 1, name: 1 })

  response.json(links)
})

linksRouter.get('/:id', async (request, response) => {
  const link = await Link.findById(request.params.id)

  if(link){
    const visit = new Visit({
      link: request.params.id
    })
    const savedVisit = await visit.save()
    link.visits = link.visits.concat(savedVisit.id)
    await link.update()
    response.redirect(link)
  } else {
    response.status(404).end()
  }
})

linksRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.userId){
    return response.status(401).json({ error : 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.userId)


  const link = new Link({
    destURL: body.destURL,
    user: user.id,
  })

  const savedLink = await link.save()
  user.links = user.links.concat(savedLink.id)
  await user.save()
  response.json(savedLink)

})

linksRouter.delete('/:id', async (request, response) => {

  const linkToRemove = await Link.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(linkToRemove.user.toString() === decodedToken.userId){
    await Link.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }else{
    return response.status(401).json({ error : 'invalid token' })
  }
})

linksRouter.put('/:id', async () => {
  //delete the old link, create a new one, send it out
})

//editing blogs implementation can be here but it is not relevant now

module.exports = linksRouter

