# Deploying Gather Tomorrow on Firebase Hosting

This note is for Sam, who owns the Firebase project and the domain. The site is static HTML, CSS, and one small script. There is no build step, no Stripe, and no Firebase app code in the pages.

The repo is ready to host, but it will not deploy until you replace the placeholder project id and add a GitHub secret. No service-account key belongs in this repository. If a key file is ever downloaded, do not commit it.

## Prerequisites

- A Firebase project you own. Project id is in Firebase console → Project settings. Use the id, not the display name.
- The **Blaze** (pay as you go) plan if you want pull-request preview channels. A live Hosting site can exist on the Spark plan, but preview channels used by the GitHub Action require Blaze.
- Node.js on the machine you use for the one-time manual deploy, plus permission to install `firebase-tools`.
- Admin access to this GitHub repository, so you can add an Actions secret.
- Access to the DNS for the custom domain. You will add records. You will not change mail records.

## 1. Set the project id

Edit `.firebaserc` at the repo root. It currently says:

```json
{
  "projects": {
    "default": "YOUR_FIREBASE_PROJECT_ID"
  }
}
```

Replace `YOUR_FIREBASE_PROJECT_ID` with the real project id, for example `gather-tomorrow-prod`. Commit that change. Do not put a service account, private key, or API secret in this file.

`firebase.json` points Hosting at the repo root (`"public": "."`), turns on `cleanUrls` and `trailingSlash`, and sets cache headers. Pages are not cached (`max-age=0, must-revalidate`) so text edits show up immediately. Files under `/assets/` (the CSS and language script) are cached for one hour. Filenames are not hashed, so do not raise that to a year. The workflow reads the project id from `.firebaserc`. You do not also paste it into the workflow file.

## 2. One-time manual deploy

From the repo root, after the project id is real:

```bash
npm install -g firebase-tools
firebase login
firebase projects:list
firebase deploy --only hosting
```

`firebase login` uses your Google account. This step does not use the GitHub secret. When it finishes, the live site is on `https://YOUR_PROJECT_ID.web.app` and `https://YOUR_PROJECT_ID.firebaseapp.com`. Open `/`, `/zh/`, `/tools/`, and `/zh/tools/` and confirm the language toggle.

## 3. Create the service account secret

The GitHub Action needs a service account JSON key stored as a repository secret named **`FIREBASE_SERVICE_ACCOUNT`**. The workflow will not deploy until that secret exists. The key must never be committed, pasted into a pull request, or checked into `.firebaserc`.

### Option A — `firebase init hosting:github`

From the repo root, with the Firebase CLI logged in:

```bash
firebase init hosting:github
```

The CLI can create the service account, store the key as a GitHub secret, and offer to write workflow files. This repo already has `.github/workflows/firebase-hosting.yml`. Keep that file. If the CLI writes a second workflow, compare them and keep one so deploys do not run twice. The secret name in the existing workflow is `FIREBASE_SERVICE_ACCOUNT`. If the CLI uses a different name, either rename the secret in GitHub to `FIREBASE_SERVICE_ACCOUNT` or change the workflow to the name you chose. Do not commit the JSON.

### Option B — create the secret yourself

