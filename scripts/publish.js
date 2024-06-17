/** It is assumed that this is called only from the default branch. */
const { execSync } = require("child_process");

// Apply changesets if any -- e.g., coming from pre-release branches
try {
  execSync("pnpm changeset pre exit");
} catch {
  // empty
}
// try {
//   execSync("pnpm changeset version");
//   execSync(
//     `git add . && git commit -m "Apply changesets and update CHANGELOG" && git push origin ${process.env.BRANCH}`,
//   );
// } catch {
//   // no changesets to be applied
// }

// const { version: VERSION, name } = require("../lib/package.json");
// let LATEST_VERSION = "0.0.-1";

// try {
//   LATEST_VERSION = execSync(`npm view ${name} version`).toString() ?? "0.0.-1";
// } catch {
//   // empty
// }

// console.log({ VERSION, LATEST_VERSION });

// const [newMajor, newMinor] = VERSION.split(".");
// const [oldMajor, oldMinor] = LATEST_VERSION.split(".");

// const isPatch = newMajor === oldMajor && newMinor === oldMinor;

// if (!isPatch) {
//   require("./update-security-md")(`${newMajor}.${newMinor}`, `${oldMajor}.${oldMinor}`);
//   /** Create new release branch for every Major or Minor release */
//   const releaseBranch = `release-${newMajor}.${newMinor}`;
//   execSync(`git checkout -b ${releaseBranch} && git push origin ${releaseBranch}`);
// }

/** Create release */
execSync("cd lib && pnpm build");

/** Create GitHub release */
execSync(
  `gh release create ${VERSION} --generate-notes --latest -n "$(sed '1,/^## /d;/^## /,$d' CHANGELOG.md)" --title "Release v${VERSION}"`,
);

// Publish canonical packages
[
  "@mayank1513\\/r18gs",
  "react18-global-store",
  "react18-store",
  "react19-global-store",
  "react19-store",
  "r19gs",
].forEach(pkg => {
  execSync(`sed -i -e "s/name.*/name\\": \\"${pkg}\\",/" lib/package.json`);
  execSync("cd lib && npm publish --provenance --access public");
});

// Mark deprecated
execSync(
  'npm deprecate @mayank1513/r18gs "Please use https://www.npmjs.com/package/r18gs instead. We initially created scoped packages to have similarities with the GitHub Public Repository (which requires packages to be scoped). We are no longer using GPR and thus deprecating all scoped packages for which corresponding un-scoped packages exist."',
);
