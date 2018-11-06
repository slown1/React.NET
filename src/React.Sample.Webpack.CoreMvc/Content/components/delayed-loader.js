export const loaded = {};

export function init() {
	System.import('styled-components').then(loadedFile => {
		loaded.styled = loadedFile.default;
		global.Styled = loadedFile;
	});

	System.import('emotion-server').then(loadedFile => {
		loaded.EmotionServer = loadedFile.default;
		global.EmotionServer = loadedFile;
	});

	System.import('react-jss').then(loadedFile => {
		loaded.ReactJss = loadedFile.default;
		global.ReactJss = loadedFile;
	});
}