The roles below are the ones listed by [FirebaseExtended/action-hosting-deploy](https://github.com/FirebaseExtended/action-hosting-deploy/blob/main/docs/service-account.md). This site does not use Firebase Authentication or Cloud Run rewrites. Hosting Admin and API Keys Viewer are what a static deploy uses. Add the other two as well so preview-channel setup matches that guide and does not fail later if the CLI asks for them.

1. Open [Google Cloud service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) and select this Firebase project.
2. Create a service account, for example `github-actions-hosting`.
3. Grant these roles:
   - **Firebase Hosting Admin** (`roles/firebasehosting.admin`) — deploy live and preview channels.
   - **API Keys Viewer** (`roles/serviceusage.apiKeysViewer`) — the CLI reads this during deploy.
   - **Firebase Authentication Admin** (`roles/firebaseauth.admin`) — the action's guide includes this so preview URLs can be added to Auth authorized domains. This site has no Auth. Include it so the action's setup matches the guide.
   - **Cloud Run Viewer** (`roles/run.viewer`) — only needed if Hosting later rewrites to Cloud Run or Cloud Functions. Harmless on this static site.
4. Create a JSON key and download it. Treat the file as a password.
5. GitHub → this repository → Settings → Secrets and variables → Actions → New repository secret.
6. Name: `FIREBASE_SERVICE_ACCOUNT`. Value: the entire JSON file, including the braces.
7. Delete the downloaded JSON from your computer after the secret is saved.

## 4. How auto deploy works

Workflow: `.github/workflows/firebase-hosting.yml`. It uses `FirebaseExtended/action-hosting-deploy@v0`.

- **Pull request** opened from this repository: deploys a preview channel. The Action comments on the PR with the preview URL. The same URL is updated on later commits. It expires 7 days after the last deploy to that channel (`expires: 7d`). `channelId` is left unset so each PR gets its own channel.
- **Push to `main`**: deploys the live channel (`channelId: live`). Merging a pull request into `main` is that push.
- If `FIREBASE_SERVICE_ACCOUNT` is missing, the job logs that and skips the deploy. It does not fail the check.
- If the secret is set but `.firebaserc` still says `YOUR_FIREBASE_PROJECT_ID`, the job fails with that message and does not deploy.
- Fork pull requests are skipped, because GitHub does not expose this repo's secrets to them.

There is no npm build. The Action publishes the files `firebase.json` already points at.

## 5. Connect the custom domain

Do this after a live deploy works on `web.app`.

1. Firebase console → Hosting → Add custom domain.
2. Enter the domain you want (the apex, `www`, or both). Complete the ownership check.
3. Firebase shows the DNS records to add. They are usually:
   - a TXT record to prove you control the domain
   - A records for the apex, pointing at the Hosting IPs Firebase displays
   - a CNAME for `www`, pointing at the target Firebase displays
4. Add those records at the DNS host. Add a new TXT record beside records that are already there. Do not overwrite a TXT record you do not recognize.
5. Leave every **MX** record as it is. MX is what delivers mail to the domain. Also leave SPF (`v=spf1...`) and DKIM records alone. Those are mail, not the website. Connecting Hosting does not require changing them, and replacing them will break existing email.
6. Wait until Firebase shows the domain as Connected and the certificate is active. Then open the domain and check `/`, `/zh/`, `/tools/`, and `/zh/tools/`.

After the custom domain is the site people should find, update the public URLs in this repo in a follow-up change: `canonical`, Open Graph `og:url`, `hreflang`, `sitemap.xml`, the Sitemap line in `robots.txt`, `llms.txt`, and the JSON-LD URLs. They currently use `https://kuankuan0126-stack.github.io/gathertomorrow-site/`, which is the GitHub Pages address. That edit is content, not DNS.

## 6. What happens to GitHub Pages

GitHub Pages publishes the **default branch** (`main`) at:

`https://kuankuan0126-stack.github.io/gathertomorrow-site/`

This pull request does not change Pages settings and does not publish by itself. Pages updates only when `main` changes. The Firebase workflow does not deploy to Pages. They are separate.

You can leave Pages on while you compare it with Firebase. Once the custom domain on Firebase is correct, Pages is a second copy and will drift the next time `main` changes.

To turn Pages off later: GitHub → this repository → Settings → Pages → Build and deployment → set the source to **None** (or disable Pages). Do that only after the Firebase domain loads the site you want. Disabling Pages removes the `github.io` URL. It does not delete the repository, the Firebase site, or DNS mail records.

Merging to `main` while Pages is still enabled updates Pages and, once the secret and project id are set, also deploys Firebase live. Set those up before relying on a merge to publish.
