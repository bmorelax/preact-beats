// Disable Shimming for process
module.exports = config => {
	config.node.process = true;
	config.node.Buffer = true;
};