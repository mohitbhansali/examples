import fastify from "fastify";

const server = fastify();
server.get("/", async (req, res) => await res.send("Hello World!"));
server.listen(3000, "0.0.0.0", (err, address) => {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}
	console.log(`[Server] Server in now listening on ${address}`);
});
