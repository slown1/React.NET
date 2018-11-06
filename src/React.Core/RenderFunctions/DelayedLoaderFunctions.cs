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
			// Hack
			executeJs($"var loadableJson = {File.ReadAllText("./wwwroot/react-loadable.json")};");
			RenderedScripts = JsonConvert.DeserializeObject<ReadOnlyCollection<string>>(executeJs(@"
function getBundles(manifest, moduleIds) {
  return moduleIds.reduce((bundles, moduleId) => {
    return bundles.concat(manifest[moduleId]);
  }, []);
};

JSON.stringify(getBundles(loadableJson, loadableModules).map(x => x.file.replace('server/','')));"));
		}

	}
}
