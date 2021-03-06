/* Magic Mirror Module: MMM-TimeTreeEvent
 * Version: 1.0.0
 *
 * By sabo10o29 https://github.com/sabo10o29
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require("request");

module.exports = NodeHelper.create({

	start: function () {
		console.log("MMM-TrainDelayInfoJP helper, started...");
		this.result = null;

	},

	getTimeTreeEventData: function(payload) {

		var that = this;
		this.url = payload.url;

		request(payload, function(error, response, body) {
			var result = JSON.parse(body);

			if (!error && response.statusCode == 200) {
				that.result = result;
			} else {
				Log.info("Failed to get delay trarin infomation.");
				that.result = null;
			}

			that.sendSocketNotification("GOT-TRAIN-DERAY-INFO-JP-EVENT", {"url": that.url, "result": that.result});
		});
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === "GET-TRAIN-DERAY-INFO-JP-EVENT") {
			this.getTimeTreeEventData(payload);
		}
	}

});