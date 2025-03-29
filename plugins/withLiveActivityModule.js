const { withDangerousMod, withXcodeProject } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const MODULE_SOURCE_PATH = 'extensions/live-activity/native/LiveActivityModule';

function copyNativeFiles(projectRoot, iosProjectName) {
  const src = path.join(projectRoot, MODULE_SOURCE_PATH);
  const dest = path.join(projectRoot, 'ios', iosProjectName);

  if (!fs.existsSync(src)) {
    throw new Error(`[LiveActivityModule] Source folder not found: ${src}`);
  }

  for (const file of fs.readdirSync(src)) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    fs.copyFileSync(srcFile, destFile);
    console.log(`✅ Copied ${file} to ${dest}`);
  }
}

function addFilesToXcodeProject(config) {
  const { modResults: xcodeProject, modRequest } = config;
  const { projectRoot, projectName } = modRequest;

  const appTarget = xcodeProject.getFirstTarget()?.uuid;
  if (!appTarget) {
    console.warn(
      `[LiveActivityModule] Skipping: Could not resolve app target.`,
    );
    return config;
  }

  const destPath = path.join(projectRoot, 'ios', projectName);
  const relativeGroupPath = `${projectName}`;
  const files = fs
    .readdirSync(destPath)
    .filter((f) => /\.(m|mm|cpp|swift)$/.test(f));

  const mainGroupId = xcodeProject.getFirstProject()?.firstProject?.mainGroup;
  const mainGroup = mainGroupId
    ? xcodeProject.getPBXGroupByKey(mainGroupId)
    : null;

  const targetGroup = mainGroup?.children?.find(
    (g) => xcodeProject.getPBXGroupByKey(g.value)?.name === projectName,
  );

  const groupKey = targetGroup?.value;
  if (!groupKey) {
    console.warn(
      `[LiveActivityModule] Skipping: Could not find group ${projectName}`,
    );
    return config;
  }

  for (const file of files) {
    const filePath = `${relativeGroupPath}/${file}`;
    if (!xcodeProject.hasFile(filePath)) {
      try {
        xcodeProject.addSourceFile(filePath, { target: appTarget }, groupKey);
        console.log(`📌 Added ${file} to target`);
      } catch (err) {
        console.warn(
          `[LiveActivityModule] Error adding ${file}: ${err.message}`,
        );
      }
    }
  }

  return config;
}

module.exports = function withLiveActivityModule(config) {
  // Only run these mods for the "ios" platform
  config = withDangerousMod(config, [
    'ios',
    async (config) => {
      const { projectRoot, projectName } = config.modRequest;
      copyNativeFiles(projectRoot, projectName);
      return config;
    },
  ]);

  config = withXcodeProject(config, addFilesToXcodeProject);

  return config;
};
