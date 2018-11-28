using System;
using System.Collections.ObjectModel;
using System.IO;
using System.Text;
using Newtonsoft.Json;

namespace React.RenderFunctions
{
	///
	public class DelayedLoaderFunctions : RenderFunctionsBase
	{
		private readonly string _pathToReactLoadableJson;

		public DelayedLoaderFunctions(string pathToReactLoadableJson)
		{
			_pathToReactLoadableJson = pathToReactLoadableJson;
		}

		///
		public ReadOnlyCollection<string> RenderedScripts { get; private set; }


		///
		public override void PreRender(Func<string, string> executeJs)
		{
			executeJs("var loadableModules = [];");
		}

		///
		public override string WrapComponent(string componentToRender)
		{
			return $@"
React.createElement(
	Loadable.Capture,
	{{
		report: function report(moduleName) {{
			return loadableModules.push(moduleName);
		}}
	}},
    {componentToRender}
)";
		}

		///
		public override void PostRender(Func<string, string> executeJs)
		{
			// This file could be huge, can we cache it per engine?
			executeJs($"var loadableJson = {File.ReadAllText(_pathToReactLoadableJson)};");
			RenderedScripts = JsonConvert.DeserializeObject<ReadOnlyCollection<string>>(executeJs(@"
function getBundles(manifest, moduleIds) {
  return moduleIds.reduce((bundles, moduleId) => {
    return bundles.concat(manifest[moduleId]);
  }, []);
};

JSON.stringify(getBundles(loadableJson, loadableModules).map(x => x == null ? null : x.file.replace('server/','')).filter(x => x));"));
		}

	}
}
