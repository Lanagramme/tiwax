const evtsMaps = {}
export default evtsMaps
const log = console.log.bind(console)
evtsMaps.on = (new Map)
.set('new order', function(e){ log('new order passed =>', e) })
.set('msg', function(e){ log(e) })
.set('error', function(e){ console.error(e) })
.set("connect", function() {
  const engine = this.io.engine
  log(`connected with transport ${engine.transport.name}`)
  engine.on("upgrade", (transport) => { log(`transport upgraded to ${transport.name}`) })
})
.set("connect_error", (err) => {   log(`connect_error due to ${err.message}`) })

.set("disconnect", (reason) => { log(`disconnect due to ${reason}`) })

evtsMaps.emit = (new Map)