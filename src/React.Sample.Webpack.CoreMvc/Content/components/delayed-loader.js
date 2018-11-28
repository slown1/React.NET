export function init() {
	System.import('styled-components').then(loadedFile => {
		global.Styled = loadedFile;
	});

	System.import('emotion-server').then(loadedFile => {
		global.EmotionServer = loadedFile;
	});

	System.import('react-jss').then(loadedFile => {
		global.ReactJss = loadedFile;
	});
}
