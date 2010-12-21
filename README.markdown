# Bus Growler

A simple growl notification script (node.js) that uses Ross Duggan's JSON feed for Dublin Bus route status <http://rossduggan.ie/stuff/bus> to spot changes in route status.

When the status of one of your watched routes changes, you get a growl notification.

The script will check the status of those routes every 5 minutes

## Installation

This script requires node.js, so install that first <http://node.js>

## Usage

<pre>
  node bus-growler.js 130 31 29a
</pre>

And you will automatically get a growl notification should the status of any of those routes change

## Comments

This script uses <https://github.com/visionmedia/node-growl> for its growl comms.

This script was written to scratch a personal itch so dont go getting all stropy that you need node.js to run it! :)!







