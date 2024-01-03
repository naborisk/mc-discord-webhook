const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL

app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
  console.log(req.body)
  switch (req.body.eventType) {
    case 'PlayerJoin':
      fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: `${req.body.joinMessage}`
        })
      })
      break
    case 'PlayerQuit':
      fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: `${req.body.quitMessage}`
        })
      })
      break
    case 'PlayerDeath':
      fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: `${req.body.deathMessage}`
        })
      })
      break
    case 'PlayerChat':
      fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: `[chat] ${req.body.playerName}: ${req.body.message}`
        })
      })
      break
    case 'PlayerKick':
      fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: `${req.body.player.displayName} was ${req.body.reason}`
        })
      })
      break
  }

  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
