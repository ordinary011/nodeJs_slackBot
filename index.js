const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
	token: 'xoxb-685109405542-682515078308-mMN5U7sZpDlKa7OnsLrYcKnw',
	name: 'theBestJokeBot'
});

// when starts
bot.on('start', () => {
	const params = {
		icon_emoji: ':smiley:'
	};
	bot.postMessageToChannel('general', "let's see how your mood is today=))", params);
});

// on error
bot.on('error', err => console.log(err));

// when message is sent
bot.on('message', data => {
	if (data.type !== 'message') {
		return;
	}
	handleMessage(data.text);
});

// response to data
function handleMessage(msg) {
	if (msg.includes(' chucknorris')) return chuckJoke();
	if (msg.includes(' yomama')) return yomamaJoke();
	if (msg.includes(' random')) return randomJoke();
	if (msg.includes(' /help')) return runHelp();
}

// send chuck norris' joke
async function chuckJoke() {
	const response = await axios.get('http://api.icndb.com/jokes/random/');
	const params = {
		icon_emoji: ':laughing:'
	};
	bot.postMessageToChannel('general', `Chuck Norris ${response.data.value.joke}`, params);
}

// send yomama joke
async function yomamaJoke() {
	const response = await axios.get('http://api.yomomma.info');
	const params = {
		icon_emoji: ':laughing:'
	};
	bot.postMessageToChannel('general', `Yo Mama ${response.data.joke}`, params);
}

// choose a random joke
function randomJoke() {
	const random = Math.floor(Math.random() * 2) + 1;
	if (random === 1) return chuckJoke();
	if (random === 2) return yomamaJoke();
}

// show help
function runHelp() {
	const params = {
		icon_emoji: ':question:'
	};
	bot.postMessageToChannel(
		'general',
		`Type @jokebot with either 'chucknorris', 'yomama', or 'random' to get a joke`,
		params
	);
}
