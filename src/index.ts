/*
 * Copyright (c) 2021 MIT
 * @File: app.ts
 * @Author: boxdox
 */

import 'dotenv/config'
import { app } from './app'

// Get port from file
const PORT = process.env.PORT || 3000

// Initiate the server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ⚡`)
})
