/* Magic Mirror
 * Module: MMM-TrainDelayInfoJP
 *
 * By sabo10o29 https://github.com/sabo10o29
 * MIT Licensed.
 */
Module.register("MMM-TrainDelayInfoJP",{
	// Module config defaults.
	defaults: {

		api: "https://tetsudo.rti-giken.jp/free/delay.json",
		animationSpeed: 1000,
		upadteInterval: 3 * 60 * 60 *1000, //msec
		timeFormat: "HH:mm",
		title: "⚠︎Delay info　　"
	},

	delayInfos: [],

	// Define required scripts.
	getScripts: function() {
		return ["moment.js", "delaylineobject.js"];
	},
	// Define styles.
	getStyles: function() {
		return ["styles.css"];
	},
	// Define start sequence.
	start: function() {
		var self = this;
		Log.info("Starting module: " + self.name);

		setInterval(function() {
			self.sendSocketNotification("GET-TRAIN-DERAY-INFO-JP-EVENT", self.getOptions());
		}, self.config.upadteInterval);

		this.sendSocketNotification("GET-TRAIN-DERAY-INFO-JP-EVENT", this.getOptions());
	},

	getOptions() {
		return options = {
			url: this.config.api,
			method: "GET",
		};
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		if(this.delayInfos.length == 0){
			Log.info("There are no delay line to your target.");
			return wrapper;
		}

		var title = document.createElement("text");
		title.innerHTML = this.config.title;

		var table = document.createElement("table");
		table.className = "info";
		if(this.data.position == "top_right" || this.data.position == "bottom_right" ){
			table.style.marginLeft = "auto";
		}

		for(var i = 0; i < this.delayInfos.length; i++){
			var info = this.delayInfos[i];
			var infoItem = document.createElement("tr");
			infoItem.className = "bright";
			// Add time
			var time = document.createElement("td");
			time.className = "time";
			time.innerHTML = moment.unix(Number(info.lastupdate)).format(this.config.timeFormat);
			infoItem.appendChild(time);
			//Add event content
			var content = document.createElement("td");
			content.innerHTML = info.name;
			infoItem.appendChild(content);
			table.appendChild(infoItem);
		}
		wrapper.appendChild(title);
		wrapper.appendChild(table);
		return wrapper;
	},

	socketNotificationReceived: function(notification, payload) {
		if(notification !== "GOT-TRAIN-DERAY-INFO-JP-EVENT" || payload == null){
			return;
		}

		this.delayInfos = [];
		Log.info("Success to get train delay information!!");
		for (var i = 0; i < payload.result.length; i ++) {
			if(this.config.notifyLines.includes(payload.result[i].name)){
				const o = new DelayLineInfo(payload.result[i]);
				this.delayInfos.push(o);
			}
		}
		this.updateDom(this.config.animationSpeed);
	}

});

