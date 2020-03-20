# MMM-TrainDelayInfoJP
Display the delay information of target trains on your magic mirror.
This module uses [鉄道遅延情報のjson](https://rti-giken.jp/fhc/api/train_tetsudo/).
The display time is the last update time of the delay information on the resource server.

## Features

## Screenshot
-`Sample screenshot 1`  
![Screenshot](https://github.com/sabo10o29/MMM-TrainDelayInfoJP/blob/master/sc01.png)


## UPDATE
**1.0.0**
- Simple viewer for delay info.

## Installation
```javascript
cd ~/MagicMirror/modules/
git clone https://github.com/sabo10o29/MMM-TrainDelayInfoJP.git
cd MMM-TrainDelayInfoJP
npm install
```

## Necessary Configuration
```javascript
{
    module: "MMM-TrainDelayInfoJP",
    //Positions of *_bar and *_third are not support.
    position: "top_left",
    config: {
        notifyLines:[
            //Please fill in the some line names which you want to check their delay. 
            //Find the line name from the line list[1]
			"Line name",
		],
    }
},
```
[[1]Line list](https://rti-giken.jp/fhc/api/train_tetsudo/)

## Optional Configuration

| Option               | Description
|--------------------- |-----------
| `upadteinterval`     | Update interval to get event from '鉄道遅延情報のjson'.  <br><br>**Type:** `int` <br> **Default value:** `3 * 60 * 60 *1000 (3 hours)`
| `timeFormat`         | The time format of the delay info based on [moment.js](https://momentjs.com/docs/). <br><br>**Type:** `String` <br> **Default value:** `HH:mm`
| `title`              | Title name <br><br>**Type:** `String` <br> **Default value:** `⚠︎Delay info　　`